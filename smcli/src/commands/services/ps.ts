import { Args } from '@oclif/core';
import 'zx/globals';

import BaseCommand from '../../BaseCommand.js';
import { callCompose } from '../../utils.js';

export default class ServicesPs extends BaseCommand {
  static args = {
    name: Args.string(),
  }

  static description = "PS all containers";

  public async run(): Promise<void> {
    const { args } = await this.parse(ServicesPs)

    const env = this.context.runtimeEnv;

    if (env === "dev") {
      callCompose(this.context, "ps")
    } else {
      const commandArgs = [];

      if (args.name) {
        commandArgs.push(args.name);
      }

      $`docker stack ps --no-trunc ${commandArgs.join(" ")}`;
    }
  }
}
