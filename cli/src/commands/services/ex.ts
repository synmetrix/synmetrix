import "zx/globals";
import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class ServicesEx extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Container name for command",
      required: true,
    }),
    cmd: Args.string({ description: "Command to execute", required: true }),
  };

  static description = "Exec command in container";

  public async run(): Promise<ProcessOutput> {
    const { args, flags } = await this.parse(ServicesEx);
    const commandArgs = ["exec", args.name, args.cmd];

    if (flags.swarm) {
      return await $`docker service exec ${commandArgs}`;
    }
    return await callCompose(this.context, commandArgs);
  }
}
