import { Args, Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Logs extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Container name",
    }),
  };

  static description = "Print logs for Docker containers";

  static flags = {
    ...BaseCommand.flags,
    tail: Flags.integer({
      default: 500,
      description: "Number of last rows to show",
    }),
  };

  public async run(): Promise<any> {
    const { args, flags } = await this.parse(Logs);

    const commandArgs = ["logs", "-f", "--tail", `${flags.tail}`];
    if (args.name) {
      commandArgs.push(args.name);
    }

    return await callCompose(this.context, commandArgs);
  }
}
