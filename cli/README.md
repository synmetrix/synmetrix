oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g smcli
$ smcli COMMAND
running command...
$ smcli (--version)
smcli/0.0.0 linux-x64 node-v18.17.0
$ smcli --help [COMMAND]
USAGE
  $ smcli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`smcli hello PERSON`](#smcli-hello-person)
* [`smcli hello world`](#smcli-hello-world)
* [`smcli help [COMMANDS]`](#smcli-help-commands)
* [`smcli plugins`](#smcli-plugins)
* [`smcli plugins:install PLUGIN...`](#smcli-pluginsinstall-plugin)
* [`smcli plugins:inspect PLUGIN...`](#smcli-pluginsinspect-plugin)
* [`smcli plugins:install PLUGIN...`](#smcli-pluginsinstall-plugin-1)
* [`smcli plugins:link PLUGIN`](#smcli-pluginslink-plugin)
* [`smcli plugins:uninstall PLUGIN...`](#smcli-pluginsuninstall-plugin)
* [`smcli plugins reset`](#smcli-plugins-reset)
* [`smcli plugins:uninstall PLUGIN...`](#smcli-pluginsuninstall-plugin-1)
* [`smcli plugins:uninstall PLUGIN...`](#smcli-pluginsuninstall-plugin-2)
* [`smcli plugins update`](#smcli-plugins-update)

## `smcli hello PERSON`

Say hello

```
USAGE
  $ smcli hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Libertonius/smcli/blob/v0.0.0/src/commands/hello/index.ts)_

## `smcli hello world`

Say hello world

```
USAGE
  $ smcli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ smcli hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Libertonius/smcli/blob/v0.0.0/src/commands/hello/world.ts)_

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

## `smcli plugins`

List installed plugins.

```
USAGE
  $ smcli plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ smcli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/src/commands/plugins/index.ts)_

## `smcli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ smcli plugins add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ smcli plugins add

EXAMPLES
  $ smcli plugins add myplugin 

  $ smcli plugins add https://github.com/someuser/someplugin

  $ smcli plugins add someuser/someplugin
```

## `smcli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ smcli plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ smcli plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/src/commands/plugins/inspect.ts)_

## `smcli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ smcli plugins install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ smcli plugins add

EXAMPLES
  $ smcli plugins install myplugin 

  $ smcli plugins install https://github.com/someuser/someplugin

  $ smcli plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/src/commands/plugins/install.ts)_

## `smcli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ smcli plugins link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ smcli plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/src/commands/plugins/link.ts)_

## `smcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ smcli plugins remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ smcli plugins unlink
  $ smcli plugins remove

EXAMPLES
  $ smcli plugins remove myplugin
```

## `smcli plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ smcli plugins reset
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/src/commands/plugins/reset.ts)_

## `smcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ smcli plugins uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ smcli plugins unlink
  $ smcli plugins remove

EXAMPLES
  $ smcli plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/src/commands/plugins/uninstall.ts)_

## `smcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ smcli plugins unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ smcli plugins unlink
  $ smcli plugins remove

EXAMPLES
  $ smcli plugins unlink myplugin
```

## `smcli plugins update`

Update installed plugins.

```
USAGE
  $ smcli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.14/src/commands/plugins/update.ts)_
<!-- commandsstop -->
