import "zx/globals";
import { Args, Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose, callSwarm, callBuild } from "../../utils.js";

export default class ServicesUp extends BaseCommand {
  static args = {
    ...BaseCommand.args,
    name: Args.string({
      description: "Container name or Stack name in swarm mode",
    }),
  };

  static description = "Up docker compose stack";

  static examples: [
    {
      description: "Up containers in development mode";
      command: "services up";
    },
    {
      description: "Up stack in swarm mode with swarm init and build images";
      command: "services up my-stack -sib";
    },
  ];

  static flags = {
    ...BaseCommand.flags,
    build: Flags.boolean({
      char: "b",
      description: "Build images",
      default: false,
    }),
    init: Flags.boolean({
      char: "i",
      description: "Init docker swarm (only swarm mode)",
      default: false,
    }),
  };

  public async run(): Promise<ProcessOutput> {
    const { args, flags } = await this.parse(ServicesUp);

    const commandArgs = ["up"];

    if (flags.build) {
      await callBuild(this.context);
    }

    if (flags.swarm) {
      if (args.name) {
        commandArgs.push(args.name);
      }

      if (flags.init) {
        await $`docker swarm init`;
      }

      return await callSwarm(this.context, commandArgs);
    }

    commandArgs.push("-d", args.name || "");

    return await callCompose(this.context, commandArgs);
  }
}
