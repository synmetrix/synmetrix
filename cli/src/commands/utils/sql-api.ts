import { $ } from "zx";
import { Args, Flags } from "@oclif/core";

import BaseCommand from "../../BaseCommand.js";

export default class SqlApi extends BaseCommand {
  static args = {
    cmd: Args.string({
      description: "Initial command to run",
    }),
  }

  static description = "Connect to Cubejs Sql Api";

  static flags = {
    ...BaseCommand.flags,
    host: Flags.string({
      default: "localhost",
      description: "Host",
    }),
    port: Flags.integer({
      default: 15432,
      description: "Port",
    }),
    username: Flags.string({
      default: "user",
      description: "Username",
    }),
    password: Flags.string({
      default: "pass",
      description: "Password",
    }),
    database: Flags.string({
      default: "default",
      description: "Database",
    }),
  };

  public async run(): Promise<any> {
    const { args, flags } = await this.parse(SqlApi);

    const commandArgs = [
      "--host", flags.host,
      "--port", flags.port,
      "--username", flags.username,
      "--dbname", flags.database,
    ];

    if (args.cmd) {
      commandArgs.push("--command", args.cmd);
    }

    return $`PGPASSWORD=${flags.password} psql ${commandArgs}`;
  }
}
