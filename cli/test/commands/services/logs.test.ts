import { expect, test } from "@oclif/test";

const wait = (ms = 10) => new Promise((resolve) => setTimeout(resolve, ms));

describe("services:logs", async () => {
  test
    .loadConfig()
    .stderr()
    .it(
      "runs services:logs with a container name argument",
      async (ctx, done) => {
        ctx.config.runCommand("services:logs", ["actions"]);
        await wait(5000);

        expect(ctx.stderr).to.contain("actions-1");
        done();
      },
    );

  test
    .loadConfig()
    .stderr()
    .it("runs services:logs without arguments", async (ctx, done) => {
      ctx.config.runCommand("services:logs");
      await wait(5000);

      expect(ctx.stderr).to.contain("cubejs-1");
      done();
    });
});
