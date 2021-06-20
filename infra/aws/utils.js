const pulumi = require('@pulumi/pulumi');

const tryField = (cfg, field, subField) => {
  try {
    return cfg.require(`${subField}/${field}`);
  } catch (e) {
    return cfg.require(`default/${field}`);
  }
};

const toBoolean = (configValue) => {
  return configValue === 'true';
};

const toNumber = (configValue) => {
  return Number(configValue);
};

const tryOrWarning = (cfg, field, subField) => {
  let res;

  try {
    res = tryField(cfg, field, subField);
  } catch (e) {
    pulumi.log.info(`Warning: property ${subField}/${field} or default/${field} not found in the config`);
  }

  return res;
};

const genResName = (nodeName, postfix) => [nodeName, postfix].join('-')

module.exports.tryField = tryField;
module.exports.tryOrWarning = tryOrWarning;
module.exports.genResName = genResName;
module.exports.toBoolean = toBoolean;
module.exports.toNumber = toNumber;
