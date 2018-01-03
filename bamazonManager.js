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

var addProduct = (answers, callback) =>{
    let query = connection.query(
        "INSERT INTO products SET ?", 
        [
            {
                product_name: answers.product,
                department_name: answers.department,
                price: answers.price,
                stock_quantity: answers.initialStock
            }
        ], 
        (err,res) =>{
            if(err) throw err;
            else{
                console.log("Added Product!");
                if(typeof callback === "function") callback();
            }
        }
    );
    console.log(query.sql);
}
var inquireAddProduct = ()=>{
    inquirer.prompt([
        {
            type: "input",
            message: "Product Name?",
            name: "product"
        },
        {
            type: "input",
            message: "Department?",
            name: "department"
        },
        {
            type: "input",
            message: "Sales Price?",
            name: "price"
        },
        {
            type: "input",
            message: "Initial Stock?",
            name: "initialStock"
        }
    ]).then(answers => {
        addProduct(answers, startScreen);
    });
}
var addToInv = (answers, callback) =>{
    let query = connection.query(
        "UPDATE products SET stock_quantity = stock_quantity + " + answers.addedQuantity +" WHERE ?",
        [   
            {
                item_id: answers.itemId
            }
        ], 
        function(err,res){
            if (err) throw err;
            else{
                console.log("Inventory Updated!");
                if(typeof callback === "function") callback();
            }
        });
    
}
var inquireAddInv = () =>{
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the item you would like to add inventory to.",
            name: "itemId"
        },
        {
            type: "input",
            message: "How much inventory are you adding?",
            name: "addedQuantity"
        }
    ]).then(answers =>{
        if(parseInt(answers.itemId) > resLength || parseInt(answers.itemId) < 1 ){
            console.log("WARNING: Invalid Item ID!");
            inquireAddInv();
        }else{
            addToInv(answers, startScreen);
        }
    });
}
var prepAddInv = () =>{
    viewProducts(inquireAddInv);
}
var viewLowInv = () =>{
    let query = connection.query("SELECT * FROM products WHERE stock_quantity < 5", 
    function(err,res){
        if(res.length === 0){
            console.log("No low inventory.");
        }else{
            console.log(columnify(res));
        }
        if (typeof callback === "function") callback();
    });
}
var viewProducts = (callback) =>{
    let query = connection.query("SELECT * FROM products", function(err,res){
        console.log(columnify(res));
        resLength = res.length;
        if (typeof callback === "function") callback();
    });
}
var startScreen = () =>{
    inquirer.prompt([
        {
            type: "list",
            choices:["View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    "Exit"
                ],
            message: "Select From Menu:",
            name: "optionChoice"
        }
    ]).then(answers =>{
        switch (answers.optionChoice){
            case "View Products for Sale":
                viewProducts(startScreen);
                break;
            case "View Low Inventory":
                viewLowInv(startScreen);
                break;
            case "Add to Inventory":
                prepAddInv();
                break;
            case "Add New Product":
                inquireAddProduct();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}
startScreen();