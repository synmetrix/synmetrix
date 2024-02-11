import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Destroy extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Container name",
    }),
  };

  static description = "DESTROY Docker Compose stack";

  public async run() {
    const { args } = await this.parse(Destroy);

    const commandArgs = [];

    commandArgs.push("rm", "-s", "-f");

    if (args.name) {
      commandArgs.push(args.name);
    }

    return await callCompose(this.context, commandArgs);
  }
}
