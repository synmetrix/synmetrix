import { $ } from "zx";
import { Args, Command } from "@oclif/core";

export default class Destroy extends Command {
  static args = {
    name: Args.string({
      description: "Stack name",
      required: true,
    }),
  };

  static description = "DESTROY Docker Swarm stack";

  public async run() {
    const { args } = await this.parse(Destroy);

    return await $`docker stack rm ${args.name}`;
  }
}
