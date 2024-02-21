import { expect, test } from "@oclif/test";

describe("tests:stepci", () => {
  test
    .command("compose:up")
    .stderr()
    .command("tests:stepci")
    .it("runs StepCI with SQL API tests", (ctx) => {
      expect(ctx.stderr).to.contain("PASS  owner_flow");

      expect(ctx.stderr).to.contain("Checks");
    });
});
