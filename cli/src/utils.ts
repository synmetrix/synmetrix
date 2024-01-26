import "zx/globals";

import type * as BaseCommandJs from "./BaseCommand.js";

export const callSystem = (cmd: string) => {
  console.log(`Command: ${cmd}`);

  try {
    $`/bin/bash -c ${cmd}`;
  } catch {
    throw new Error("Error, exit");
  }
};

export const callDocker = (ctx: BaseCommandJs.CustomContext, cmd: string) => {
  const callCommand = `docker ${cmd}`;
  callSystem(callCommand);
};

export const callService = (ctx: BaseCommandJs.CustomContext, cmd: string) => {
  const callCommand = `docker service ${cmd}`;
  callSystem(callCommand);
};

export const callCompose = (ctx: BaseCommandJs.CustomContext, cmd: string) => {
  const args = `-f ${ctx.dockerComposeFile}`;

  const callCommand = `docker compose ${args} ${cmd}`;
  callSystem(callCommand);
};

export const callSwarm = (ctx: BaseCommandJs.CustomContext, cmd: string) => {
  const composeArgs = `-f ${ctx.dockerComposeFile}`;

  const args = `-c '<(echo -e "version: '3.9'"; docker compose ${composeArgs} config| (sed "/published:/s/\\"//g") | (sed "/^name:/d"))'`;

  const callCommand = `docker stack ${cmd} ${args}`;
  callSystem(callCommand);
};
