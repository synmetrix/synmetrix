import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callService } from "../../utils.js";

export default class Destroy extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Stack name",
      required: true,
    }),
  };

  static description = "DESTROY Docker Swarm stack";

  public async run() {
    const { args } = await this.parse(Destroy);

    const commandArgs = ["rm", args.name];

    return await callService(this.context, commandArgs);
  }
}
