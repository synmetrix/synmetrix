import { Args, Command, Flags } from '@oclif/core';
import "zx/globals";

export default class DockerBuild extends Command {
  static args = {
    path: Args.string({ required: true }),
  }

  static description = "Build Docker image";

  static flags = {
    name: Flags.string({char: 'n', description: 'Name the build image, please'}),
    pull: Flags.boolean({description: 'Pull the image'}),
    push: Flags.boolean({description: 'Push the image'}),
  } as const;

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DockerBuild);

    const registryAddr = '';
    const additionalArgs: string[] = [];

    if (args.path.endsWith('.Dockerfile')) {
      const dockerfile = args.path.split('/').pop() || '';
      args.path = args.path.replace(`/${dockerfile}`, '');
      additionalArgs.push(`-f ${args.path}/${dockerfile}`);
    }

    if (flags.pull) {
      additionalArgs.push('--pull');
    }

    this.log(`Building Docker image at ${args.path}`);

    const buildCmd = `docker build ${additionalArgs.join(' ')} -t ${flags.name} ${args.path}`;
    this.log(`Running build command: ${buildCmd}`);

    await $`${buildCmd}`

    if (flags.push) {
      const fullImageName = [registryAddr, flags.name].filter(Boolean).join('/');
      const tagCmd = `docker tag ${flags.name}:latest ${fullImageName}:latest`;
      const pushCmd = `docker push ${fullImageName}`;
      this.log(`Running tag command: ${tagCmd}`);
      this.log(`Running push command: ${pushCmd}`);

      await $`${pushCmd}`
    }
  }
}
