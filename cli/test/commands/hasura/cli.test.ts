import { expect, test } from "@oclif/test";

describe("hasura:cli", () => {
  test
    .command("services:up")
    .stderr()
    .command(["hasura:cli", "actions"])
    .it("runs hasura:cli", (ctx) => {
      expect(ctx.stderr).to.contain("GraphQL commands");
    });
});
