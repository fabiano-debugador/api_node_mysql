This is an API project using NodeJS and My Sql.
I did this project to understand how Node and MySql work.

To test create the database: ecommerce

and tables

orders

CREATE TABLE `orders` (
  `id_order` int (11) NOT NULL AUTO_INCREMENT,
  `id_product` varchar (45) DEFAULT NULL,
  smallint (6) DEFAULT NULL,
  PRIMARY KEY (`id_order`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4

and products

CREATE TABLE `products` (
  `id_product` int (11) NOT NULL AUTO_INCREMENT,
  `name` varchar (45) DEFAULT NULL,
  DEFAULT NULL float price,
  PRIMARY KEY (`id_product`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4
