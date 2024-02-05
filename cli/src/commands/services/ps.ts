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
    const { args } = await this.parse(ServicesPs);

    const env = this.context.runtimeEnv;

    if (env === "dev") {
      return await callCompose(this.context, ["ps"]);
    } else {
      const commandArgs = [];

      if (args.name) {
        commandArgs.push(args.name);
      }

      return await $`docker stack ps --no-trunc ${commandArgs}`;
    }
  }
}
