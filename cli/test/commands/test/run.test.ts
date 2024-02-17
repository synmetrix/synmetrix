import { expect, test } from "@oclif/test";
import { $ } from "zx";
import { wait } from "../../helpers.js";

describe("test:run", () => {
  test
    .stderr()
    .command("test:run")
    .it("runs test:run", (ctx) => {
      expect(ctx.stderr).to.contain("PASS  datasource_flow");
    });

  test
    .stderr()
    .it("run sql api test", async (ctx) => {
      $`PGPASSWORD=pass psql --host localhost --port 15432 --username user --dbname default --command "\\d"`;
      await wait(4000);

      expect(ctx.stderr).to.contain("Checks");
    });
});
