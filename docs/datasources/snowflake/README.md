# Snowflake Integration

This guide provides step-by-step instructions on how to connect Snowflake to MLCraft.

## Step 1: Gather Snowflake connection information

Before proceeding, ensure you have the following Snowflake connection details:

- Database Name
- Warehouse
- Organization ID
- Account ID
- Username
- Password
- Role

You can find this information in your Snowflake account.

![Organization and Account IDs](/docs/images/snowflake1.png)

## Step 2: Add a new data source in the MLCraft UI

1. Go to the MLCraft UI and navigate to the "Data Sources" section.
2. Click on the "+ Connect" button.
3. Select "Snowflake" from the list of available data sources.

## Step 3: Fill in the connection details

Fill in the Snowflake connection details in the form with the following fields:

- Name: A custom name for your data source (e.g., "My Snowflake")
- Database Name: The name of your Snowflake database
- Warehouse: The name of your Snowflake warehouse
- Organization ID: The ID of your Snowflake organization
- Account ID: The ID of your Snowflake account
- Username: Your Snowflake username
- Password: Your Snowflake password
- Role: Your Snowflake role

## Step 4: Test the connection

Click the "Test connection" button in the MLCraft UI to verify the connection to your Snowflake data source. If the connection is successful, you will see a confirmation message.