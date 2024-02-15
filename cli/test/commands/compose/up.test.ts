import { expect, test } from "@oclif/test";

describe("compose:up", () => {
  test
    .stderr()
    .command(["compose:up"])
    .it("runs compose:up without arguments", (ctx) => {
      expect(ctx.stderr).to.match(/cubejs.+Running/);
    });

  test
    .stderr()
    .command(["compose:up", "actions"])
    .it("runs compose:up with a container name argument", (ctx) => {
      expect(ctx.stderr).to.match(/actions.+Running/);
    });
});
