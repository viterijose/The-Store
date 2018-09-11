# The-Store

Command line program that replicates an online retail store using mySQL database to store item information, javascript logic and NPM package inquirer for user interactions.

## How to use

1. Install all npm packages associated with the scrip by running "npm i" on the terminal
2. Copy and paste seed and squeema files into mySQL workbench and run them in order to populate and create our database.

<image src="/images/seed.png" height="450"/>

3. In the terminal run the manager script by typing "node manager.js", this will begin the logic for the manager version of the store where you will be able to view items for sale, add inventory, view low inventory and add new items.

<image src="/images/sale.png"/>

4. To add inventory to existing item in your SQL database you simply select "Add to inventory" option in the command line and input the quantity and ID of the item you wish to add.

<image src="/images/add.png"/>

5. All items that have inventory lower than 5 can b viewed by selecting "View Low Inventory" option

<image src="/images/low.png"/>

6. To add new items, select "Add New Products" option and provide the information required by the command line.
