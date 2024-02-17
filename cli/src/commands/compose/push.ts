import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Push extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Container name",
    }),
  };

  static description = "Push Docker images";

  public async run(): Promise<any> {
    const { args } = await this.parse(Push);

    const commandArgs = [];
    if (args.name) {
      commandArgs.push(args.name);
    }

    await callCompose(this.context, ["build", ...commandArgs]);
    await callCompose(this.context, ["push", ...commandArgs]);
  }
}
