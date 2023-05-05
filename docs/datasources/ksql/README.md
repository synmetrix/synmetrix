# ksql

Tested on the [confluentinc/cp-ksqldb-server:7.0.9](https://hub.docker.com/r/confluentinc/cp-ksqldb-server) image.

## Step 1: Navigate to the ksql example directory

Navigate to the ksql example directory located at `/docs/examples/ksql` in the root of the MLCraft project. You can also download this directory from the GitHub repository. To navigate to the directory, run the following command:

```bash
cd ./docs/examples/ksql
```

## Step 2: Run the ksql service using the script

In the ksql example directory, there is a script called `run_ksql.sh`. Make sure the script is executable by running:

```bash
chmod +x run_ksql.sh
```

Then, start the ksql service by running the script:

```bash
./run_ksql.sh
```

After the script has finished running, it will return the host IP address of your machine. Take note of this IP address for the next step.

## Step 3: Add a datasource in the mlcraft UI

Go to the mlcraft UI and add a new datasource with the following parameters:

- Host: Host IP (obtained from the script in Step 2)
- Port: 8088

## Step 4: Test the connection

Click the "Test connection" button in the mlcraft UI to verify the connection to the ksql datasource. If the connection is successful, you will see a confirmation message.