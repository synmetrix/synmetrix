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
      description: "Destroy containers in development mode";
      command: "services destroy";
    },
    {
      description: "Destroy container in swarm mode";
      command: "services destroy %stack_services_name% -s";
    },
  ];

  public async run() {
    const { args, flags } = await this.parse(ServicesDestroy);

    if (flags.swarm) {
      return await $`docker service rm ${args.name}`;
    }

    const commandArgs = [];

    commandArgs.push("rm", "-s", "-f");

    if (args.name) {
      commandArgs.push(args.name);
    }

    return await callCompose(this.context, commandArgs);
  }
}
