import { Command, Flags } from '@oclif/core';

import { callCompose } from "../../utils.js";

interface CustomContext {
  obj: {
    docker_compose_file: string;
  };
}

export default class Stop extends Command {
  static description = 'Stop container(s)';

  static flags = {
    name: Flags.string({
      char: 'n',
      default: '',
      description: 'Container name',
      metavar: '<name>',
    }),
  };

  async run(): Promise<void> {
    // const { flags } = this.parse(Stop);
    this.log(`Running tag command: ${process.env}`);
    await callCompose({} as CustomContext, `stop`);
  }
}
