# CrateDB

Tested on the [crate:5.3.0](https://hub.docker.com/_/crate) image.

## Step 1: Navigate to the CrateDB example directory

Navigate to the CrateDB example directory located at `/docs/examples/cratedb` in the root of the project. You can also download this directory from the GitHub repository. To navigate to the directory, run the following command:

```bash
cd ./docs/examples/cratedb
```

## Step 2: Run the CrateDB service using Docker Compose

In the CrateDB example directory, there is a `docker-compose.yml` file. Start the CrateDB service by running the following command:

```bash
docker-compose up -d
```

After the service has started, get the host IP address of your machine. You will need this IP address for the next step.

## Step 3: Add a data source in the UI

Go to the UI and add a new data source with the following parameters:

- Name: Crate
- Host: Host IP (obtained from the script in Step 2)
- Port: 4200
- User: crate

## Step 4: Test the connection

Click the "Check connection" button in the UI to verify the connection to the CrateDB data source. If the connection is successful, you will see a confirmation message.