import { Command, Flags } from "@oclif/core";
import { config } from "dotenv";
import { pathExists } from "fs-extra";
import { PROJECT_DIR } from "./utils.js";
import "zx/globals";

const NETWORK_NAME = "synmetrix_default";

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
      char: "s",
      description: "Shell for exec commands",
    }),
    networkName: Flags.string({
      char: "n",
      description: "Docker network name",
      default: NETWORK_NAME,
    }),
    env: Flags.string({
      char: "e",
      default: "dev",
      description: "Environment",
    }),
    swarm: Flags.boolean({
      char: "s",
      default: false,
      description: "Run in swarm mode",
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
        throw new Error("Shell is not exists, please check \"--shell=\" flag");
      }

      $.shell = flags.shell;
    }

    this.context = {
      dockerComposeFile: `${PROJECT_DIR}/docker-compose.${env}.yml`,
      runtimeEnv: env,
      networkName: flags.networkName,
    };

    console.log("Runtime Environment:", env);
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
