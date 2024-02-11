import { expect, test } from "@oclif/test";

describe("docker:ex", () => {
  test
    .command("compose:up")
    .stderr()
    .command(["docker:ex", "actions", "ls"])
    .it("runs docker:ex", (ctx) => {
      expect(ctx.stderr).to.contain("node_modules");
    });
});
