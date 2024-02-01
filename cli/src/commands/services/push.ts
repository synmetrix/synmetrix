import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class ServicesPush extends BaseCommand {
  static args = {
    name: Args.string({description: "Container name to push"}),
  }

  static description = "Push Docker Compose images"

  public async run(): Promise<void> {
    const { args } = await this.parse(ServicesPush);

    const commandArgs = [];
    if (args.name) {
      commandArgs.push(args.name);
    }

    await callCompose(this.context, `build ${commandArgs.join(" ")}`);
    await callCompose(this.context, `push ${commandArgs.join(" ")}`);
  }
}
