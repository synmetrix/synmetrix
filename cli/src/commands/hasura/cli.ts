import { $ } from "zx";
import { Args, Flags } from "@oclif/core";
import { URL } from "node:url";

import BaseCommand from "../../BaseCommand.js";
import { PROJECT_DIR } from "../../utils.js";

export default class Hasura extends BaseCommand {
  static args = {
    ...BaseCommand.args,
    cmd: Args.string({
      description: "Command, what will provided to Hasura",
      required: true,
    }),
  };

  static description = "Manage Hasura service";

  static flags = {
    ...BaseCommand.flags,
    adminSecret: Flags.string({ env: "HASURA_GRAPHQL_ADMIN_SECRET" }),
    hasuraAddr: Flags.string({ default: "http://hasura:8080" }),
    hasuraDir: Flags.string({ description: 'Default: "./services/hasura"' }),
  };

  async run(): Promise<ProcessOutput> {
    const { args, flags } = await this.parse(Hasura);
    const parsedUrl = new URL(flags.hasuraAddr);
    const hasuraDir = flags?.hasuraDir || `${PROJECT_DIR}/services/hasura`;

    const endpoint = `${parsedUrl.hostname}:${parsedUrl.port}`;
    const argsStr = [
      "--endpoint",
      `http://${endpoint}`,
      "--admin-secret",
      flags.adminSecret,
    ];

    await $`docker build ${["-t", "hasura_cli", "./scripts/containers/hasura-cli"]}`;

    const cliCmd = ["hasura-cli", args.cmd, ...argsStr];

    const mainArgs = [
      "--rm",
      "--network",
      `${flags.networkName}`,
      "--name",
      "hasura-cli-tool",
      "--network-alias",
      "hasura-cli-tool",
      "-v",
      `${hasuraDir}/config.yaml:/config.yaml`,
      "-v",
      `${hasuraDir}/migrations:/migrations`,
      "-v",
      `${hasuraDir}/metadata:/metadata`,
      "-v",
      `${hasuraDir}/seeds:/seeds`,
      "-i",
      "--entrypoint",
      "sh",
      "hasura_cli:latest",
      "-c",
      `${cliCmd.join(" ")}`,
    ];

    return await $`docker run ${mainArgs}`;
  }
}
