import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Restart extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Container name",
    }),
  };

  static description = "Restart the running container(s)";

  public async run(): Promise<any> {
    const { args } = await this.parse(Restart);

    const commandArgs = [];

    if (args.name) {
      commandArgs.push(args.name);
    }

    return await callCompose(this.context, ["restart", ...commandArgs]);
  }
}
