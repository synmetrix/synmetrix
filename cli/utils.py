import subprocess
import os
import pipes
from rich.console import Console
from rich.table import Column, Table
from rich.panel import Panel

import os.path
from yaml import load, dump

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
    console.log(console.render_str(text, style='yellow'))

def console_red(text):
    console.log(console.render_str(text, style='red'))

def call_system(cmd):
    console.log(Panel('Command: %s' % cmd))

    code = os.system('/bin/bash -c %s' % pipes.quote(cmd))

    if code != 0:
        raise SystemExit

def call_docker(ctx, cmd):
    call_command = 'docker %s' %(cmd)
    call_system(call_command)

def call_service(ctx, cmd):
    call_command = 'docker service %s' % cmd
    call_system(call_command)
    
def call_compose(ctx, cmd):
    args = ' '.join([
        '-f', 'docker-compose.yml',
        '-f', ctx.obj['docker_compose_file']
    ])

    call_command = 'docker-compose %s %s' % (args, cmd)
    call_system(call_command)

def call_swarm(ctx, cmd):
    compose_args = ' '.join([
        '-f', 'docker-compose.yml',
        '-f', ctx.obj['docker_compose_file']
    ])

    args = ' '.join([
        '-c', '<(docker-compose %s config)' % compose_args,
    ])

    call_command = 'docker stack %s %s' % (cmd, args)
    call_system(call_command)
