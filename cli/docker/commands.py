import os
import click

from cli.utils import call_system
from cli.services import commands as services_commands

@click.group('docker')
@click.pass_context
def commands_group(ctx):
    ctx.ensure_object(dict)

    env = ctx.obj['runtime_env']
    services_commands.load_services_context(ctx, env)
    
@commands_group.command('build')
@click.argument('path', metavar='<path>', required=True)
@click.argument('cmd', metavar='<cmd>', nargs=-1)
@click.option('--name', prompt='Name the build image, please')
@click.option('--push', is_flag=True)
@click.option('--pull', is_flag=True)
@click.pass_context
def build(ctx, path, cmd, name, push, pull):
    registry_addr = ''
    additional_args = []

    if os.path.isfile(path):  
        dockerfile = os.path.basename(path)
        path = os.path.dirname(path)
        additional_args.append('-f %s' % '/'.join([path, dockerfile]))

    if pull:
        additional_args.append('--pull')

    call_system('docker build %s -t %s %s' % (' '.join(additional_args), name, path))

    full_image_name = '/'.join(filter(None, [registry_addr, name]))
    call_system('docker tag %(name)s:latest %(full_image_name)s:latest' % dict(full_image_name=full_image_name, name=name))

    if push:
        call_system('docker push %s/%s' % (registry_addr, name))

    if cmd:
        ctx.invoke(
            docker_run,
            name=name,
            image_name=name,
            cmd=' '.join(cmd),
            registry='',
        )

@commands_group.command('run')
@click.option('--name', prompt='Name the container, please')
@click.option('--volume', '-v', multiple=True)
@click.option('--env', multiple=True)
@click.option('--ports', '-p', multiple=True)
@click.argument('image_name', metavar='<image_name>', required=True)
@click.argument('cmd', metavar='<cmd>', required=True)
@click.option('--registry', default='localhost:50000')
@click.option('--tag', default='latest')
@click.option('--tty', is_flag=True, default=True)
@click.option('--entry')
@click.pass_context
def run(ctx, name, volume, env, ports, image_name, cmd, registry, tag, tty, entry):
    volumes = [' -v %s' % v for v in volume]
    envs = [' -e %s' % e for e in env]
    ports = [' -p %s' % p for p in ports]

    # python2 & 3 compatibility
    def toString(v):
        try:
            return str(v, 'utf-8')
        except TypeError:
            return v

    image_uri = map(lambda x: toString(x.encode('utf-8')), [registry or '', image_name])
    image = list(filter(str.strip, image_uri))

    args = [
        '-i'
    ]

    if tty:
        args.append('-t')

    if entry:
        args.append('--entrypoint %s' % entry)

    run_cmd = """
	docker run --rm \
	--network %(network_name)s \
	--name %(name)s \
        --network-alias %(name)s \
        %(volumes)s \
        %(envs)s \
        %(ports)s \
	%(args)s %(image_name)s:%(tag)s %(cmd)s
    """ % dict(
            network_name=ctx.obj['network_name'],
            name=name,
            args=' '.join(args),
            volumes=''.join(volumes),
            envs=''.join(envs),
            ports=''.join(ports),
            image_name='/'.join(image),
            tag=tag,
            cmd=cmd
        )

    call_system(run_cmd)
