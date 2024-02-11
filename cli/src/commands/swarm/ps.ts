import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";

export default class Ps extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Stack name",
      required: true,
    }),
  };

  static description = "PS all services";

  public async run(): Promise<ProcessOutput> {
    const { args } = await this.parse(Ps);

    return await $`docker stack ps ${args.name} --no-trunc`;
  }
}
