DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(11,2) NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY(item_id)
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

