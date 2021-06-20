const pulumi = require('@pulumi/pulumi');
const aws = require("@pulumi/aws");

const { genResName, tryField } = require('./utils');

class NodeResource extends pulumi.ComponentResource {
  constructor(name, args, opts = {}) {
    const {
      vpcSecurityGroupIds = [],
      startupScripts = [],
    } = args;

    super(`resource:group:NodeResource`, name, args, opts);

    const {
      dependsOn = [],
    } = opts;

    const instanceResName = genResName(name, 'instance');
    const ec2Config = new pulumi.Config('ec2');

    const requestMachineType = tryField(ec2Config, 'machineType', name);
    const ami = tryField(ec2Config, 'ami', name);
    const rootVolumeSize = tryField(ec2Config, 'rootVolumeSize', name);
    const ebsVolumeSize = tryField(ec2Config, 'ebsVolumeSize', name);
    const ebsDeviseName = tryField(ec2Config, 'ebsDeviseName', name);
    const projectName = ec2Config.require('projectName');

    const rootBlockDevice = {
      volumeSize: Number(rootVolumeSize),
    };

    const ebsBlockDevices = [{
      deviceName: ebsDeviseName,
      volumeSize: Number(ebsVolumeSize),
    }];

    // Create a Virtual Machine Instance
    const computeInstance = new aws.ec2.Instance(instanceResName, {
      ami,
      instanceType: requestMachineType,
      availabilityZone: tryField(ec2Config, 'zone', name),
      userData: startupScripts.apply(scripts => scripts.join('\n')),
      vpcSecurityGroupIds,
      ebsBlockDevices,
      rootBlockDevice,
      ebsBlockDevices,
      tags: {
        type: pulumi.concat(projectName, '-instance'),
        Name: pulumi.concat(projectName, '-', name),
      },
    }, { dependsOn });

    this.instance = computeInstance;
    this.publicIp = computeInstance.publicIp;
    this.privateIp = computeInstance.privateIp;

    this.registerOutputs({
      instance: computeInstance,
    });
  }
}

module.exports = NodeResource;
