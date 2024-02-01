import {expect, test} from '@oclif/test';

describe('services:ex', () => {
  test
    .command('services:up')
    .stderr()
    .command(['services:ex', 'actions', 'ls'])
    .it('runs services:ex', (ctx) => {
      expect(ctx.stderr).to.contain('node_modules');
    });
});
