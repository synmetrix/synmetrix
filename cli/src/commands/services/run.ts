import { Args } from '@oclif/core';

import BaseCommand from '../../BaseCommand.js';
import { callCompose } from '../../utils.js';

export default class ServicesRun extends BaseCommand {
  static args = {
    name: Args.string({description: 'Container name to run'}),
  }

  static description = "Run Docker Compose stack";

  public async run(): Promise<void> {
    const { args } = await this.parse(ServicesRun)

    let commandArgs = [args.name].filter(Boolean);
    
    callCompose(this.context, `build ${commandArgs.join(" ")}`);
    callCompose(this.context, `stop ${commandArgs.join(" ")}`);
    
    commandArgs = ["--service-ports", "--use-aliases", "--rm", ...commandArgs];

    callCompose(this.context, `run ${commandArgs.join(" ")}`);
  }
}
