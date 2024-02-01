import { expect, test } from "@oclif/test";

describe("services:stop", () => {
  test
    .command("services:up")
    .stderr()
    .command("services:stop")
    .it("runs services:up without arguments", (ctx) => {
      expect(ctx.stderr).to.contain("hasura-1  Stopped");
    });

  test
    .command("services:up")
    .stderr()
    .command(["services:stop", "actions"])
    .it("runs services:stop with a container name argument", (ctx) => {
      expect(ctx.stderr).to.contain("actions-1  Stopped");
    });
});
