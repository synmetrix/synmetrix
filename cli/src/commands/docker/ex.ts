import "zx/globals";
import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";

export default class Ex extends BaseCommand {
  static args = {
    name: Args.string({
      description: "Container name",
      required: true,
    }),
    cmd: Args.string({ description: "Command to execute", required: true }),
  };

  static description = "Exec command in container";

  public async run(): Promise<ProcessOutput> {
    const { args } = await this.parse(Ex);

    return await $`docker exec -it $(docker ps -q -f name=${args.name} | head -1) ${args.cmd}`;
  }
}
