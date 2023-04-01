import subprocess
import os
import pipes

import os.path
from yaml import load, dump

from rich.console import Console
from rich.table import Table
from rich.panel import Panel

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

PROJECT_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..')

console = Console()

def read_yaml(filename):
    if not os.path.exists(filename):
        return None

    with open(filename, 'r') as stream:
        return load(stream, Loader=Loader)

def write_yaml(data, filename):
    with open(filename, 'a') as stream:
        yaml_string = dump(data, Dumper=Dumper)
        stream.write(yaml_string)
        return yaml_string

def console_yellow(text):
    console.log(f'[yellow]{text}[/yellow]')

def console_red(text):
    console.log(f'[red]{text}[/red]')

def call_system(cmd):
    console.log(Panel(f'Command: {cmd}'))

    code = os.system(f'/bin/bash -c {pipes.quote(cmd)}')

    if code != 0:
        raise SystemExit

def call_docker(ctx, cmd):
    call_command = f'docker {cmd}'
    call_system(call_command)

def call_service(ctx, cmd):
    call_command = f'docker service {cmd}'
    call_system(call_command)

def call_compose(ctx, cmd):
    args = [
        '-f', 'docker-compose.yml',
        '-f', ctx.obj['docker_compose_file']
    ]

    call_command = f'docker-compose {" ".join(args)} {cmd}'
    call_system(call_command)

def call_swarm(ctx, cmd):
    compose_args = [
        '-f', 'docker-compose.yml',
        '-f', ctx.obj['docker_compose_file']
    ]

    args = [
        '-c', f'<(docker-compose {" ".join(compose_args)} config)',
    ]

    call_command = f'docker stack {cmd} {" ".join(args)}'
    call_system(call_command)
