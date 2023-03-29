from cli.utils import console, PROJECT_DIR
from cli.services import commands as services_commands
from cli.docker import commands as docker_commands

import click

def load_services_context(ctx, env):
    # TODO: set config network name
    ctx.obj["network_name"] = "mlcraft_default"
    ctx.obj["docker_compose_file"] = "docker-compose.%s.yml" % env

    console.log("Runtime Environment: ", env)

@click.group("test")
@click.pass_context
def commands_group(ctx):
    ctx.ensure_object(dict)
    env = ctx.obj["runtime_env"]
    services_commands.load_services_context(ctx, env)

@commands_group.command()
@click.pass_context
@click.option("--test-dir", default=PROJECT_DIR + "/test/stepci")
@click.option("--yml-file", default="workflow.yml")
def run(ctx, test_dir, yml_file):
    ctx.invoke(
        docker_commands.build,
        name="stepci-test",
        path="./scripts/containers/stepci",
    )

    env = ctx.obj["runtime_env"]

    # env_files = [".env", ".%s.env" % env]
    # console.log(env, env_files)
    ctx.invoke(
        docker_commands.run,
        image_name="stepci-test",
        name="stepci-test",
        cmd=f"tests/{yml_file}",
        tty=False,
        registry="",
        volume=[
            f"{test_dir}:/tests",
        ],
        # env_files=env_files,
    )
