import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Stop extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Service name",
      required: true,
    }),
  };

  static description = "Stop service(s)";

  static flags = {
    ...BaseCommand.flags,
  };

  async run(): Promise<ProcessOutput> {
    const { args } = await this.parse(Stop);

    const commandArgs = [];
    if (args.name) {
      commandArgs.push(args.name);
    }

    return await callCompose(this.context, ["stop", ...commandArgs]);
  }
}
