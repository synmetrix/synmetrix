import fs from 'fs';
import { dump, load } from 'js-yaml';
import path from 'path';
import 'zx/globals';

import type * as BaseCommandJs from './BaseCommand.js';

export const PROJECT_DIR = path.join(path.dirname(path.resolve(import.meta.url)), '..');

export const readYaml = (filename: string) => {
  if (!fs.existsSync(filename)) {
    return null;
  }

  const fileContent = fs.readFileSync(filename, 'utf8');
  return load(fileContent);
};

export const writeYaml = (data: string, filename: string) => {
  fs.appendFileSync(filename, dump(data));
  return dump(data);
};

export const consoleYellow = (text: string) => {
  console.log(`\u001B[33m${text}\u001B[0m`);
};

export const consoleRed = (text: string) => {
  console.log(`\u001B[31m${text}\u001B[0m`);
};

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
  const args = `-f ${ctx.rootPath}/${ctx.dockerComposeFile}`;

  const callCommand = `docker compose ${args} ${cmd}`;
  callSystem(callCommand);
};

export const callSwarm = (ctx: BaseCommandJs.CustomContext, cmd: string) => {
  const composeArgs = `-f ${ctx.rootPath}/${ctx.dockerComposeFile}`;

  const args = `-c '<(echo -e "version: '3.9'"; docker compose ${composeArgs} config| (sed "/published:/s/\\"//g") | (sed "/^name:/d"))'`;

  const callCommand = `docker stack ${cmd} ${args}`;
  callSystem(callCommand);
};
