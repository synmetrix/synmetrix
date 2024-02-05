import { expect, test } from "@oclif/test";

describe("hasura:cli", () => {
  test
    .command("services:up")
    .stderr()
    .command(["hasura:cli", "actions"])
    .it("runs hasura:cli", (ctx) => {
      expect(ctx.stderr).to.contain("Running this command enables the use of additional");
    });
    
    test
    .command("services:up")
    .stderr()
    .command(["hasura:cli", "seeds apply --help"])
    .it("runs hasura:cli", (ctx) => {
      expect(ctx.stderr).to.contain("Run this command by passing the seed files");
    });
});
