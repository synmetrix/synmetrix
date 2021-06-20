const pulumi = require('@pulumi/pulumi');
const aws = require('@pulumi/aws');
const { toBoolean, toNumber } = require('./utils');

class DbResource extends pulumi.ComponentResource {
  constructor(name, args, opts = {}) {
    const { 
      vpcSecurityGroupIds,
    } = args;

    super(`resource:group:DbResource`, name, args, opts);

    const dbConfig = new pulumi.Config('rds');

    const username = dbConfig.requireSecret('user');
    const password = dbConfig.requireSecret('pass');
    const engine = dbConfig.require('engine');
    const engineVersion = dbConfig.require('engineVersion');
    const instanceClass = dbConfig.require('instanceClass');
    const allocatedStorage = toNumber(dbConfig.require('allocatedStorage'));
    const maxAllocatedStorage = toNumber(dbConfig.require('maxAllocatedStorage'));
    const storageType = dbConfig.require('storageType');
    const parameterGroupName = dbConfig.require('engineGroupName');

    const backupRetentionPeriod = toNumber(dbConfig.require('backupRetentionPeriod'));
    const backupWindow = dbConfig.require('backupWindow');
    const deleteAutomatedBackups = toBoolean(dbConfig.require('deleteAutomatedBackups'));
    const deletionProtection = toBoolean(dbConfig.require('deletionProtection'));
    const finalSnapshotIdentifier = dbConfig.require('finalSnapshotIdentifier');
    const skipFinalSnapshot = toBoolean(dbConfig.require('skipFinalSnapshot'));

    const databaseName = dbConfig.require('databaseName');

    if (username && password && databaseName) {
      const instance = new aws.rds.Instance(name, {
        name: databaseName,
        username,
        password,

        allocatedStorage,
        // auto storage scale
        maxAllocatedStorage,

        engine,
        engineVersion,
        instanceClass,
        parameterGroupName,
        storageType,

        backupRetentionPeriod,
        backupWindow,

        deleteAutomatedBackups,
        deletionProtection,

        finalSnapshotIdentifier,
        skipFinalSnapshot,
        vpcSecurityGroupIds,
        copyTagsToSnapshot: true,
        applyImmediately: true,
      });

      this.instance = instance;

      this.registerOutputs({
        instance,
      });
    }
  }
}

module.exports = DbResource;
