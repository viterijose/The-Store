DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

use bamazon;

create TABLE  products (

    id integer(11) not null auto_increment,
    product_name varchar(70) not null,
    department_name varchar(70) not null,
    price decimal(10,3) not null,
    stock_quantity integer(11) not null,
    primary key(id)
    
);
