import { $ } from "zx";
import { Args, Command } from "@oclif/core";

export default class Ps extends Command {
  static args = {
    name: Args.string({
      description: "Stack name",
      required: true,
    }),
  };

  static description = "Show running services in a stack";

  public async run(): Promise<any> {
    const { args } = await this.parse(Ps);

    return await $`docker stack ps ${args.name} --no-trunc`;
  }
}
