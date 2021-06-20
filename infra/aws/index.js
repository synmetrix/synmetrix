const fs = require('fs');

const pulumi = require('@pulumi/pulumi');
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");
const random = require('@pulumi/random');

const { tryOrWarning } = require('./utils');
const NetworkResource = require('./NetworkResource');
const NodeResource = require('./NodeResource');
const DnsResource = require('./DnsResource');
const IngressResource = require('./IngressResource');
const DbResource = require('./DbResource');

const clusterConfig = new pulumi.Config('cluster');
const s3Config = new pulumi.Config('s3');
const ec2Config = new pulumi.Config('ec2');

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

if (!AWS_SECRET_ACCESS_KEY || !AWS_ACCESS_KEY_ID) {
  throw 'Pass AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env variables for the cluster tokens exchange';
  return false;
}

const genEnvs = (workerToken, meta = {}) => {
  pulumi.log.info(`[CLUSTER] Worker token object name: ${workerToken}`)

  const { MASTER_IP } = meta;

  return `
    export WORKER_TOKEN_OBJECT=${workerToken}
    export WORKER_TOKEN_PATH=${clusterConfig.require('workerTokenPath')}
    export MASTER_HOST_IP=${MASTER_IP}
    export S3_BUCKET=${s3Config.require('exchangeBucket')}
    export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
    export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
  `;
};

const bootstrapScript = fs.readFileSync('src/bootstrap.sh');
const masterBootstrapScript = fs.readFileSync('src/master_bootstrap.sh');
const slaveBootstrapScript = fs.readFileSync('src/slave_bootstrap.sh');
const cloudScript = fs.readFileSync('src/cloud_cli.sh');

const networkResource = new NetworkResource(
  'virtual-network'
);

const vpcSecurityGroupIds = pulumi.all([networkResource.id]);
const workerTokenObject = new random.RandomUuid('worker-exchange-objectname', {});

const genConfig = (key, nodeBootstrapScript, meta = {}) => {
  return {
    startupScripts: pulumi.all([
      workerTokenObject.result,
      pulumi.output(meta),
    ]).apply(([token, meta]) => [
      bootstrapScript,
      genEnvs(token, meta),
      cloudScript,
      nodeBootstrapScript,
    ]),
    vpcSecurityGroupIds,
  };
};

const mastersCount = Number(ec2Config.require('masters'));
const masterNames = Array.from(Array(mastersCount).keys()).map(index => `master${index}`);
const masters = masterNames.reduce((acc, k) => { 
  return {
    ...acc,
    [k]: genConfig(k, masterBootstrapScript)
  };
}, {});


const masterResources = Object.entries(masters).map(([name, args]) => {
  const node = new NodeResource(name, args, { dependsOn: networkResource.securityGroup });

  return node;
});

const slavesCount = Number(ec2Config.require('slaves'));
const slaveNames = Array.from(Array(slavesCount).keys()).map(index => `slave${index}`);
const slaves = slaveNames.reduce((acc, k) => { 
  return {
    ...acc,
    [k]: genConfig(k, slaveBootstrapScript, { MASTER_IP: masterResources[0].privateIp })
  };
}, {});

const dependsOnMaster = [
  // https://github.com/pulumi/pulumi/issues/991#issuecomment-415990117
  masterResources?.[0]?.instance,
];

const slaveResources = Object.entries(slaves).map(([name, args]) => {
  const node = new NodeResource(name, args, { dependsOn: dependsOnMaster });

  return node;
});

const ingressResource = new IngressResource(
  'ingress', {
    targetInstance: masterResources[0].instance,
    vpc: networkResource.vpc,
  }
);

const ingressDnsName = ingressResource.applicationLoadBalancer.loadBalancer.dnsName;
const ingressZoneId = ingressResource.applicationLoadBalancer.loadBalancer.zoneId;

const dnsResource = new DnsResource(
  'dns-records', {
    lb: ingressResource.applicationLoadBalancer,
    targetInstance: masterResources[0].instance,
    ingressDnsName,
    ingressZoneId,
  }, { dependsOn: ingressResource.applicationLoadBalancer }
);

const dbResource = new DbResource('rds-appdb', { vpcSecurityGroupIds });

const state = {}

state.ingress = ingressResource;
state.slaves = slaveResources;
state.masters = masterResources;
state.workerTokenObject = workerTokenObject.result;
// state.network = networkResource;
state.db = dbResource;
state.dns = dnsResource;

state.with_provision = {
  masters: masterResources.map(node => node.instance.id),
  slaves: slaveResources.map(node => node.instance.id),
};

exports.state = state;
