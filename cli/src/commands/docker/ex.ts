import { $ } from "zx";
import { Command, Args } from "@oclif/core";

export default class Ex extends Command {
  static args = {
    name: Args.string({
      description: "Container name",
      required: true,
    }),
    cmd: Args.string({ description: "Command to execute", required: true }),
  };

  static description = "Exec command in container";

  public async run(): Promise<any> {
    const { args } = await this.parse(Ex);

    return await $`docker exec -it $(docker ps -q -f name=${args.name} | head -1) ${args.cmd}`;
  }
}
