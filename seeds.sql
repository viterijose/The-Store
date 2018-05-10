use bamazon;

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Adafruit Mini Push-Pull Solenoid - 5V ", "Electronics", 8.99,10);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("3x6x2.5 mm Miniature Steel Bearings","Sports & Outdoors", 8.39,20);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Mountain Falls Ultra Sunscreen Lotion", "Beauty & Personal Care", 29.30,100);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("LulzBot Mini Desktop 3D Printer", "Industrial and Scientific", 1250,5);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("LulzBot PolyLite PLA Polymaker Filament", "Industrial and Scientific", 25,15);

SELECT * FROM products;
