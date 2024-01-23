import {expect, test} from '@oclif/test'

describe('services:stop', () => {
  test
  .stdout()
  .command(['services:stop'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['services:stop', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
