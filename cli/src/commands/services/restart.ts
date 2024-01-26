import { Args } from '@oclif/core';

import BaseCommand from '../../BaseCommand.js';
import { callCompose } from '../../utils.js';

export default class ServicesRestart extends BaseCommand {
  static args = {
    name: Args.string({description: 'Container name to restart'}),
  }

  static description = "Restart the running container(s)";

  public async run(): Promise<void> {
    const { args } = await this.parse(ServicesRestart)

    const commandArgs = [];
    if (args.name) {
      commandArgs.push(args.name);
    }

    callCompose(this.context, `restart ${commandArgs.join(" ")}`);
  }
}
