import {expect, test} from '@oclif/test';

describe('services', () => {
  test
  .stdout()
  .stderr()
  .command(['services:up'])
  .it('runs services:up without arguments', (ctx) => {
    console.log(ctx.stdout + ctx.stderr);
    expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
  });

  test
    .stdout()
    .stderr()
    .command(['services:up', 'actions'])
    .it('runs services:up with a container name argument', (ctx) => {
      console.log(ctx.stdout + ctx.stderr);
      expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
    });
  
  test
    .stdout()
    .stderr()
    .command(['services:stop'])
    .it('runs services:up without arguments', (ctx) => {
      console.log(ctx.stdout + ctx.stderr);
      expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
    });

  test
    .stdout()
    .stderr()
    .command(['services:stop', 'actions'])
    .it('runs services:stop with a container name argument', (ctx) => {
      console.log(ctx.stdout + ctx.stderr);
      expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
    });

  test
    .stdout()
    .stderr()
    .command(['services:restart'])
    .it('runs services:restart without arguments', (ctx) => {
      console.log(ctx.stdout + ctx.stderr);
      expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
    });

  test
    .stdout()
    .stderr()
    .command(['services:restart', 'actions'])
    .it('runs services:restart with a container name argument', (ctx) => {
      console.log(ctx.stdout + ctx.stderr);
      expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
    });

  test
    .stdout()
    .stderr()
    .command(['services:destroy', 'actions'])
    .it('runs services:destroy with a container name argument', (ctx) => {
      console.log(ctx.stdout + ctx.stderr);
      expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
    });

  test
    .stdout()
    .stderr()
    .command(['services:destroy'])
    .it('runs services:desteroy without arguments', (ctx) => {
      console.log(ctx.stdout + ctx.stderr);
      expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
    });

  test
    .stdout()
    .stderr()
    .command(['services:up'])
    .command(['services:ps'])
    .it('runs services:ps', (ctx) => {
      console.log(ctx.stdout + ctx.stderr);
      expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
    });

  test
    .stdout()
    .stderr()
    .command(['services:ex', 'actions', 'ls'])
    .it('runs services:ex', (ctx) => {
      console.log(ctx.stdout + ctx.stderr);
      expect(ctx.stdout + ctx.stderr).to.contain('Runtime');
    });
});
