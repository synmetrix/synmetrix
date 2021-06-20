import click
from cli.utils import console, call_compose, call_swarm, call_service, call_system

def load_services_context(ctx, env):
    # TODO: set config network name
    ctx.obj['network_name'] = 'mlcraft_default'
    ctx.obj['docker_compose_file'] = 'docker-compose.%s.yml' % env

    console.log('Runtime Environment: ', env)

@click.group('services')
@click.pass_context
def commands_group(ctx):
    """
    Simple CLI for development environment
    """
    ctx.ensure_object(dict)
    env = ctx.obj['runtime_env']
    
    load_services_context(ctx, env)

@commands_group.command('exec')
@click.argument('name')
@click.argument('cmd')
@click.pass_context
def ex(ctx, name, cmd):
    """Exec command in container"""
    call_compose(ctx, 'exec %s %s' % (name, cmd))

@commands_group.command()
@click.argument('name', metavar='<name>', default='')
@click.pass_context
def restart(ctx, name):
    """Restart the running container(s)"""
    call_compose(ctx, 'restart %s' % name)

@commands_group.command()
@click.argument('name', metavar='<name>', default='')
@click.pass_context
def stop(ctx, name):
    """Stop container(s)"""
    call_compose(ctx, 'stop %s' % name)

@commands_group.command()
@click.argument('name', metavar='<name>', default='')
@click.pass_context
def up(ctx, name):
    """UP Docker Compose stack"""

    env = ctx.obj['runtime_env']
    if env == 'dev':
        args = ' '.join([
            '-d',
            '--build'
        ])

        call_compose(ctx, 'up %s %s' % (args, name))
    else:
        call_swarm(ctx, 'up %s' % name)

@commands_group.command()
@click.argument('name', metavar='<name>', default='')
@click.pass_context
def push(ctx, name):
    """Push Docker Compose images"""
    call_compose(ctx, 'build %s' % (name))
    call_compose(ctx, 'push %s' % (name))

@commands_group.command()
@click.argument('name', metavar='<name>', default='')
@click.pass_context
def run(ctx, name):
    """Run Docker Compose stack"""

    # docker-compose run --service-ports
    args = ' '.join([
        '--service-ports',
        '--use-aliases',
        '--rm'
    ])

    call_compose(ctx, 'build %s' % (name))
    call_compose(ctx, 'stop %s' % (name))
    call_compose(ctx, 'run %s %s' % (args, name))

@commands_group.command()
@click.argument('name', metavar='<name>', default='')
@click.pass_context
def destroy(ctx, name):
    """DESTROY Docker Compose stack"""

    env = ctx.obj['runtime_env']
    if env == 'dev':
        args = ' '.join([
            '-s',
            '-f'
        ])

        call_compose(ctx, 'rm %s' % args)
    else:
        call_system('docker stack rm %s' % name)

@commands_group.command()
@click.option('--tail', default=100)
@click.argument('name', metavar='<name>', default='')
@click.pass_context
def logs(ctx, tail, name):
    """Container logs"""

    args = ' '.join([
        '-f',
        '--tail', str(tail)
    ])

    env = ctx.obj['runtime_env']
    if env == 'dev':
        call_compose(ctx, 'logs %s %s' % (args, name))
    else:
        call_service(ctx, 'logs %s %s' % (args, name))

@commands_group.command()
@click.argument('name', metavar='<name>', default='')
@click.pass_context
def ps(ctx, name):
    """PS all containers"""

    env = ctx.obj['runtime_env']
    if env == 'dev':
        call_compose(ctx, 'ps')
    else:
        call_system('docker stack ps %s' % name)
