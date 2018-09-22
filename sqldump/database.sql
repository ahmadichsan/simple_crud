CREATE TABLE `master_profile` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `master_category` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`category_name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `master_product` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`product_name` varchar(255) NOT NULL,
	`product_code` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `product_category` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`product_id` INT(11) NOT NULL,
	`category_id` INT(11) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `product_category` ADD CONSTRAINT `product_category_fk0` FOREIGN KEY (`product_id`) REFERENCES `master_product`(`id`);

ALTER TABLE `product_category` ADD CONSTRAINT `product_category_fk1` FOREIGN KEY (`category_id`) REFERENCES `master_category`(`id`);

