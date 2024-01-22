try:
    import requests
except ModuleNotFoundError:
    os.system("pip3 install --user requests")

    import site
    from importlib import reload

    reload(site)

from cli.utils import console

create_events_mutation = """
    mutation ($objects: [events_create_input!]!) {
      create_events(objects: $objects)
    }
"""


def graphql_request(url, query, variables):
    return requests.post(url, json={"query": query, "variables": variables}, timeout=5)


def create_cli_event(url, config):
    try:
        objects = [{**config, "data": {"event_type": "CLI_ACTION"}}]

        return graphql_request(url, create_events_mutation, {"objects": objects})
    except:
        msg = "Help us improve Synmetrix! The cli collects anonymized usage stats which\nallow us to keep improving Synmetrix at warp speed. To opt-out or read more,\nvisit https://github.com/mlcraft-io/mlcraft/tree/main/docs/telemetry\n"
        console.log(msg)
