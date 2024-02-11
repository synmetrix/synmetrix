import { expect, test } from "@oclif/test";

describe("compose:stop", () => {
  test
    .command("compose:up")
    .stderr()
    .command("compose:stop")
    .it("runs compose:stop without arguments", (ctx) => {
      expect(ctx.stderr).to.match(/hasura.+Stopping/);
      expect(ctx.stderr).to.match(/hasura.+Stopped/);
    });

  test
    .command("compose:up")
    .stderr()
    .command(["compose:stop", "actions"])
    .it("runs compose:stop with a container name argument", (ctx) => {
      expect(ctx.stderr).to.match(/actions.+Stopping/);
      expect(ctx.stderr).to.match(/actions.+Stopped/);
    });
});
