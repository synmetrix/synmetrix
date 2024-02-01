import {expect, test} from '@oclif/test';

describe('services:ps', () => {
  test
    .command(['services:up'])
    .stderr()
    .command(['services:ps'])
    .it('runs services:ps', (ctx) => {
      expect(ctx.stderr).to.contain('mailhog/mailhog');
    });
});