import { expect, test } from "@oclif/test";

describe("services:stop", () => {
  test
    .command("services:up")
    .stderr()
    .command("services:stop")
    .it("runs services:stop without arguments", (ctx) => {
      expect(ctx.stderr).to.match(/hasura.+Stopping/);
      expect(ctx.stderr).to.match(/hasura.+Stopped/);
    });

  test
    .command("services:up")
    .stderr()
    .command(["services:stop", "actions"])
    .it("runs services:stop with a container name argument", (ctx) => {
      expect(ctx.stderr).to.match(/actions.+Stopping/);
      expect(ctx.stderr).to.match(/actions.+Stopped/);
    });
});
