# Synmetrix CLI Documentation

**Introduction**

The Synmetrix Command Line Interface (CLI) provides a convenient way to manage the stack containers. This interface is designed to start, stop, restart, destroy containers, execute commands within them, run Compose stack, push Docker Compose images, display container status, view logs, execute Hasura commands, and run project tests.

**Usage**

The Synmetrix CLI is executed using the `./cli.sh` script in the project's root directory. The following commands are available:

<!-- commands -->
- [Synmetrix CLI Documentation](#synmetrix-cli-documentation)
  - [`smcli hasura cli CMD`](#smcli-hasura-cli-cmd)
  - [`smcli help [COMMANDS]`](#smcli-help-commands)
  - [`smcli services destroy [NAME]`](#smcli-services-destroy-name)
  - [`smcli services ex NAME CMD`](#smcli-services-ex-name-cmd)
  - [`smcli services logs [NAME]`](#smcli-services-logs-name)
  - [`smcli services ps [NAME]`](#smcli-services-ps-name)
  - [`smcli services push [NAME]`](#smcli-services-push-name)
  - [`smcli services restart [NAME]`](#smcli-services-restart-name)
  - [`smcli services stop [NAME]`](#smcli-services-stop-name)
  - [`smcli services up [NAME]`](#smcli-services-up-name)
  - [`smcli test run`](#smcli-test-run)
  - [To test the Synmetrix CLI, you can use the following command:](#to-test-the-synmetrix-cli-you-can-use-the-following-command)

## `smcli hasura cli CMD`

Manage Hasura service

```
USAGE
  $ smcli hasura cli CMD [-n <value>] [-p] [--adminSecret <value>] [--hasuraAddr <value>] [--hasuraDir <value>]

ARGUMENTS
  CMD  Command, what will provided to Hasura

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment
  --adminSecret=<value>
      --hasuraAddr=<value>   [default: http://hasura:8080]
      --hasuraDir=<value>    [default: ./services/hasura]

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

## `smcli services destroy [NAME]`

DESTROY Docker Compose stack

```
USAGE
  $ smcli services destroy [NAME] [-n <value>] [-p]

ARGUMENTS
  NAME  Container name to destroy

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment

DESCRIPTION
  DESTROY Docker Compose stack
```

_See code: [src/commands/services/destroy.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/services/destroy.ts)_

## `smcli services ex NAME CMD`

Exec command in container

```
USAGE
  $ smcli services ex NAME CMD [-n <value>] [-p]

ARGUMENTS
  NAME  Container name for command
  CMD   Command to execute

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment

DESCRIPTION
  Exec command in container
```

_See code: [src/commands/services/ex.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/services/ex.ts)_

## `smcli services logs [NAME]`

Print logs for a Docker containers

```
USAGE
  $ smcli services logs [NAME] [-n <value>] [-p] [--tail <value>]

ARGUMENTS
  NAME  Name of the container to print logs for

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment
      --tail=<value>         [default: 100] Number of last rows to show

DESCRIPTION
  Print logs for a Docker containers
```

_See code: [src/commands/services/logs.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/services/logs.ts)_

## `smcli services ps [NAME]`

PS all containers

```
USAGE
  $ smcli services ps [NAME] [-n <value>] [-p]

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment

DESCRIPTION
  PS all containers
```

_See code: [src/commands/services/ps.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/services/ps.ts)_

## `smcli services push [NAME]`

Push Docker Compose images

```
USAGE
  $ smcli services push [NAME] [-n <value>] [-p]

ARGUMENTS
  NAME  Container name to push

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment

DESCRIPTION
  Push Docker Compose images
```

_See code: [src/commands/services/push.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/services/push.ts)_

## `smcli services restart [NAME]`

Restart the running container(s)

```
USAGE
  $ smcli services restart [NAME] [-n <value>] [-p]

ARGUMENTS
  NAME  Container name to restart

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment

DESCRIPTION
  Restart the running container(s)
```

_See code: [src/commands/services/restart.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/services/restart.ts)_

## `smcli services stop [NAME]`

Stop container(s)

```
USAGE
  $ smcli services stop [NAME] [-n <value>] [-p]

ARGUMENTS
  NAME  Container name

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment

DESCRIPTION
  Stop container(s)
```

_See code: [src/commands/services/stop.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/services/stop.ts)_

## `smcli services up [NAME]`

Up docker compose stack

```
USAGE
  $ smcli services up [NAME] [-n <value>] [-p]

ARGUMENTS
  NAME  Container name to up

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment

DESCRIPTION
  Up docker compose stack
```

_See code: [src/commands/services/up.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/services/up.ts)_

## `smcli test run`

Test project with stepci

```
USAGE
  $ smcli test run [-n <value>] [-p] [--testDir <value>] [--ymlFile <value>]

FLAGS
  -n, --networkName=<value>  [default: synmetrix_default] Docker network name
  -p, --stage                Run in stage environment
      --testDir=<value>      [default: /Users/user/Code/mlcraft_bi/cli/test/stepci]
      --ymlFile=<value>      [default: tests/workflow.yml]

DESCRIPTION
  Test project with stepci
```

_See code: [src/commands/test/run.ts](https://github.com/mlcraft-io/mlcraft/blob/v1.0.0/src/commands/test/run.ts)_
<!-- commandsstop -->

## To test the Synmetrix CLI, you can use the following command:

```bash
yarn test
```
