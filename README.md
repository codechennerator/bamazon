# bamazon
Copy and paste this schema into a working into an sql query to play with the app!

```sql
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
```
## bamazonCustomer.js
On start, the console will print out all the columns of the products table.
![alt_text]
(md_assets/customer0.png)
