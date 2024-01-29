import {expect, test} from '@oclif/test';

describe('services:restart', () => {
  test
    .stdout()
    .stderr()
    .command(['services:restart'])
    .it('runs services:restart without arguments', async (ctx) => {
      expect(ctx.stdout + ctx.stderr).to.contain('Started');
    });

  test
    .stdout()
    .stderr()
    .command(['services:restart', 'actions'])
    .it('runs services:restart with a container name argument', (ctx) => {
      expect(ctx.stdout + ctx.stderr).to.contain('Started');
    });
});
