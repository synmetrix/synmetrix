import { expect, test } from "@oclif/test";
import { wait } from "../../helpers.js";

describe("utils:sql-api", () => {
  test
  .command(["utils:sql-api", "SELECT 1;"])
  .stderr()
  .stdout()
  .it("runs utils:sql-api", async (ctx, done) => {
    await wait(2000);

    expect(ctx.stderr + ctx.stdout).to.contain("Int64");

    done();
  });
});
