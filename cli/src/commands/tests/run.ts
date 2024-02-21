import { $ } from "zx";
import { Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import "zx/globals";

export default class Run extends BaseCommand {
  static description = "Run integration tests";

  static flags = {
    ...BaseCommand.flags,
    testDir: Flags.string({ description: 'Default: "./test/stepci"' }),
    ymlFile: Flags.string({ default: "tests/workflow.yml" }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Run);
    const { ymlFile } = flags;
    const testDir = flags.testDir || `${process.cwd()}/test/stepci`;

    await $`docker build -t stepci-test ./scripts/containers/stepci`;

    const env = this.context.runtimeEnv;
    const envFiles = [".env", `.${env}.env`];

    const runCommand = [
      "--rm",
      "--network",
      this.context.networkName,
      "--name",
      "stepci-test",
      "--network-alias",
      "stepci-test",
      "-v",
      `${testDir}:/tests`,
      "-i",
      ...envFiles.flatMap((e) => ["--env-file", e]),
      "stepci-test:latest",
      ymlFile,
    ];

    await $`docker run ${runCommand}`;
  }
}
