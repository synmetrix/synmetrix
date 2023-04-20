# Druid Setup Guide

## Step 1: Navigate to the Druid example directory

Navigate to the Druid example directory located at `/docs/examples/druid` in the root of the MLCraft project. You can also download this directory from the GitHub repository. To navigate to the directory, run the following command:

```bash
cd ./docs/examples/druid
```

## Step 2: Run the Druid services using the script

In the Druid example directory, there is a script called `run_druid.sh`. Make sure the script is executable by running:

```bash
chmod +x run_druid.sh
```

Then, start the Druid services by running the script:

```bash
./run_druid.sh
```

After the script has finished running, it will return the host IP address of your machine. Take note of this IP address for the next step.

Wait for the cluster to start and go to http://localhost:8889.

## Step 3: Check the services

Go to the Services tab and make sure all services are online, as shown in the screenshot below.

![All services online](/docs/images/druid1.png)

## Step 4: Load example data

Select the "Load data" tab, then choose "Batch - classic" from the dropdown menu.

![Load data -> Batch - classic](/docs/images/druid2.png)

Next, select the "Example data" tile and click "Load example".

![Load example data](/docs/images/druid3.png)

Click the button with the text "Next: ..." in the bottom right corner until the data starts loading (about 9 times).
When the data starts loading, you will be redirected to the Ingestion tab and see the message "Task submitted successfully. Going to task view...".

![Next button](/docs/images/druid4.png)

After the data has finished loading, the task status will change to SUCCESS.

## Step 5: Create a new Druid datasource in MLCraft

Fill out the form with the following information:

- Name: Druid test datasource
- Host: Host IP (obtained from the script in Step 2)
- Port: 8082

Currently, the Test Connection feature is not implemented and always returns "OK". To ensure functionality, generate a schema and request any data in the Explore tab.
