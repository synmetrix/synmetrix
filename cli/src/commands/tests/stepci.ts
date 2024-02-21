import { Flags } from "@oclif/core";
import { $ } from "zx";

import BaseCommand from "../../BaseCommand.js";

export default class StepCI extends BaseCommand {
  static description = "Run StepCI integration tests";

  static flags = {
    ...BaseCommand.flags,
    testDir: Flags.string({ description: 'Default: "./tests/stepci"' }),
    ymlFile: Flags.string({ default: "tests/workflow.yml" }),
  };

  public async run(): Promise<any> {
    const { flags } = await this.parse(StepCI);
    const { ymlFile } = flags;
    const testDir = flags.testDir || `${process.cwd()}/tests/stepci`;

    await $`docker build -qt stepci-test ./scripts/containers/stepci`;

    const env = this.context.runtimeEnv;
    const envFiles = [".env", `.${env}.env`];

    const runCommand = [
      "--rm",
      "--network",
      this.context.networkName,
      "--name",
      "stepci-tests",
      "--network-alias",
      "stepci-tests",
      "-v",
      `${testDir}:/tests`,
      "-i",
      ...envFiles.flatMap((e) => ["--env-file", e]),
      "stepci-test:latest",
      ymlFile,
    ];

    await $`docker run ${runCommand}`;
    const runPsql =
      await $`PGPASSWORD=pass psql --host localhost --port 15432 --username user --dbname default --command "\\d"`;

    console.assert(
      runPsql.stdout.includes("Checks"),
      'Expected "Checks" table in psql output',
    );
  }
}
