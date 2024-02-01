import { expect, test } from '@oclif/test'

describe('services:destroy', () => {
  test
    .command(['services:up'])
    .stderr()
    .command(['services:destroy', 'actions'])
    .it('runs services:destroy with a container name argument', (ctx) => {
      expect(ctx.stderr).to.contain('Removed')
    })

  test
    .command(['services:up'])
    .stderr()
    .command(['services:destroy'])
    .it('runs services:destroy without arguments', (ctx) => {
      expect(ctx.stderr).to.contain('cubejs-1  Removed')
    })
})
