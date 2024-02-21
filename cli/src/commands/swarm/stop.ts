import { $ } from "zx";
import { Args, Command } from "@oclif/core";

export default class Stop extends Command {
  static args = {
    name: Args.string({
      description: "Service name",
      required: true,
    }),
  };

  static description = "Remove Swarm service";

  public async run() {
    const { args } = await this.parse(Stop);

    const commandArgs = ["rm", args.name];

    return await $`docker service ${commandArgs}`;
  }
}
