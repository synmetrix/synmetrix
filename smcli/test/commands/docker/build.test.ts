import {expect, test} from '@oclif/test'

describe('docker:build', () => {
  test
  .stdout()
  .command(['docker:build'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['docker:build', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
