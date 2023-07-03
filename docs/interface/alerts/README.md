# Alerts Page

The Alerts page allows you to set up notifications based on predefined conditions in your data. When the specified conditions are met, an alert will be triggered, and you will be notified through your preferred delivery method. To create an alert, follow these steps:

## How to

1. Click the "Create" button on the Alerts page.
![Alerts Page](/docs/images/alerts1.png)

2. Select the destination where the alert notifications will be sent. You can choose between Webhook, Slack, or Email based on your preferences and integrations.
![Delivery path](/docs/images/alerts2.png)

3. Fill out the alert form with the following details:
![Alerts Form](/docs/images/alerts_form.png)

Form fields description for the Alerts page:

Alert Name: Enter a name that identifies the purpose and content of the alert.

Data settings:
- Datasource: Select the data source from which the alert will retrieve data.
- Cube: Choose the cube that contains the required metrics and dimensions for the alert.
- Measure: Select the metric you want to monitor for triggering the alert.
- Time Dimension: Choose the time dimension to be used for analyzing data over time.
- Granularity: Specify the level of detail for time-based data (e.g., day, week, month).
- Since: Set the starting point from which the data analysis begins.
- Limit: Specify the maximum number of records to be considered for the alert.

Trigger settings:
- Schedule: Configure the frequency at which the alert conditions will be evaluated by setting a schedule (e.g., every hour, daily, weekly).
- Lower Bound: Set the lower threshold value that triggers the alert.
- Upper Bound: Set the upper threshold value that triggers the alert.
- Request Timeout (minutes): Define the maximum time allowed for the data request to complete.
- Timeout On Fire (minutes): Specify the duration after which the alert is considered "fired" if the condition remains true.

Delivery settings:
The available fields in this section depend on the chosen delivery method for the alert. Here are some common options:
- Webhook: Enter the URL of the webhook endpoint where the alert notifications will be sent.
- Slack: Provide the Slack channel or user ID to which the alert notifications will be delivered.
- Email: Enter the email address(es) of the recipient(s) who will receive the alert notifications.

4. Once you have completed the settings, click the "Save" button to create the alert and start monitoring the specified conditions.
