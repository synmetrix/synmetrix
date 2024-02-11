import { Args, Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callService } from "../../utils.js";

export default class Logs extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Service name",
      required: true,
    }),
  };

  static description = "Print logs for Docker Swarm services";

  static flags = {
    ...BaseCommand.flags,
    tail: Flags.integer({
      default: 500,
      description: "Number of last rows to show",
    }),
  };

  public async run(): Promise<ProcessOutput> {
    const { args, flags } = await this.parse(Logs);

    const commandArgs = ["logs", "-f", "--tail", `${flags.tail}`];

    if (args.name) {
      commandArgs.push(args.name);
    }

    return await callService(this.context, commandArgs);
  }
}
