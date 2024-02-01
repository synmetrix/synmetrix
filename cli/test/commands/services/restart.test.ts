import {expect, test} from '@oclif/test';

describe('services:restart', () => {
  test
    .stderr()
    .command(['services:restart'])
    .it('runs services:restart without arguments', (ctx) => {
      expect(ctx.stderr).to.contain('hasura-1  Restarting');
    });

  test
    .stderr()
    .command(['services:restart', 'actions'])
    .it('runs services:restart with a container name argument', (ctx) => {
      expect(ctx.stderr).to.contain('actions-1  Restarting');
    });
});
