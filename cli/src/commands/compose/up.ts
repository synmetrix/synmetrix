import { $ } from "zx";
import { Args, Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Up extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Container name",
    }),
  };

  static description = "Up docker compose stack";

  static flags = {
    ...BaseCommand.flags,
    build: Flags.boolean({
      char: "b",
      description: "Build images",
      default: false,
    }),
    pull: Flags.boolean({
      description: "Force pulling images",
      default: false,
    }),
    init: Flags.boolean({
      char: "i",
      description: "Init network",
      default: false,
    }),
  };

  public async run(): Promise<any> {
    const { args, flags } = await this.parse(Up);

    const commandArgs = ["up"];

    if (flags.build) {
      commandArgs.push("--build");
    }

    if (flags.pull) {
      commandArgs.push("--pull");
    }

    commandArgs.push("-d", args.name || "");

    if (flags.init) {
      await $`docker network rm ${flags.networkName}`.nothrow();
      await $`docker network create --attachable ${flags.networkName}`.nothrow();
    }

    return await callCompose(this.context, commandArgs);
  }
}
