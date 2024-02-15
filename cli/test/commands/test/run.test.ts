import { expect, test } from "@oclif/test";

describe("test:run", () => {
  test
    .stderr()
    .command("test:run")
    .it("runs test:run", (ctx) => {
      expect(ctx.stderr).to.contain("PASS  datasource_flow");
    });
});
