# Elasticsearch

## Step 1: Navigate to the Elasticsearch example directory

Navigate to the Elasticsearch example directory located at `/docs/examples/elasticsearch` in the root of the MLCraft project. You can also download this directory from the GitHub repository. To navigate to the directory, run the following command:

```bash
cd ./docs/examples/elasticsearch
```

## Step 2: Run the Elasticsearch service using the script

In the Elasticsearch example directory, there is a script called `run_elasticsearch.sh`. Make sure the script is executable by running:

```bash
chmod +x run_elasticsearch.sh
```

Then, start the Elasticsearch service by running the script:

```bash
./run_elasticsearch.sh
```

After the script has finished running, it will return the host IP address of your machine. Take note of this IP address for the next step.

## Step 3: Wait for the service to be ready and add user

Wait for the Elasticsearch service to be ready to accept requests. Then run:

```
curl -X POST -u elastic:password "http://localhost:9200/_security/user/user" -H 'Content-Type: application/json' -d'
{
  "password": "password",
  "roles": ["kibana","kibana_system"],
  "full_name": "Test user"
}'
```

## Step 4: Access Kibana and add sample data

Wait for the Kibana service to start, then go to http://localhost:5601 and log in with the credentials:

<pre>
User: elastic
Password: password
</pre>

Click on the **Try sample data** link:

![Try sample data screenshot](/docs/images/elasticsearch1.png)

At the bottom of the page, click **Other sample data sets**:

![Other sample data sets screenshot](/docs/images/elasticsearch2.png)

Choose a dataset and click **Add data**.

## Step 5: Create a datasource in MLCraft

Now you can create a datasource in MLCraft using the following information:

<pre>
Name: Elasticsearch test datasource
Url: http://<host_ip>:9200
User: user
Password: password
</pre>

Save the datasource and click **Test connection**. You should see a message indicating that the connection is OK.
