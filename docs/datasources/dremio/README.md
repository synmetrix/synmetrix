# Dremio

Tested on the [dremio/dremio-oss:latest](https://hub.docker.com/r/dremio/dremio-oss) image.

## Step 1: Navigate to the Dremio example directory

Navigate to the Dremio example directory located at `/docs/examples/dremio` in the root of the MLCraft project. You can also download this directory from the GitHub repository. To navigate to the directory, run the following command:

```bash
cd ./docs/examples/dremio
```

## Step 2: Run the Dremio service using the script

In the Dremio example directory, there is a script called `run_dremio.sh`. Make sure the script is executable by running:

```bash
chmod +x run_dremio.sh
```

Then, start the Dremio service by running the script:

```bash
./run_dremio.sh
```

After the script has finished running, it will return the host IP address of your machine. Take note of this IP address for the next step.

## Step 3: Create an administrator account and add a data source in Dremio

1. Open your web browser and go to http://localhost:9047.
2. Follow the prompts to create an administrator account.
3. Log in to the Dremio UI with your new account.
4. Click on "Add Source" and select "PostgreSQL" from the list of available data sources.
5. Use the credentials provided at https://uibakery.io/sql-playground to configure the PostgreSQL data source.

## Step 4: Add a data source in the mlcraft UI

Go to the mlcraft UI and add a new data source with the following parameters:

- Host: host_ip (obtained from the script in Step 2)
- Port: 9047
- Database name: Name given to the connection in Dremio
- User: Dremio administrator username
- Password: Dremio administrator password

## Step 5: Test the connection

Click the "Check connection" button in the mlcraft UI to verify the connection to the Dremio data source. If the connection is successful, you will see a confirmation message.