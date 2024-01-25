import { Command, Flags } from '@oclif/core';

export interface CustomContext {
  dockerComposeFile?: string;
  rootPath?: string;
  runtimeEnv?: string;
}

export default abstract class BaseCommand extends Command {
  static args = {
    ...Command.args,
  };
  
  static flags = {
    ...Command.flags,
    rootPath: Flags.string({ hidden: true, required: true }),
    stage: Flags.boolean({ char: 'p', description: 'Run in stage environment' }),
  };

  context: CustomContext = {};

  protected async init(): Promise<void> {
    const { flags } = await this.parse(this.constructor as typeof Command & { flags: Record<string, boolean> });
    const env = flags.stage ? 'stage' : 'dev';

    this.context = {
      dockerComposeFile: `docker-compose.${env}.yml`,
      rootPath: flags.rootPath,
      runtimeEnv: env,
    };

    console.log("Runtime Environment:", env)
  }
}
