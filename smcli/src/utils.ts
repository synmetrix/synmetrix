import { dump, load } from 'js-yaml';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const PROJECT_DIR = path.join(path.dirname(path.resolve(import.meta.url)), '..');

interface CustomContext {
  obj: {
    docker_compose_file: string;
  };
}

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
    execSync(`/bin/bash -c ${cmd}`, { shell: '/bin/bash', stdio: 'inherit' });
  } catch {
    throw new Error("Error, exit");
  }
};

export const callDocker = (ctx: CustomContext, cmd: string) => {
  const callCommand = `docker ${cmd}`;
  callSystem(callCommand);
};

export const callService = (ctx: CustomContext, cmd: string) => {
  const callCommand = `docker service ${cmd}`;
  callSystem(callCommand);
};

export const callCompose = (ctx: CustomContext, cmd: string) => {
  const args = `-f ${ctx.obj.docker_compose_file}`;

  const callCommand = `docker compose ${args} ${cmd}`;
  callSystem(callCommand);
};

export const callSwarm = (ctx: CustomContext, cmd: string) => {
  const composeArgs = `-f ${ctx.obj.docker_compose_file}`;

  const args = `-c '<(echo -e "version: '3.9'"; docker compose ${composeArgs} config| (sed "/published:/s/\\"//g") | (sed "/^name:/d"))'`;

  const callCommand = `docker stack ${cmd} ${args}`;
  callSystem(callCommand);
};
