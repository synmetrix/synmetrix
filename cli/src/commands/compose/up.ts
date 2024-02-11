import { Args, Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Up extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Container name",
    }),
  };

  static description = "Up docker compose stack";

  static flags = {
    ...BaseCommand.flags,
    build: Flags.boolean({
      char: "b",
      description: "Build images",
      default: false,
    }),
  };

  public async run(): Promise<ProcessOutput> {
    const { args, flags } = await this.parse(Up);

    const commandArgs = ["up"];

    if (flags.build) {
      commandArgs.push("--build");
      commandArgs.push("--pull");
    }

    commandArgs.push("-d", args.name || "");

    return await callCompose(this.context, commandArgs);
  }
}
