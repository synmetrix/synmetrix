import { Args } from '@oclif/core';

import BaseCommand from '../../BaseCommand.js';
import { callCompose, callService } from '../../utils.js';

export default class ServicesUp extends BaseCommand {
  static args = {
    name: Args.string({description: 'Container name to up'}),
  }

  static description = 'Up docker compose stack'

  public async run(): Promise<void> {
    const { args } = await this.parse(ServicesUp);

    const commandArgs = [];
    if (args.name) {
      commandArgs.push(args.name);
    }

    const env = this.context.runtimeEnv;
    if (env === "dev") {
      commandArgs.push('-d --build');
      callCompose(this.context, `up ${commandArgs.join(' ')}`)
    } else {
      callService(this.context, `up ${commandArgs.join(' ')}`)
    }
  }
}
