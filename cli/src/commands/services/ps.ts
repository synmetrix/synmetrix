import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";
import "zx/globals";

export default class ServicesPs extends BaseCommand {
  static args = {
    name: Args.string(),
  };

  static description = "PS all containers";

  public async run(): Promise<ProcessOutput> {
    const { args, flags } = await this.parse(ServicesPs);

    if (flags.swarm) {
      const commandArgs = [];

      if (args.name) {
        commandArgs.push(args.name);
      }

      return await $`docker stack ps --no-trunc ${commandArgs}`;
    }

    return await callCompose(this.context, ["ps"]);
  }
}
