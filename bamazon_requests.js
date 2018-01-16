var mysql = require("mysql");
var connected = false;
var connection = mysql.createConnection(
{
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) 
{
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // createProduct();
  // closeConnection();
  connected = true;
});

function readProducts() 
{
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) 
  {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    // connection.end();
    console.log("These Products are for sale");
  for(var i = 0; i < res.length; i++)
  {
    console.log(res[i].item_id + ") " + res[i].product_name + " $" + res[i].price);
  }
    return res;
  });
}

function updateTable(id, quantity)
{
  console.log(quantity);
  connection.query("UPDATE products SET ? WHERE ?",
  [
    {
      stock_quantity: quantity
    },
    {
      item_id: id
    }
  ], function(err, res)
  {
    if (err) throw err;
    console.log(res.affectedRows + " products updated!\n");
  });
}

function makePurchase(id, quantity)
{
  console.log("Making a purchase");
  connection.query("SELECT * FROM products WHERE item_id="+id, function(err, res)
  {
    if (err) throw err;
    // console.log(res);
    if(res[0].stock_quantity < quantity)
    {
      console.log("Insufficient quantity");
    }
    else
    {
      console.log("The price of your purchse is: $" + res[0].price*quantity);
      var newQuantity = res[0].stock_quantity - quantity;
      updateTable(id, newQuantity);
    }

  });
}

function closeConnection()
{
  connection.end();
}

module.exports = 
{
  readProducts: readProducts,
  closeConnection: closeConnection,
  makePurchase: makePurchase,
  connected: connected
}
