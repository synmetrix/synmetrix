const pulumi = require('@pulumi/pulumi');
const awsx = require('@pulumi/awsx');

class NetworkResource extends pulumi.ComponentResource {
  constructor(name, args, opts = {}) {
    super(`resource:group:NetworkResource`, name, args, opts);

    const createRule = (protocol, ports) => {
      const klassIndex = {
        tcp: awsx.ec2.TcpPorts,
        udp: awsx.ec2.UdpPorts,
        icmp: awsx.ec2.IcmpPorts,
      };

      const klass = klassIndex[protocol];

      return ports.map(p => ({
        ports: new klass(p),
        location: new awsx.ec2.AnyIPv4Location(),
      }));
    };

    // https://www.digitalocean.com/community/tutorials/how-to-configure-the-linux-firewall-for-docker-swarm-on-ubuntu-16-04
    const swarmClusterPorts = {
      tcp: [2376, 2377, 7946],
      udp: [4789, 7946],
    };

    const dbPorts = {
      tcp: [5432],
    };

    // all icmp protocols
    const icmpRules = createRule('icmp', [-1]);

    const egress = [{
      ports: new awsx.ec2.AllTraffic(),
      location: new awsx.ec2.AnyIPv4Location(),
    }];

    const publicTcpPorts = [80, 443, 22];

    const ingress = [
      ...createRule('tcp', publicTcpPorts),
      ...icmpRules,

      ...createRule('tcp', swarmClusterPorts.tcp),
      ...createRule('udp', swarmClusterPorts.udp),
      ...createRule('tcp', dbPorts.tcp),
    ];

    // using default VPC
    const securityGroup = new awsx.ec2.SecurityGroup('security-group', { 
      egress,
      ingress,
    });

    this.id = securityGroup.id;
    this.vpc = securityGroup.vpc;
    this.securityGroup = securityGroup;

    this.registerOutputs();
  }
}

module.exports = NetworkResource;
