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

import json
import signal

from cli.utils import *
from cli.services import commands as services_commands
from cli.db import commands as db_commands
from cli.docker import commands as docker_commands

PWD = os.path.dirname(os.path.abspath(__file__))
# low-level API
# https://docker-py.readthedocs.io/en/stable/api.html
docker_api_client = docker.APIClient(base_url='unix://var/run/docker.sock')

docker_version_info = docker_api_client.version()
console.log('Python Version: ', str(sys.version_info.major) + '.' + str(sys.version_info.minor) + '.' + str(sys.version_info.micro))
console.log('Docker Build Time: ', docker_version_info['BuildTime'])
console.log('Docker Version: ', docker_version_info['Version'])

@click.group()
@click.option('--env', envvar='ENV', default='dev', type=click.Choice(['dev', 'stage', 'prod']))
@click.pass_context
def main(ctx, env):
    ctx.ensure_object(dict)
    ctx.obj['runtime_env'] = env

main.add_command(db_commands.commands_group)
main.add_command(services_commands.commands_group)
main.add_command(docker_commands.commands_group)

@main.command()
@click.pass_context
def ui(ctx):
    call_system('(cd services/client; yarn && yarn start)')

if __name__ == "__main__":
    main()
