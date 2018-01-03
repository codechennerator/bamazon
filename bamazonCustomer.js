const mysql = require("mysql");
const inquirer = require("inquirer");
const columnify = require("columnify");
let resLength = 0;

const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});


connection.connect(function(err){
    if (err) throw err;
});

var fulfillOrder = (answers, quantityRemaining, indPrice, product) => {
    let query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantityRemaining
            },
            {
                item_id: answers.itemId
            }
        ],
        function(err, res){
            if (err) throw err;
            let totalPrice = answers.amountToPurchase * indPrice;
            console.log("Thank you for buying " + answers.amountToPurchase+ " " + product + "(s).");
            console.log("Total Price: " + indPrice*answers.amountToPurchase);
            
        }
    );
    connection.end();
}
var isInStock = (answers) =>{
    let query = connection.query(
        "SELECT stock_quantity, price, product_name FROM products WHERE ?",
        [{
            item_id: answers.itemId
        }],
        function(err,res){
            console.log(res);
            if (err){
                console.log(err);
            }else{
                if(res[0].stock_quantity - parseInt(answers.amountToPurchase)<0){
                    console.log("WARNING: Insufficient Quantity!");
                    inquirePurchase();
                }else{
                    console.log("Success!");
                    let quantityRemaining = res[0].stock_quantity - parseInt(answers.amountToPurchase);
                    fulfillOrder(answers,quantityRemaining,res[0].price, res[0].product_name);
                }
            }
        }
        
    );
}
var inquirePurchase = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the item you would like to purchase",
            name: "itemId"
        },
        {
            type: "input",
            message: "How many would you like to purchase?",
            name: "amountToPurchase"
        }
    ]).then(answers => {
        if(parseInt(answers.itemId) > resLength || parseInt(answers.itemId) < 1 ){
            console.log("WARNING: Invalid Item ID!");
            inquirePurchase();
        }else{
            (isInStock(answers));
        }
        

    });
}
var displayInventory = () => {
    let query = connection.query(
        "SELECT * FROM products", 
        function(err, res){
            resLength = res.length;
            console.log(columnify(res));
            inquirePurchase();
        }
    );
}
displayInventory();
