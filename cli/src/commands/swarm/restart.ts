import { $ } from "zx";
import { Args, Command } from "@oclif/core";

export default class Restart extends Command {
  static args = {
    name: Args.string({
      description: "Service name",
      required: true,
    }),
  };

  static description = "Restart the running service";

  public async run(): Promise<any> {
    const { args } = await this.parse(Restart);

    const commandArgs = ["update", "--force", args.name];

    return await $`docker service ${commandArgs}`;
  }
}
