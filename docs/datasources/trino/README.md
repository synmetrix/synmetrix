# Trino

Tested on the [trinodb/trino:latest](https://hub.docker.com/r/trinodb/trino) image.

## Step 1: Navigate to the Trino example directory

Navigate to the Trino example directory located at `/docs/examples/trino` in the root of the MLCraft project. You can also download this directory from the GitHub repository. To navigate to the directory, run the following command:

```bash
cd ./docs/examples/trino
```

## Step 2: Run the Trino service using the script

In the Trino example directory, there is a script called `run_trino.sh`. Make sure the script is executable by running:

```bash
chmod +x run_trino.sh
```

Then, start the Trino service by running the script:

```bash
./run_trino.sh
```

After the script has finished running, it will return the host IP address of your machine. Take note of this IP address for the next step.

## Step 3: Add a data source in the mlcraft UI

Go to the mlcraft UI and add a new data source with the following parameters:

<pre>
Name: Trino Test
Host: Host IP (obtained from the script in Step 2)
Port: 8050
Catalog: tpch
User: user
</pre>

## Step 4: Test the connection

Click the "Check connection" button in the mlcraft UI to verify the connection to the Trino data source. If the connection is successful, you will see a confirmation message.