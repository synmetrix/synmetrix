import {expect, test} from '@oclif/test'

describe('services:restart', () => {
  test
  .stdout()
  .command(['services:restart'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['services:restart', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
