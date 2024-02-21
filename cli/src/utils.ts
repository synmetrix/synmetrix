import { $ } from "zx";
import type { CustomContext } from "./BaseCommand.js";

export const NETWORK_NAME = "synmetrix_default";
export const PROJECT_DIR = process.cwd();

export const callCompose = async (
  ctx: CustomContext,
  args: string[],
): Promise<any> => {
  const dockerFile = ["-f", ctx.dockerComposeFile];

  return await $`docker compose ${[...dockerFile, ...args]}`;
};

export const callSwarm = async (
  ctx: CustomContext,
  args: string[],
): Promise<any> => {
  const composeArgs = ["-f", ctx.dockerComposeFile];

  const processedConfig =
    await $`(echo -e "version: \'3.9\'"; docker compose ${composeArgs} config| (sed "/published:/s/\\"//g") | (sed "/^name:/d"))`.pipe(
      $`docker stack ${args} -c -`,
    );

  return processedConfig;
};
