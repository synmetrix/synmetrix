# QuestDB

Tested on the [questdb/questdb:7.1.1](https://hub.docker.com/r/questdb/questdb) image.

## Step 1: Navigate to the QuestDB example directory

Navigate to the QuestDB example directory located at `/docs/examples/questdb` in the root of the MLCraft project. You can also download this directory from the GitHub repository. To navigate to the directory, run the following command:

```bash
cd ./docs/examples/questdb
```

## Step 2: Run the QuestDB service using the script

In the QuestDB example directory, there is a script called `run_questdb.sh`. Make sure the script is executable by running:

```bash
chmod +x run_questdb.sh
```

Then, start the QuestDB service by running the script:

```bash
./run_questdb.sh
```

After the script has finished running, it will return the host IP address of your machine. Take note of this IP address for the next step.

## Step 3: Add a data source in the mlcraft UI

Go to the mlcraft UI and add a new data source with the following parameters:

- Name: QuestDB Test
- Host: Host IP (obtained from the script in Step 2)
- Port: 8812
- User: quest
- Password: quest

## Step 4: Test the connection

Click the "Check connection" button in the mlcraft UI to verify the connection to the QuestDB data source. If the connection is successful, you will see a confirmation message.