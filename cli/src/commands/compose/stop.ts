import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Stop extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Container name",
    }),
  };

  static description = "Stop container(s)";

  async run(): Promise<any> {
    const { args } = await this.parse(Stop);

    const commandArgs = [];
    if (args.name) {
      commandArgs.push(args.name);
    }

    return await callCompose(this.context, ["stop", ...commandArgs]);
  }
}
