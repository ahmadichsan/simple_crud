-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `master_category`;
CREATE TABLE `master_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `master_category` (`id`, `category_name`) VALUES
(1,	'Sepatu Laki-laki'),
(2,	'Sepatu Bola'),
(3,	'Baju Tidur'),
(4,	'Baju Santai'),
(5,	'Baju Batik'),
(6,	'Baju Formal');

DROP TABLE IF EXISTS `master_product`;
CREATE TABLE `master_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `master_product` (`id`, `product_name`) VALUES
(1,	'Sepatu Laki-laki 1'),
(2,	'Sepatu Laki-laki 2'),
(3,	'Sepatu Bola 1'),
(4,	'Sepatu Bola 2'),
(5,	'Sepatu Laki-laki dan Bola 1'),
(6,	'Sepatu Laki-laki dan Bola 2'),
(7,	'Baju Tidur 1'),
(8,	'Baju Santai 1'),
(9,	'Baju Tidur dan Santai 1');

DROP TABLE IF EXISTS `master_user`;
CREATE TABLE `master_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `master_user` (`id`, `username`, `password`) VALUES
(1,	'ichsan',	'asd'),
(2,	'ahmad',	'asd');

DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category_fk0` (`product_id`),
  KEY `product_category_fk1` (`category_id`),
  CONSTRAINT `product_category_fk0` FOREIGN KEY (`product_id`) REFERENCES `master_product` (`id`),
  CONSTRAINT `product_category_fk1` FOREIGN KEY (`category_id`) REFERENCES `master_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `product_category` (`id`, `product_id`, `category_id`) VALUES
(1,	1,	1),
(2,	2,	1),
(3,	3,	2),
(4,	4,	2),
(5,	5,	1),
(6,	5,	2),
(7,	6,	1),
(8,	6,	2),
(9,	7,	3),
(10,	8,	4),
(11,	9,	3),
(12,	9,	4);

DROP TABLE IF EXISTS `product_code`;
CREATE TABLE `product_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `product_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_code` (`product_code`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_code_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `master_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `product_code` (`id`, `product_id`, `product_code`) VALUES
(1,	1,	'0001'),
(2,	1,	'0002'),
(3,	2,	'0003'),
(4,	2,	'0004'),
(5,	2,	'0005'),
(6,	3,	'0006'),
(7,	4,	'0007'),
(8,	4,	'0008'),
(9,	4,	'0009'),
(10,	5,	'0010'),
(11,	5,	'0011'),
(12,	6,	'0012'),
(13,	7,	'0013'),
(14,	8,	'0014'),
(15,	8,	'0015'),
(16,	8,	'0016'),
(17,	9,	'0017'),
(18,	9,	'0018');

-- 2018-09-24 13:30:41
