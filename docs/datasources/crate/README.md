# CrateDB

Tested on the [crate:5.3.0](https://hub.docker.com/_/crate) image.

## Step 1: Navigate to the CrateDB example directory

Navigate to the CrateDB example directory located at `/docs/examples/crate` in the root of the project. You can also download this directory from the GitHub repository. To navigate to the directory, run the following command:

```bash
cd ./docs/examples/crate
```


## Step 2: Run the CrateDB service using the script

In the CrateDB example directory, there is a script called `run_crate.sh`. Make sure the script is executable by running:

```bash
chmod +x run_crate.sh
```

Then, start the CrateDB service by running the script:

```bash
./run_crate.sh
```

After the script has finished running, it will return the host IP address of your machine. Take note of this IP address for the next step.

## Step 3: Add a data source in the UI

Go to the UI and add a new Crate data source with the following parameters:

- Name: Crate
- Host: Host IP (obtained from the script in Step 2)
- Port: 4200
- User: crate

## Step 4: Test the connection

Click the "Check connection" button in the UI to verify the connection to the CrateDB data source. If the connection is successful, you will see a confirmation message.