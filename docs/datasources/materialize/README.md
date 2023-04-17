# Materialize

Tested on the [materialize/materialized:latest](https://hub.docker.com/r/materialize/materialized) image.

## Step 1: Navigate to the Materialize example directory

Navigate to the Materialize example directory located at `/docs/examples/materialize` in the root of the MLCraft project. You can also download this directory from the GitHub repository. To navigate to the directory, run the following command:

```bash
cd ./docs/examples/materialize
```

## Step 2: Run the Materialize service using the script

In the Materialize example directory, there is a script called `run_materialize.sh`. Make sure the script is executable by running:

```bash
chmod +x run_materialize.sh
```

Then, start the Materialize service by running the script:

```bash
./run_materialize.sh
```

After the script has finished running, it will return the host IP address of your machine. Take note of this IP address for the next step.

## Step 3: Add a data source in the mlcraft UI

Go to the mlcraft UI and add a new data source with the following parameters:

- Host: Host IP (obtained from the script in Step 2)
- Port: 6875
- Database name: Test
- User: user

## Step 4: Test the connection

Click the "Check connection" button in the mlcraft UI to verify the connection to the Materialize data source. If the connection is successful, you will see a confirmation message.