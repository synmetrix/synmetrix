import { Args, Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose, callService } from "../../utils.js";

export default class ServicesLogs extends BaseCommand {
  static args = {
    ...BaseCommand.args,
    name: Args.string({
      char: "n",
      description: "Name of the container to print logs for",
    }),
  };

  static description = "Print logs for a Docker containers";

  static flags = {
    ...BaseCommand.flags,
    tail: Flags.integer({
      default: 100,
      description: "Number of last rows to show",
    }),
  };

  public async run(): Promise<ProcessOutput> {
    const { args, flags } = await this.parse(ServicesLogs);

    const commandArgs = ["logs", "-f", "--tail", `${flags.tail}`];
    if (args.name) {
      commandArgs.push(args.name);
    }

    if (flags.swarm) {
      return await callService(this.context, commandArgs);
    }

    return await callCompose(this.context, commandArgs);
  }
}
