import sys

if sys.version_info < (3, 6, 1):
    print('Sorry, requires Python >=3.6.1, not Python 2.x')
    sys.exit(1)

import os

try:
    import click
    import docker
    import rich
except ModuleNotFoundError:
    os.system('pip3 install --user click pyyaml docker rich docker-compose')

    import site
    from importlib import reload
    reload(site)

sys.path.append('.')

import click
import docker
import uuid

import json
import signal

from cli.utils import *
from cli.telemetry import *
from cli.services import commands as services_commands
from cli.db import commands as db_commands
from cli.docker import commands as docker_commands
from cli.hasura import commands as hasura_commands
from cli.test import commands as test_commands

PWD = os.path.dirname(os.path.abspath(__file__))
# low-level API
# https://docker-py.readthedocs.io/en/stable/api.html
docker_api_client = docker.APIClient(base_url='unix://var/run/docker.sock')

docker_version_info = docker_api_client.version()
console.log('Python Version: ', str(sys.version_info.major) + '.' + str(sys.version_info.minor) + '.' + str(sys.version_info.micro))
console.log('Docker Build Time: ', docker_version_info['BuildTime'])
console.log('Docker Version: ', docker_version_info['Version'])

@click.group()
@click.option('--env', envvar='ENV', default='dev', type=click.Choice(['dev', 'stage']))
@click.option('--config-file', '-c', default='./cli/config.yml')
@click.option('--disable-telemetry', envvar='MLCRAFT_DISABLE_TELEMETRY', is_flag=True, default=False)
@click.option('--telemetry-url', envvar='MLCRAFT_TELEMETRY_URL', default='https://api.mlcraft.org/v1/graphql')
@click.pass_context
def main(ctx, env, config_file, disable_telemetry, telemetry_url):
    ctx.ensure_object(dict)
    ctx.obj['runtime_env'] = env

    config = read_yaml(config_file)

    if not config:
        config = {
            'user': {
                'anonymous_id': os.environ.get('ANONYMOUS_ID', str(uuid.uuid4()))
            }
        }

        write_yaml(config, config_file)

    if config.get('enable_telemetry') == 'false':
        disable_telemetry = True

    if not disable_telemetry:
        url =  config.get('telemetry_url') or telemetry_url
        create_cli_event(url, {
            'user': config.get('user', {})
        })
    else:
        console.log('Telemetry is disabled')

    ctx.obj['config'] = config

main.add_command(db_commands.commands_group)
main.add_command(services_commands.commands_group)
main.add_command(docker_commands.commands_group)
main.add_command(hasura_commands.commands_group)
main.add_command(test_commands.commands_group)

@main.command()
@click.pass_context
def ui(ctx):
    call_system('(cd services/client; yarn && yarn start)')


if __name__ == "__main__":
    main()
