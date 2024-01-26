import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Stop extends BaseCommand {
  static args = {
    ...BaseCommand.args,
    name: Args.string({
      char: "n",
      default: "",
      description: "Container name",
      metavar: "<name>",
    }),
  };

  static description = "Stop container(s)";

  static flags = {
    ...BaseCommand.flags,
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Stop);

    const commandArgs = [];
    if (args.name) {
      commandArgs.push(args.name);
    }

    await callCompose(this.context, `stop ${commandArgs.join(" ")}`);
  }
}
