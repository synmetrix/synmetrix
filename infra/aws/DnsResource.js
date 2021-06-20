const pulumi = require('@pulumi/pulumi');
const aws = require('@pulumi/aws');

class DnsResource extends pulumi.ComponentResource {
  constructor(name, args, opts = {}) {
    const {
      lb,
      targetInstance,
      ingressDnsName,
      ingressZoneId,
    } = args;

    super(`resource:group:DnsResource`, name, args, opts);
    const appConfig = new pulumi.Config('route53');
    let domainName = appConfig.require('domainName');

    const dnsZone = new aws.route53.Zone('zone-dns', {
      name: domainName,
    });

    // key is Id for the entry
    const allRecords = {
      apexRecord: { 
        name: domainName,
        type: 'A',
        value: {
          name: ingressDnsName,
          zoneId: ingressZoneId,
          evaluateTargetHealth: true,
        },
        isAlias: true,
      },
      appCname: { 
        name: pulumi.concat('app.', domainName),
        type: 'CNAME',
        value: domainName, 
      },
      apiCname: { 
        name: pulumi.concat('api.', domainName),
        type: 'CNAME',
        value: domainName, 
      },
      mxRecord: { 
        name: domainName,
        type: 'MX',
        value: [
          '1 aspmx.l.google.com.',
          '5 alt1.aspmx.l.google.com.',
          '5 alt2.aspmx.l.google.com.',
          '10 alt3.aspmx.l.google.com.',
          '10 alt4.aspmx.l.google.com.',
        ],
      },
      caaEntry: {
        name: pulumi.concat('*.', domainName),
        type: 'CAA',
        value: '0 issue "letsencrypt.org"'
      },
    };

    const lastDomainChar = domainName.charAt(domainName.length - 1);

    // remove last dot from the domain
    if (lastDomainChar === '.') {
      domainName = domainName.slice(0, -1);
    }

    const cert = new aws.acm.Certificate('cert', {
      domainName,
      subjectAlternativeNames: [
        pulumi.concat('*.', domainName),
      ],
      validationMethod: 'DNS',
    });

    pulumi.all(cert.domainValidationOptions).apply(records => {
      records.forEach(record => {
        const recordName = pulumi.concat(
          dnsZone.zoneId,
          record.resourceRecordName,
        );

        if (recordName) {
          return;
        }

        new aws.route53.Record(recordName, {
          zoneId: dnsZone.zoneId,
          name: record.resourceRecordName,
          type: record.resourceRecordType,
          ttl: 10,
          records: [
            record.resourceRecordValue,
          ],
          allowOverwrite: true,
        });
      });
    });

    const dnsRecords = pulumi.all(Object.entries(allRecords)).apply(dnsRecs => 
      dnsRecs.map(([key, data]) => {
        const records = pulumi.output(data.value).apply(v => Array.isArray(v) ? v : [v]);
        const valueKey = data.isAlias ? 'aliases' : 'records';

        const recArgs = {
          zoneId: dnsZone.zoneId,
          type: data.type,
          name: pulumi.output(data.name || '').apply(name => name),
          [valueKey]: records,
          allowOverwrite: true,
        }

        if (!data.isAlias) {
          recArgs.ttl = 10;
        }

        const rec = new aws.route53.Record(key, recArgs);

        return recArgs;
      })
    );

    const httpsListener = lb.createListener('https-listener', {
      protocol: 'HTTPS',
      sslPolicy: 'ELBSecurityPolicy-2016-08',
      certificateArn: cert,
      port: 443,
    });

    httpsListener.attachTarget('https-target', targetInstance);

    this.dnsZone = dnsZone;
    this.dnsRecords = dnsRecords;
    this.cert = cert;

    this.registerOutputs({
      dnsZone,
    });
  }
}

module.exports = DnsResource;
