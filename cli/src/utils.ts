import "zx/globals";

import type { CustomContext } from "./BaseCommand.js";

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

export const callSwarm = async (
  ctx: CustomContext,
  args: string[],
): Promise<ProcessOutput> => {
  const composeArgs = ["-f", ctx.dockerComposeFile];

  const stackArgs = [
    ...args,
    "-c",
    `<(echo -e "version: \'3.9\'"; docker compose ${composeArgs} config | (sed "/published:/s/\\"//g") | (sed "/^name:/d"))`,
  ];

  return await $`docker stack ${stackArgs}`;
};
