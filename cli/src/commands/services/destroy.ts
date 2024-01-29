import { Args } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";
import { callCompose, callSystem } from "../../utils.js";

export default class ServicesDestroy extends BaseCommand {
  static args = {
    name: Args.string({description: "Container name to destroy"}),
  }

  static description = "DESTROY Docker Compose stack";

  public async run(): Promise<ProcessOutput> {
    const {args} = await this.parse(ServicesDestroy)

    const commandArgs = [];
    const env = this.context.runtimeEnv;
    if (env === "dev") {
      commandArgs.push("-s", "-f");

      return callCompose(this.context, `rm ${commandArgs.join(" ")}`)
    } else {

      if (args.name) {
        commandArgs.push(args.name);
      }

      return callSystem(`docker stack rm ${commandArgs.join(" ")}`);
    }
  }
}
