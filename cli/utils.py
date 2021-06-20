import subprocess
import os
import pipes
from rich.console import Console
from rich.table import Column, Table
from rich.panel import Panel

PROJECT_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..')

console = Console()

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
