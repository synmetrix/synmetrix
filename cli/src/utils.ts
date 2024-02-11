import { $ } from "zx";
import type { CustomContext } from "./BaseCommand.js";

export const PROJECT_DIR = process.cwd();

export const callService = async (
  ctx: CustomContext,
  args: string[],
): Promise<ProcessOutput> => {
  return await $`docker service ${args}`;
};

export const callCompose = async (
  ctx: CustomContext,
  args: string[],
): Promise<ProcessOutput> => {
  const dockerFile = ["-f", ctx.dockerComposeFile];

  return await $`docker compose ${[...dockerFile, ...args]}`;
};

export const callBuild = async (ctx: CustomContext): Promise<ProcessOutput> => {
  const buildArgs = ["-f", ctx.dockerComposeFile, "build", "--no-cache"];

  return await $`docker compose ${buildArgs}`;
};

export const callSwarm = async (
  ctx: CustomContext,
  args: string[],
): Promise<ProcessOutput> => {
  const composeArgs = ["-f", ctx.dockerComposeFile];

  const processedConfig =
    await $`(echo -e "version: \'3.9\'"; docker compose ${composeArgs} config| (sed "/published:/s/\\"//g") | (sed "/^name:/d"))`.pipe(
      $`docker stack ${args} -c -`,
    );

  return processedConfig;
};
