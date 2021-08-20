import click
from urllib.parse import urlparse

from cli.utils import PROJECT_DIR

from cli.docker import commands as docker_commands
from cli.services import commands as services_commands

@click.group('hasura')
@click.pass_context
def commands_group(ctx):
    ctx.ensure_object(dict)

    env = ctx.obj['runtime_env']
    services_commands.load_services_context(ctx, env)

@commands_group.command()
@click.pass_context
@click.option('--admin-secret', envvar='HASURA_GRAPHQL_ADMIN_SECRET', required=True)
@click.option('--hasura-dir', default=PROJECT_DIR + '/services/hasura')
@click.option('--hasura-addr', default='http://hasura:8080')
@click.argument('cmd', nargs=-1)
def cli(ctx, admin_secret, hasura_dir, hasura_addr, cmd):
    parsed_url = urlparse(hasura_addr)

    endpoint = ':'.join([
        parsed_url.hostname,
        str(parsed_url.port)
    ])

    args = ' '.join([
        '--endpoint', 'http://' + endpoint,
        '--admin-secret', admin_secret
    ])

    ctx.invoke(
        docker_commands.build,
        name='hasura_cli',
        path='./scripts/containers/hasura_cli',
    )

    cli_cmd = 'hasura-cli %s %s' % (' '.join(cmd), args)
    ctx.invoke(
        docker_commands.run,
        image_name='hasura_cli',
        name='hasura-cli-tool',
        cmd='-c "%s"' % cli_cmd,
        tty=False,
        registry='',
        entry='sh',
        volume=[
            '%s/config.yaml:/config.yaml' % hasura_dir,
            '%s/migrations:/migrations' % hasura_dir,
            '%s/metadata:/metadata' % hasura_dir,
            '%s/seeds:/seeds' % hasura_dir,
        ]
    )
