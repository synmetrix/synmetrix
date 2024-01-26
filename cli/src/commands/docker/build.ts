import { Args, Flags } from "@oclif/core";
import fsPromises from "fs/promises";
import { basename, dirname, join } from "path";

import BaseCommand from "../../BaseCommand.js";
import { callSystem } from "../../utils.js";
import DockerRun from "./run.js";

export default class DockerBuild extends BaseCommand {
  static args = {
    ...BaseCommand.args,
    name: Args.string({ required: true, description: "Container name" }),
    path: Args.file({ required: true, description: "Path to Dockerfile" }),
    cmd: Args.string({ description: "Command" }),
  };

  static description = "Build Docker image";

  static examples = [
    "./cli2 docker build actions ./services/actions/Dockerfile"
  ];

  static flags = {
    ...BaseCommand.flags,
    pull: Flags.boolean({description: "Pull the image"}),
    push: Flags.boolean({description: "Push the image"}),
  } as const;

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DockerBuild);
    const { name, path, cmd } = args;
    const { pull, push } = flags;

    const additionalArgs = [];
    let buildPath = path;
    
    try {
      const stat = await fsPromises.stat(path);
      if (stat.isFile()) {
        const dockerfile = basename(path);
        buildPath = dirname(path);
        additionalArgs.push(`-f ${join(buildPath, dockerfile)}`);
      }
    } catch {
      // noop
    }

    if (pull) {
      additionalArgs.push("--pull");
    }

    const buildCmd = `docker build ${additionalArgs.join(" ")} -t ${name} ${buildPath}`;

    callSystem(buildCmd);
    

    callSystem(`docker tag ${name}:latest ${name}:latest`);

    if (push) {
      callSystem(`docker push ${name}`);
    }

    if (cmd) {
      this.runCommand(DockerRun, [name, name, cmd]);
    }
  }
}
