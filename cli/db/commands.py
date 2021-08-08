import click
from urllib.parse import urlparse

from cli.services import commands as services_commands

@click.group('db')
@click.pass_context
def commands_group(ctx):
    ctx.ensure_object(dict)

    env = ctx.obj['runtime_env']
    services_commands.load_services_context(ctx, env)

@commands_group.command()
@click.option('--addr', default='postgres://mlcraft:pg_pass@postgres/mlcraft')
@click.pass_context
def psql(ctx, addr):
    ctx.invoke(services_commands.ex, name='postgres', cmd='psql %s' % (addr))
