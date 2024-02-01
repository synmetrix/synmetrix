import { Command, Flags } from "@oclif/core";
import { config } from "dotenv";
import path from "path";

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
    networkName: Flags.string({
      char: "n",
      description: "Docker network name",
      default: NETWORK_NAME,
    }),
    stage: Flags.boolean({
      char: "p",
      description: "Run in stage environment",
    }),
  };

  context: CustomContext = {};

  protected async init(): Promise<void> {
    const { flags } = await this.parse(this.constructor as typeof Command);
    const env = flags.stage ? "stage" : "dev";

    const envFiles = [".env", `.${env}.env`];
    for (const envFile of envFiles) {
      config({ path: path.resolve(envFile) });
    }

    this.context = {
      dockerComposeFile: `docker-compose.${env}.yml`,
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
