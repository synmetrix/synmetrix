import { expect, test } from "@oclif/test";

describe("services:up", () => {
  test
    .stderr()
    .command(["services:up"])
    .it("runs services:up without arguments", (ctx) => {
      expect(ctx.stderr).to.match(/cubejs.+Running/);
    });

  test
    .stderr()
    .command(["services:up", "actions"])
    .it("runs services:up with a container name argument", (ctx) => {
      expect(ctx.stderr).to.match(/actions.+Running/);
    });
});
