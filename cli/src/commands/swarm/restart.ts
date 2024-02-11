import "zx/globals";
import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class Restart extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Service name",
      required: true,
    }),
  };

  static description = "Restart the running service(s)";

  public async run(): Promise<ProcessOutput> {
    const { args } = await this.parse(Restart);

    return await $`docker service update --force ${args.name}`;
  }
}
