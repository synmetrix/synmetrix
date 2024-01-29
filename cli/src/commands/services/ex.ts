import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class ServicesEx extends BaseCommand {
  static args = {
    name: Args.string({ description: "Container name for command", required: true }),
    cmd: Args.string({ description: "Command to execute", required: true }),
  }

  static description = "Exec command in container";

  public async run(): Promise<ProcessOutput> {
    const { args } = await this.parse(ServicesEx);

    return callCompose(this.context, `exec ${args.name} ${args.cmd}`);
  }
}
