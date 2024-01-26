import { Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import DockerBuild from "../docker/build.js";
import DockerRun from "../docker/run.js";

export default class TestRun extends BaseCommand {
  static description = "Test project with stepci";

  static flags = {
    ...BaseCommand.flags,
    "testDir": Flags.string({ default: `${process.cwd()}/test/stepci` }),
    "ymlFile": Flags.string({ default: "workflow.yml" }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(TestRun);
    const { testDir, ymlFile } = flags;

    await this.runCommand(DockerBuild, ["stepci-test", "./scripts/containers/stepci"]);

    const env = this.context.runtimeEnv;
    const envFiles = [".env", `.${env}.env`];

    const runCommand = [
      "stepci-test",
      "stepci-test",
      `tests/${ymlFile}`,
      "--tty",
      "--volume", `${testDir}:/tests`,
      ...envFiles.flatMap(e => ["--envFile", e]),
      "--registry", "",
    ];

    await this.runCommand(DockerRun, runCommand);
  }
}
