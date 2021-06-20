const pulumi = require('@pulumi/pulumi');
const awsx = require('@pulumi/awsx');

class IngressResource extends pulumi.ComponentResource {
  constructor(name, args, opts = {}) {
    const {
      vpc,
      cert,
      targetInstance,
    } = args;

    super(`resource:group:IngressResource`, name, args, opts);
    const ec2Config = new pulumi.Config('ec2');
    const dnsConfig = new pulumi.Config('route53');
    const projectName = ec2Config.require('projectName');

    const tags = {
      Project: pulumi.concat(projectName),
    };

    const lb = new awsx.lb.ApplicationLoadBalancer('load-balancer', {
      vpc,
      external: true,
      tags,
    });

    // create rule that listens 80 port
    const httpListener = lb.createListener('http-listener', {
      port: 80,
      tags,
    });

    httpListener.attachTarget('http-target', targetInstance);

    this.applicationLoadBalancer = lb;
    this.httpListener = httpListener;

    this.registerOutputs({
      applicationLoadBalancer: lb,
    });
  }
}

module.exports = IngressResource;
