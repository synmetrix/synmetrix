import "zx/globals";
import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class ServicesDestroy extends BaseCommand {
  static args = {
    name: Args.string({ description: "Container name to destroy" }),
  };

  static description = "DESTROY Docker Compose stack";

  static examples: [
    {
      description: 'Destroy containers in development mode',
      command: 'services destroy',
    },
    {
      description: 'Destroy container in swarm mode',
      command: 'services destroy %stack_services_name% -s',
    }
  ];

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
      return await $`docker service rm ${args.name}`;
    } else {
      return await callCompose(this.context, commandArgs);
    }
  }
}
