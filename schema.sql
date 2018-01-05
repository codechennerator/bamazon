DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(11,2) NULL,
    stock_quantity INT(11) NOT NULL,
    product_sales DECIMAL(11,2) NOT NULL,
    PRIMARY KEY(item_id)
);

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(11,2) NULL,
    PRIMARY KEY(department_id)
);

/*Dummy Inserts*/

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
    ("mouse", "electronics", 30.55, 10),
    ("keyboard", "electronics", 75.00, 10),
    ("laptop", "electronics", 1300.00, 10),
    ("The Richest Man in Babylon", "books", 34.50, 10),
    ("Life 3.0: Being Human in the Age of Artifical Intelligence", "books", 35.00, 10),
    ("The Power of Habit: Why We Do What We Do in Life and Business", "books", 13.09, 10),
    ("coffee table", "furniture", 415.00, 10),
    ("couch", "furniture", 800.00, 10),
    ("bed", "furniture", 950.00, 10),
    ("desk", "furniture", 500.00, 10);

INSERT INTO departments(department_name, over_head_costs)
VALUES 
    ("electronics", 3000),
    ("books", 600),
    ("furniture", 2000);

/*The following joins the two tables, allowing a supervisor to see the how well product_sales is doing in each department*/
SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, products.product_sales - departments.over_head_costs AS total_profit
FROM departments
INNER JOIN products ON departments.department_name = products.department_name
GROUP BY departments.department_id;

