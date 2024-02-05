import { expect, test } from "@oclif/test";

describe("services:stop", () => {
  test
    .command("services:up")
    .stderr()
    .command("services:stop")
    .it("runs services:up without arguments", (ctx) => {
      expect(ctx.stderr).to.match(/Stopping mlcraft_redis_1.+done/);
    });

  test
    .command("services:up")
    .stderr()
    .command(["services:stop", "actions"])
    .it("runs services:stop with a container name argument", (ctx) => {
      expect(ctx.stderr).to.match(/Stopping mlcraft_actions_1.+done/);
    });
});
