import {expect, test} from '@oclif/test'

describe('hasura:cli', () => {
  test
  .stdout()
  .command(['hasura:cli'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['hasura:cli', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
