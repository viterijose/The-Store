var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "password", //Your password
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
})




function start() {
    connection.query('SELECT * FROM products', function (err, res) {
        inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }).then(function (answer) {
            switch (answer.action) {
                case 'View Products for Sale':
                    displayProducts();
                    break;

                case 'View Low Inventory':
                    displayLowInventory();
                    break;

                case 'Add to Inventory':
                    addToInventory();
                    break;

                case 'Add New Product':
                    AddNewProduct();
                    break;
            }
        })


        var displayProducts = function () {

            console.log("----------------------------");
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " \t| " + res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity + " | ");
            }
            console.log("----------------------------");
            start();
        }

        var displayLowInventory = function () {
            console.log("----------------------------");
            for (var i = 0; i < res.length; i++) {
                if (res[i].StockQuantity <= 5) {
                    console.log(res[i].id + " \t| " + res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity + " | ");
                    console.log("----------------------------");
                }
            }

            start();
        }


        var addToInventory = function () {
            console.log('\n-------------------------------------');
            inquirer.prompt([{
                name: "idBuy",
                type: "input",
                message: "What is the ID of the product you would like to update?",
                validate: function (value) {
                    if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }, {
                name: "numUnits",
                type: "input",
                message: "What is the number of units you would like to add?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }

                }
            }]).then(function (answer) {
                var productID = (answer.idBuy) - 1;
                var numberOfUnits = parseInt(answer.numUnits);

                connection.query('UPDATE products SET ? WHERE ?', [
                    { stock_quantity: (res[productID].stock_quantity + numberOfUnits) },
                    { id: answer.idBuy }
                ], function (err, res) {
                    if (err) throw err;
                });

                for (var i = 0; i < res.length; i++) {

                    if (res[i].ID == answer.idBuy) {
                        console.log("----------------------------");
                        console.log('You now have ' + numberOfUnits + ' more ' + res[i].ProductName + ' units');
                        console.log("----------------------------");
                    }
                }

                start();

            })


        }

        var AddNewProduct = function () {
            inquirer.prompt([{
                name: "newProduct",
                type: "input",
                message: "What is the name of the product you would like to add?"
            },
            {
                name: "depName",
                type: "input",
                message: "What department would you like to add the product to?"
            },
            {
                name: "prodPrice",
                type: "input",
                message: "What is the price of the product?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }

                }
            },
            {
                name: "numAdd",
                type: "input",
                message: "How many units would you like to add?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }

                }
            }]).then(function (answer) {
                connection.query('INSERT INTO products SET ?', {
                    productName: answer.newProduct,
                    departmentName: answer.depName,
                    price: answer.prodPrice,
                    stock_quantity: answer.numAdd
                }, function (err, res) {
                    if (err) throw err;
                    console.log("-------------------------");
                    console.log("You have just added " + answer.numAdd + " " + answer.newProduct + " units at $" + answer.prodPrice + " each.")
                    console.log("-------------------------");
                    start();
                });

            })

        }

    });

}