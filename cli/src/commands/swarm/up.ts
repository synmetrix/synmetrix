import { $ } from "zx";
import { Args, Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callSwarm, callBuild } from "../../utils.js";

export default class Up extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Stack name",
      required: true,
    }),
  };

  static description = "Up docker Stack";

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
    const { args, flags } = await this.parse(Up);

    const commandArgs = ["up"];

    if (flags.build) {
      await callBuild(this.context);
    }

    if (args.name) {
      commandArgs.push(args.name);
    }

    if (flags.init) {
      await $`docker swarm init`;
    }

    return await callSwarm(this.context, commandArgs);
  }
}
