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

// def call_swarm(ctx, cmd):
//     compose_args = " ".join(["-f", ctx.obj["docker_compose_file"]])

//     args = " ".join(
//         [
//             "-c",
//             '<(echo -e "version: \'3.9\'"; docker-compose %s config| (sed "/published:/s/\\"//g") | (sed "/^name:/d"))'
//             % compose_args,
//         ]
//     )

//     call_command = "docker stack %s %s" % (cmd, args)
//     call_system(call_command)

export const callSwarm = async (
  ctx: CustomContext,
  args: string[],
): Promise<ProcessOutput> => {
  const composeArgs = ["-f", ctx.dockerComposeFile];

  const stackArgs = [
    "-c",
    `<(echo -e "version: \'3.9\'"; docker-compose ${composeArgs} config| (sed "/published:/s/\\"//g") | (sed "/^name:/d"))`,
  ];

  return await $`docker stack ${stackArgs}`
    .pipe($`docker compose ${composeArgs}`);
};
