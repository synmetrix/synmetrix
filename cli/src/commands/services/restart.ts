import "zx/globals";
import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class ServicesRestart extends BaseCommand {
  static args = {
    name: Args.string({ description: "Container name to restart" }),
  };

  static description = "Restart the running container(s)";

  static examples: [
    {
      description: "Restart containers in development mode";
      command: "services restart";
    },
    {
      description: "Restart containers in swarm mode";
      command: "services restart %stack_services_name% -s";
    },
  ];

  public async run(): Promise<ProcessOutput> {
    const { args, flags } = await this.parse(ServicesRestart);

    if (flags.swarm) {
      return await $`docker service update --force ${args.name}`;
    }

    const commandArgs = [];

    if (args.name) {
      commandArgs.push(args.name);
    }

    return await callCompose(this.context, ["restart", ...commandArgs]);
  }
}
