import { expect, test } from "@oclif/test";

describe("compose:restart", () => {
  test
    .stderr()
    .command(["compose:restart"])
    .it("runs compose:restart without arguments", (ctx) => {
      expect(ctx.stderr).to.match(/hasura.+Restarting/);
      expect(ctx.stderr).to.match(/hasura.+Started/);
    });

  test
    .stderr()
    .command(["compose:restart", "actions"])
    .it("runs compose:restart with a container name argument", (ctx) => {
      expect(ctx.stderr).to.match(/actions.+Restarting/);
      expect(ctx.stderr).to.match(/actions.+Started/);
    });
});
