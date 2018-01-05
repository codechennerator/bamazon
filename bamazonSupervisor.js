const mysql = require("mysql");
const inquirer = require("inquirer");
const columnify = require("columnify");

const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

var addDepartment = (answers, callback) =>{
    let query = connection.query(
        "INSERT INTO departments SET ? ",
        [
            {
                department_name: answers.departName,
                over_head_costs: answers.departOver
            }
        ],
        (err,res) =>{
            if (err) throw err;
            else{
                console.log("Added department!");
                if(typeof callback === "function") callback();
            }
        }
    );
}
var inquireDepartmentInfo = () =>{
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the department name?",
                name: "departName"
            },
            {
                type: "input",
                message: "What is the department overhead?",
                name: "departOver"
            }
        ]).then(answers => {
            addDepartment(answers, startScreen);
        })
}
var viewProductSales = (callback) =>{
    let sql = `SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, products.product_sales - departments.over_head_costs AS total_profit
    FROM departments
    INNER JOIN products ON departments.department_name = products.department_name
    GROUP BY departments.department_id`;
    let query = connection.query(sql, (err,res)=>{
        if (err) throw err;
        console.log(columnify(res));
        if(typeof callback === "function") callback();
    });
}
var startScreen = () =>{
    inquirer.prompt(
        [
            {
                type: "list",
                choices:["View Product Sales by Department",
                        "Create New Department",
                        "Exit"
                    ],
                message: "Select From Menu:",
                name: "optionChoice" 
            }
        ]).then(answers =>{
            switch(answers.optionChoice){
                case "View Product Sales by Department":
                    viewProductSales(startScreen);
                    break;
                case "Create New Department":
                    inquireDepartmentInfo();
                    break;
                case "Exit":
                default:
                    console.log("Goodbye!");
                    connection.end();
                    break;
            }
        });
}
startScreen();