import { expect, test } from "@oclif/test";

describe("compose:destroy", () => {
  test
    .command(["compose:up"])
    .stderr()
    .command(["compose:destroy", "actions"])
    .it("runs compose:destroy with a container name argument", (ctx) => {
      expect(ctx.stderr).to.match(/actions.+Removed/);
    });

  test
    .command(["compose:up"])
    .stderr()
    .command(["compose:destroy"])
    .it("runs compose:destroy without arguments", (ctx) => {
      expect(ctx.stderr).to.match(/cubejs.+Removed/);
    });
});
