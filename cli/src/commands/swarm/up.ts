import { $ } from "zx";
import { Args, Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callSwarm } from "../../utils.js";

export default class Up extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Stack name",
      required: true,
    }),
  };

  static description = "Deploy Docker Stack";

  static flags = {
    ...BaseCommand.flags,
    build: Flags.boolean({
      char: "b",
      description: "Build images",
      dependsOn: ["registry"],
    }),
    init: Flags.boolean({
      char: "i",
      description: "Init Docker Swarm mode and setup network",
      default: false,
    }),
    registry: Flags.string({
      char: "r",
      description: "Specify docker registry",
      env: "REGISTRY_HOST",
    }),
  };

  public async run(): Promise<any> {
    const { args, flags } = await this.parse(Up);

    if (flags.registry) {
      process.env.REGISTRY_HOST = flags.registry;
    }

    if (flags.build) {
      await this.config.runCommand("compose:push", ["--env", flags.env]);
    }

    if (flags.init) {
      await $`docker swarm init`.nothrow();

      await $`docker network rm ${flags.networkName}`.nothrow();
      await $`docker network create --driver=overlay --attachable ${flags.networkName}`.nothrow();
    }

    const commandArgs = ["up"];

    if (args.name) {
      commandArgs.push(args.name);
    }

    return await callSwarm(this.context, commandArgs);
  }
}
