# Interface

## Datasources Page

The Datasources page provides a user-friendly interface for adding various data sources to your project. It offers a wide selection of possible databases, drivers, and other data storage solutions, giving you flexibility in choosing the right option for your needs. To add a data source, follow these steps:

1. Click on the "Connect" button, located in the top right corner of the page.
2. A list of available data source types will be displayed. Select the desired type from the options presented.
3. In the opened modal window, fill in all the required fields in the form. These fields may include connection details, authentication credentials, and other relevant information.
4. After filling in the necessary information, click the "Test Connection" button to verify the accuracy of the entered data.
5. If the connection test is successful, click the "Save" button to add the data source to your project.

![Datasources Page](/docs/images/datasources.png)

## Dataschemas Page

The Dataschemas page is a powerful tool for generating and managing data schemas in your project. It allows you to define the structure and relationships of your data, ensuring consistency and integrity. Additionally, the page provides features for version controlling your schemas and executing SQL queries on the associated data sources. Here's how you can make the most of this page:

1. Use the intuitive interface to generate new data schemas or edit existing ones. You can define tables, columns, indexes, and constraints to accurately represent your data model.
2. Leverage the version control system to manage different branches of your schemas. This allows you to work on separate features or experiment with changes while maintaining a stable version of your schema.
3. Execute SQL queries directly on your data sources using the built-in query editor. This provides a convenient way to interact with your data and view the results of complex queries.
4. Take advantage of the query history and results view to track your queries and analyze the output.

![Dataschemas Page](/docs/images/dataschemas.png)

## Alerts Page

The Alerts page provides a convenient way to create alerts that monitor your data for anomalies and send notifications when metrics exceed predefined thresholds. Alerts help you stay informed about important changes in your data and take timely action. Follow the steps below to create an alert:

1. Click the "Create" button located in the top right corner of the page.
2. In the "Data Settings" section, select the desired data source and metrics that you want to monitor for threshold breaches.
3. Configure the alert trigger settings in the "Trigger Settings" section. Specify the frequency at which the data should be checked for anomalies and set the desired timeouts for triggering the alert.
4. In the "Delivery Settings" section, choose the delivery method for the alert notifications. You can select between webhook, Slack, or email based on your preference and integrations.
5. After providing the necessary details, click the "Save" or "Create Alert" button to create the alert.

![Alerts Page](/docs/images/alerts.png)
