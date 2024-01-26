import {expect, test} from '@oclif/test'

describe('services:destroy', () => {
  test
  .stdout()
  .command(['services:destroy'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['services:destroy', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
