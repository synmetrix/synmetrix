#!/usr/bin/env node

async function main() {
  // Change directory to the root of the project
  process.chdir("../");

  const { execute } = await import("@oclif/core")
  await execute({dir: import.meta.url})
}

await main()
