var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "The-store"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
})

connection.query('SELECT * FROM Products', function (err, res) {
    console.log("----------------------------");
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].ID + " | " + res[i].ProductName + " | " + "$" + res[i].Price + " | " + res[i].StockQuantity + " | ");
    }
    console.log("----------------------------");

    var start = function () {
        console.log('\n-------------------------------------');
        inquirer.prompt([{
            name: "idBuy",
            type: "input",
            message: "What is the ID of the product you would like to buy?",
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
            message: "What is the number of units you would like to buy?",
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
            var total = parseFloat((res[productID].Price) * numberOfUnits);

            if (res[productID].StockQuantity >= numberOfUnits) {

                connection.query('UPDATE products SET ? WHERE ?', [
                    { StockQuantity: (res[productID].StockQuantity - numberOfUnits) },
                    { ID: answer.idBuy }
                ], function (err, res) {

                    if (err) throw err;
                    console.log('\n-------------------------------------');
                    console.log("\nYour total is $" + total.toFixed(2));
                    console.log('-------------------------------------');
                    start();
                });

            } else {
                console.log('\n-------------------------------------');
                console.log("Sorry, there is not enough units in stock!");
                console.log('\n-------------------------------------');
                start();
            }
            // start();
        });
    }

    start();
})
