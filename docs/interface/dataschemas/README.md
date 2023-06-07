# Dataschemas Page

The Dataschemas page is a powerful tool for generating and managing dataschemas in your project. It allows you to define the structure and relationships of your data, ensuring consistency and integrity. Additionally, the page provides features for version controlling your schemas and executing SQL queries on the associated data sources. Here's how you can make the most of this page:

## How to

1. To get started, you need to generate data schemas. Select the "Generate Schema" option from the menu (shown in the screenshot below).
![Generate Schema button](/docs/images/dataschemas1.png)

2. In the opened window, navigate to the required sections by opening the corresponding tabs, and check the boxes next to the tables or metrics you want to analyze and click "Generate" button (indicated by the arrow in the screenshot below).
![Checkboxes](/docs/images/dataschemas2.png)

Now you should see the generated data schema files in the right column (as shown in the screenshot below). You can freely edit your dataschemas as needed, adding and removing measures and dimensions. All your changes will be tracked by the version control system, the details of which are described below.

## Version control system

The version control system tracks changes to the data schemas, allowing you to revert to previous states of the schemas.

To view the saved versions, open the drop-down menu located at the top left of the page and select the "Show versions" option (as shown in the screenshot below).
![Versions](/docs/images/dataschemas3.png)

In the opened window, you will see all the saved versions of the data schemas (as shown in the screenshot below). By expanding the rows, you can view the files and their contents. To revert to a specific version, simply click the "Restore" button next to it, and it will become the current version.
![Restore version](/docs/images/dataschemas4.png)

Additionally, the version control system allows you to create separate branches of versions, which can help you switch between versions more efficiently than restoring versions within a single branch.

To create a branch, open the branch list located in the top left corner of the page, enter the name of the new branch in the field, and click the plus icon button.
![New branch](/docs/images/dataschemas5.png)

This will create a new branch with the current state. To work with the new branch, you need to switch to it and then make it the default branch by clicking the "Set as default" button (shown in the screenshot).
![New branch](/docs/images/dataschemas6.png)
