import "zx/globals";

import type { CustomContext } from "./BaseCommand.js";

export const callSystem = async (cmd: string): Promise<ProcessOutput> => {
  console.log(`Command: ${cmd}`);

  try {
    return await $`/bin/bash -c ${cmd}`;
  } catch {
    throw new Error("Error, exit");
  }
};

export const callDocker = async (ctx: CustomContext, cmd: string): Promise<ProcessOutput> => {
  const callCommand = `docker ${cmd}`;
  return await callSystem(callCommand);
};

export const callService = async (ctx: CustomContext, cmd: string): Promise<ProcessOutput> => {
  const callCommand = `docker service ${cmd}`;
  return await callSystem(callCommand);
};

export const callCompose = async (ctx: CustomContext, cmd: string): Promise<ProcessOutput> => {
  const args = `-f ${ctx.dockerComposeFile}`;

  const callCommand = `docker compose ${args} ${cmd}`;
  return await callSystem(callCommand);
};

export const callSwarm = async (ctx: CustomContext, cmd: string): Promise<ProcessOutput> => {
  const composeArgs = `-f ${ctx.dockerComposeFile}`;

  const args = `-c '<(echo -e "version: '3.9'"; docker compose ${composeArgs} config| (sed "/published:/s/\\"//g") | (sed "/^name:/d"))'`;

  const callCommand = `docker stack ${cmd} ${args}`;
  return await callSystem(callCommand);
};
