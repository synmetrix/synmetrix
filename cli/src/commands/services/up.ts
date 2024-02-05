import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose, callSwarm } from "../../utils.js";

export default class ServicesUp extends BaseCommand {
  static args = {
    name: Args.string({ description: "Container name to up" }),
  };

  static description = "Up docker compose stack";

  public async run(): Promise<ProcessOutput> {
    const { args, flags } = await this.parse(ServicesUp);

    const commandArgs = ["up"];

    if (flags.env === "dev") {
      commandArgs.push("-d", "--build");
    }

    if (args.name) {
      commandArgs.push(args.name);
    }

    if (flags.swarm) {
      return await callSwarm(this.context, commandArgs);
    } else {
      return await callCompose(this.context, commandArgs);
    }
  }
}
