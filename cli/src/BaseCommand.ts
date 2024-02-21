import { $, echo, chalk } from "zx";
import { Command, Flags } from "@oclif/core";
import { config } from "dotenv";
import { pathExists } from "fs-extra";
import { PROJECT_DIR, NETWORK_NAME } from "./utils.js";

export interface CustomContext {
  dockerComposeFile?: string;
  networkName?: string;
  runtimeEnv?: string;
}

export default class BaseCommand extends Command {
  static args = {
    ...Command.args,
  };

  static flags = {
    ...Command.flags,
    shell: Flags.string({
      description: "Shell for exec commands (default: /bin/bash)",
    }),
    networkName: Flags.string({
      char: "n",
      aliases: ["network"],
      description: "Docker network name",
      default: NETWORK_NAME,
    }),
    env: Flags.string({
      char: "e",
      default: "dev",
      description: "Environment",
    }),
  };

  context: CustomContext = {};

  protected async init(): Promise<void> {
    const { flags } = await this.parse(this.constructor as typeof Command);
    const env = flags.env;

    const envFiles = [".env", `.${env}.env`];
    for (const envFile of envFiles) {
      const envPath = `${PROJECT_DIR}/${envFile}`;
      const envExists = await pathExists(envPath);

      if (!envExists) {
        throw new Error(`Env file ${envFile} is not exists`);
      }

      config({ path: envPath });
    }

    if (flags.shell) {
      const shellExists = await pathExists(flags.shell);

      if (!shellExists) {
        throw new Error('Shell is not exists, please check "--shell=" flag');
      }

      $.shell = flags.shell;
    }

    this.context = {
      dockerComposeFile: `${PROJECT_DIR}/docker-compose.${env}.yml`,
      runtimeEnv: env,
      networkName: flags.networkName,
    };

    echo(chalk.green.bold("Runtime Environment:"), chalk.bold(env));
  }

  run(): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  public async runCommand(
    Comm: typeof BaseCommand,
    argv: string[],
  ): Promise<unknown> {
    const cmd = await new Comm(argv, this.config);
    cmd.context = this.context;

    return (await cmd.run()) as unknown;
  }
}
