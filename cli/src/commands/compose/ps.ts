import BaseCommand from "../../BaseCommand.js";
import { callCompose } from "../../utils.js";

export default class ComposePs extends BaseCommand {
  static description = "PS all containers";

  public async run(): Promise<ProcessOutput> {
    return await callCompose(this.context, ["ps"]);
  }
}
