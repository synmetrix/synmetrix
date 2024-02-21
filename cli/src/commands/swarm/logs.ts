import { $ } from "zx";
import { Args, Flags, Command } from "@oclif/core";

export default class Logs extends Command {
  static args = {
    name: Args.string({
      description: "Service name",
      required: true,
    }),
  };

  static description = "Print logs for Docker Swarm service";

  static flags = {
    tail: Flags.integer({
      default: 500,
      description: "Number of last rows to show",
    }),
  };

  public async run(): Promise<any> {
    const { args, flags } = await this.parse(Logs);

    const commandArgs = ["logs", "-f", "--tail", `${flags.tail}`];

    if (args.name) {
      commandArgs.push(args.name);
    }

    return await $`docker service ${commandArgs}`;
  }
}
