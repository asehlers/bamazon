var mysql = require("mysql");
var bamazonDB = require("./bamazon_requests.js");
var inquirer = require("inquirer");


var data = setTimeout(bamazonDB.readProducts, 1000);



function askForSale()
{
	inquirer.prompt([
		{
			type: "input",
			name: "id",
			message: "Please enter the ID of the product you wish to buy"
		},
		{
			type: "input",
			name: "quantity",
			message: "Please enter the quantity you wish to buy"
		}
	]).then(function(res)
	{
		bamazonDB.makePurchase(res.id, res.quantity);
		setTimeout(bamazonDB.closeConnection, 5000);
	});
}


setTimeout(askForSale, 1100);
