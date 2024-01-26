import { Args, Flags } from '@oclif/core';

import BaseCommand from '../../BaseCommand.js';
import { callSystem } from '../../utils.js';

export default class DockerRun extends BaseCommand {
  static args = {
    ...BaseCommand.args,
    name: Args.string({ description: 'Container name', required: true }),
    imageName: Args.string({ description: 'Image name', required: true }),
    cmd: Args.string({ description: 'Command to execute', required: true }),
  }

  static description = 'Docker run'

  static flags = {
    ...BaseCommand.flags,
    volume: Flags.string({ description: 'Volume', multiple: true }),
    env: Flags.string({ description: 'Environment variable', multiple: true }),
    port: Flags.string({ description: 'Port', multiple: true, char: 'p' }),
    registry: Flags.string({ description: 'Registry', default: 'localhost:50000' }),
    tag: Flags.string({ description: 'Tag', default: 'latest' }),
    tty: Flags.boolean({ description: 'TTY', default: true }),
    entry: Flags.string({ description: 'Entry' }),
    envFile: Flags.string({ description: 'Environment file', multiple: true, hidden: true }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DockerRun);
    const { name, imageName, cmd } = args;
    const { volume = [], env = [], port = [], registry, tag, tty, entry, envFile } = flags;

    const volumes = volume.map((v) => `-v ${v}`);
    const envs = env.map((e) => `-e ${e}`);
    const ports = port.map((p) => `-p ${p}`);

    const imageUri = [registry, imageName].filter(Boolean);
    const image = imageUri.join('/');

    const commandArgs = ['-i'];

    if (tty) {
      commandArgs.push('-t');
    }

    if (entry) {
      commandArgs.push(`--entrypoint ${entry}`);
    }

    if (envFile) {
      for (const eFile of envFile) {
        commandArgs.push(`--env-file ${eFile}`);
      }
    }

    const runCmd = `docker run \
      --rm \
      --network ${this.context.networkName} \
      --name ${name} \
      --network-alias ${name} \
      ${volumes.join(' ')} \
      ${envs.join(' ')} \
      ${ports.join(' ')} \
      ${commandArgs.join(' ')} \
      ${image}:${tag} \
      ${cmd}`;

    callSystem(runCmd);
  }
}
