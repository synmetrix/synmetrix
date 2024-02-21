# Synmetrix CLI Documentation

**Introduction**

The Synmetrix Command Line Interface (CLI) provides a convenient way to manage the stack containers. This interface is designed to start, stop, restart, destroy containers, execute commands within them, run Compose stack, push Docker Compose images, display container status, view logs, execute Hasura commands, and run project tests.

**Usage**

The Synmetrix CLI is executed using the `./cli.sh` script in the project's root directory. The following commands are available:

<!-- commands -->
* [`smcli compose destroy [NAME]`](#smcli-compose-destroy-name)
* [`smcli compose logs [NAME]`](#smcli-compose-logs-name)
* [`smcli compose ps`](#smcli-compose-ps)
* [`smcli compose push [NAME]`](#smcli-compose-push-name)
* [`smcli compose restart [NAME]`](#smcli-compose-restart-name)
* [`smcli compose stop [NAME]`](#smcli-compose-stop-name)
* [`smcli compose up [NAME]`](#smcli-compose-up-name)
* [`smcli docker ex NAME CMD`](#smcli-docker-ex-name-cmd)
* [`smcli hasura cli CMD`](#smcli-hasura-cli-cmd)
* [`smcli help [COMMANDS]`](#smcli-help-commands)
* [`smcli swarm destroy NAME`](#smcli-swarm-destroy-name)
* [`smcli swarm logs NAME`](#smcli-swarm-logs-name)
* [`smcli swarm ps NAME`](#smcli-swarm-ps-name)
* [`smcli swarm restart NAME`](#smcli-swarm-restart-name)
* [`smcli swarm stop NAME`](#smcli-swarm-stop-name)
* [`smcli swarm up NAME`](#smcli-swarm-up-name)
* [`smcli tests stepci`](#smcli-tests-stepci)

## `smcli compose destroy [NAME]`

DESTROY Docker Compose stack

```
USAGE
  $ smcli compose destroy [NAME] [--shell <value>] [-n <value>] [-e <value>]

ARGUMENTS
  NAME  Container name

FLAGS
  -e, --env=<value>          [default: dev] Environment
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
      --shell=<value>        Shell for exec commands (default: /bin/bash)

DESCRIPTION
  DESTROY Docker Compose stack
```

_See code: [src/commands/compose/destroy.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/compose/destroy.ts)_

## `smcli compose logs [NAME]`

Print logs for Docker containers

```
USAGE
  $ smcli compose logs [NAME] [--shell <value>] [-n <value>] [-e <value>] [--tail <value>]

ARGUMENTS
  NAME  Container name

FLAGS
  -e, --env=<value>          [default: dev] Environment
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
      --shell=<value>        Shell for exec commands (default: /bin/bash)
      --tail=<value>         [default: 500] Number of last rows to show

DESCRIPTION
  Print logs for Docker containers
```

_See code: [src/commands/compose/logs.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/compose/logs.ts)_

## `smcli compose ps`

PS all containers

```
USAGE
  $ smcli compose ps [--shell <value>] [-n <value>] [-e <value>]

FLAGS
  -e, --env=<value>          [default: dev] Environment
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
      --shell=<value>        Shell for exec commands (default: /bin/bash)

DESCRIPTION
  PS all containers
```

_See code: [src/commands/compose/ps.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/compose/ps.ts)_

## `smcli compose push [NAME]`

Push Docker images

```
USAGE
  $ smcli compose push [NAME] [--shell <value>] [-n <value>] [-e <value>]

ARGUMENTS
  NAME  Container name

FLAGS
  -e, --env=<value>          [default: dev] Environment
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
      --shell=<value>        Shell for exec commands (default: /bin/bash)

DESCRIPTION
  Push Docker images
```

_See code: [src/commands/compose/push.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/compose/push.ts)_

## `smcli compose restart [NAME]`

Restart the running container(s)

```
USAGE
  $ smcli compose restart [NAME] [--shell <value>] [-n <value>] [-e <value>]

ARGUMENTS
  NAME  Container name

FLAGS
  -e, --env=<value>          [default: dev] Environment
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
      --shell=<value>        Shell for exec commands (default: /bin/bash)

DESCRIPTION
  Restart the running container(s)
```

_See code: [src/commands/compose/restart.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/compose/restart.ts)_

## `smcli compose stop [NAME]`

Stop container(s)

```
USAGE
  $ smcli compose stop [NAME] [--shell <value>] [-n <value>] [-e <value>]

ARGUMENTS
  NAME  Container name

FLAGS
  -e, --env=<value>          [default: dev] Environment
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
      --shell=<value>        Shell for exec commands (default: /bin/bash)

DESCRIPTION
  Stop container(s)
```

_See code: [src/commands/compose/stop.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/compose/stop.ts)_

## `smcli compose up [NAME]`

Up docker compose stack

```
USAGE
  $ smcli compose up [NAME] [--shell <value>] [-n <value>] [-e <value>] [-b] [--pull] [-i]

ARGUMENTS
  NAME  Container name

FLAGS
  -b, --build                Build images
  -e, --env=<value>          [default: dev] Environment
  -i, --init                 Init network
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
      --pull                 Force pulling images
      --shell=<value>        Shell for exec commands (default: /bin/bash)

DESCRIPTION
  Up docker compose stack
```

_See code: [src/commands/compose/up.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/compose/up.ts)_

## `smcli docker ex NAME CMD`

Exec command in container

```
USAGE
  $ smcli docker ex NAME CMD

ARGUMENTS
  NAME  Container name
  CMD   Command to execute

DESCRIPTION
  Exec command in container
```

_See code: [src/commands/docker/ex.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/docker/ex.ts)_

## `smcli hasura cli CMD`

Manage Hasura service

```
USAGE
  $ smcli hasura cli CMD [-n <value>] [--adminSecret <value>] [--hasuraAddr <value>] [--hasuraDir <value>] [-b]

ARGUMENTS
  CMD  Command, what will provided to Hasura

FLAGS
  -b, --build                Build CLI image
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  --adminSecret=<value>
      --hasuraAddr=<value>   [default: http://hasura:8080]
      --hasuraDir=<value>    Default: "./services/hasura"

DESCRIPTION
  Manage Hasura service
```

_See code: [src/commands/hasura/cli.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/hasura/cli.ts)_

## `smcli help [COMMANDS]`

Display help for smcli.

```
USAGE
  $ smcli help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for smcli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.11/src/commands/help.ts)_

## `smcli swarm destroy NAME`

DESTROY Docker Swarm stack

```
USAGE
  $ smcli swarm destroy NAME

ARGUMENTS
  NAME  Stack name

DESCRIPTION
  DESTROY Docker Swarm stack
```

_See code: [src/commands/swarm/destroy.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/swarm/destroy.ts)_

## `smcli swarm logs NAME`

Print logs for Docker Swarm service

```
USAGE
  $ smcli swarm logs NAME [--tail <value>]

ARGUMENTS
  NAME  Service name

FLAGS
  --tail=<value>  [default: 500] Number of last rows to show

DESCRIPTION
  Print logs for Docker Swarm service
```

_See code: [src/commands/swarm/logs.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/swarm/logs.ts)_

## `smcli swarm ps NAME`

Show running services in a stack

```
USAGE
  $ smcli swarm ps NAME

ARGUMENTS
  NAME  Stack name

DESCRIPTION
  Show running services in a stack
```

_See code: [src/commands/swarm/ps.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/swarm/ps.ts)_

## `smcli swarm restart NAME`

Restart the running service

```
USAGE
  $ smcli swarm restart NAME

ARGUMENTS
  NAME  Service name

DESCRIPTION
  Restart the running service
```

_See code: [src/commands/swarm/restart.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/swarm/restart.ts)_

## `smcli swarm stop NAME`

Remove Swarm service

```
USAGE
  $ smcli swarm stop NAME

ARGUMENTS
  NAME  Service name

DESCRIPTION
  Remove Swarm service
```

_See code: [src/commands/swarm/stop.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/swarm/stop.ts)_

## `smcli swarm up NAME`

Deploy Docker Stack

```
USAGE
  $ smcli swarm up NAME [--shell <value>] [-n <value>] [-e <value>] [-b -r <value>] [-i]

ARGUMENTS
  NAME  Stack name

FLAGS
  -b, --build                Build images
  -e, --env=<value>          [default: dev] Environment
  -i, --init                 Init Docker Swarm mode and setup network
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -r, --registry=<value>     Specify docker registry
      --shell=<value>        Shell for exec commands (default: /bin/bash)

DESCRIPTION
  Deploy Docker Stack
```

_See code: [src/commands/swarm/up.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/swarm/up.ts)_

## `smcli tests stepci`

Run StepCI integration tests

```
USAGE
  $ smcli tests stepci [--shell <value>] [-n <value>] [-e <value>] [--testDir <value>] [--ymlFile <value>]

FLAGS
  -e, --env=<value>          [default: dev] Environment
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
      --shell=<value>        Shell for exec commands (default: /bin/bash)
      --testDir=<value>      Default: "./tests/stepci"
      --ymlFile=<value>      [default: tests/workflow.yml]

DESCRIPTION
  Run StepCI integration tests
```

_See code: [src/commands/tests/stepci.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/tests/stepci.ts)_
<!-- commandsstop -->

## To test the Synmetrix CLI, you can use the following command:

```bash
yarn tests
```
