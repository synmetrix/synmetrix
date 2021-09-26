# Telemetry Guide/FAQ

## Introduction

MLCraft collects anonymous telemetry data that helps the
MLCraft team in understanding how the product is being used and in deciding
what to focus on next.

The data collected is minimal, statistical in nature and 
**cannot be used to uniquely identify a user**. Please see the 
next section to see what data is collected and sent. Access to collected 
data is strictly limited to the MLCraft team and not shared with 3rd parties.

As a growing community, we greatly appreciate the usage data users
send to us, as it is very valuable in helping us make the MLCraft 
a better product for everyone! However, if you are concerned about 
sending usage stats, you can choose to disable telemetry as 
described [here](#disable-telemetry).

## What data is collected?

### CLI

The CLI collects each execution event, along with a randomly generated UUID.
The execution event contains the event name and the anonymous id. 
**Error messages, arguments and flags are not recorded**. 

## Where is the data sent?

The data is sent to MLCraft's servers addressed by ``api.mlcraft.org``.

## <a name="disable-telemetry">How do I turn off telemetry (opt-out)?</a>

### Disable CLI telemetry

You can turn off telemetry on **the CLI**
by setting the env variable ``MLCRAFT_DISABLE_TELEMETRY=true`` on the
machine running the CLI. You can also set ``"enable_telemetry": false`` in the
YAML config file created by the CLI at ``./cli/config.yml`` to persist the
setting.
