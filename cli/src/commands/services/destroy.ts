import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";
import "zx/globals";

export default class ServicesDestroy extends BaseCommand {
  static args = {
    name: Args.string({ description: "Container name to destroy" }),
  };

  static description = "DESTROY Docker Compose stack";

  public async run() {
    const { args, flags } = await this.parse(ServicesDestroy);

    const commandArgs = [];
    const env = this.context.runtimeEnv;
    if (env === "dev") {
      commandArgs.push("rm", "-s", "-f");
    }

    if (args.name) {
      commandArgs.push(args.name);
    }

    if (flags.swarm) {
      return await $`docker stack rm ${commandArgs}`.pipe(process.stdout);
    } else {
      return await callCompose(this.context, commandArgs);
    }
  }
}
