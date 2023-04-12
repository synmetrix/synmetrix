## Elasticsearch Setup Guide

### Step 1: Add Elasticsearch service to docker-compose.dev

<pre>
elasticsearch:
  image: docker.elastic.co/elasticsearch/elasticsearch:8.7.0
  ports:
    - 9200:9200
    - 9300:9300
  environment:
    - xpack.security.enabled=true
    - discovery.type=single-node
    - ELASTIC_PASSWORD=password
  networks:
    - mlcraft_default
</pre>

### Step 2: Start the Elasticsearch service

<pre>
python3 cli.py services up
</pre>

### Step 3: Create a new user

<pre>
curl -X POST -u elastic:password "http://localhost:9200/_security/user/user" -H 'Content-Type: application/json' -d'
{
  "password": "password",
  "roles": ["kibana","kibana_system"],
  "full_name": "Test user"
}'
</pre>

### Step 4: Add Kibana service to docker-compose.dev

<pre>
kibana:
  image: docker.elastic.co/kibana/kibana:8.7.0
  ports:
    - 5601:5601
  environment:
    - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    - ELASTICSEARCH_USERNAME=user
    - ELASTICSEARCH_PASSWORD=password
  networks:
    - mlcraft_default
  depends_on:
    - elasticsearch
</pre>

### Step 5: Start the Kibana service

<pre>
python3 cli.py services up
</pre>

### Step 6: Access Kibana and add sample data

Wait for the Kibana service to start, then go to http://localhost:5601 and log in with the credentials of the user you created:

<pre>
User: user
Password: password
</pre>

Click on the **Try sample data** link:

![Try sample data screenshot](docs/images/elasticsearch1.png)

At the bottom of the page, click **Other sample data sets**:

![Other sample data sets screenshot](docs/images/elasticsearch2.png)

Choose a dataset and click **Add data**.

### Step 7: Create a datasource in MLCraft

Now you can create a datasource in MLCraft using the following information:

<pre>
Name: Elasticsearch test datasource
Url: http://elasticsearch:9200
User: user
Password: password
</pre>

Save the datasource and click **Test connection**. You should see a message indicating that the connection is OK.
