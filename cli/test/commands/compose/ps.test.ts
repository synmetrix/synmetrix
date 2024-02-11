import { expect, test } from "@oclif/test";

describe("compose:ps", () => {
  test
    .command(["compose:up"])
    .stderr()
    .command(["compose:ps"])
    .it("runs compose:ps", (ctx) => {
      expect(ctx.stderr).to.contain("0.0.0.0:9000");
    });
});
