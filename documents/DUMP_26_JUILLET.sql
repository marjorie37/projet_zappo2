-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  jeu. 26 juil. 2018 à 11:50
-- Version du serveur :  10.0.34-MariaDB
-- Version de PHP :  7.0.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `dev2502_Zappo`
--

-- --------------------------------------------------------

--
-- Structure de la table `allergens`
--

CREATE TABLE `allergens` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `allergens`
--

INSERT INTO `allergens` (`id`, `name`) VALUES
(12, 'Arachide'),
(13, 'Oeufs'),
(14, 'Lait'),
(15, 'Noix'),
(16, 'Blé'),
(17, 'Soja'),
(18, 'Fruits de mer'),
(19, 'Céleri');

-- --------------------------------------------------------

--
-- Structure de la table `associateProduct`
--

CREATE TABLE `associateProduct` (
  `product_id` int(11) NOT NULL,
  `associate_product_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `associateProduct`
--

INSERT INTO `associateProduct` (`product_id`, `associate_product_id`, `id`) VALUES
(92, 72, 45),
(85, 82, 46),
(86, 70, 47),
(87, 78, 48),
(88, 67, 50),
(89, 63, 51),
(90, 71, 52),
(102, 78, 53),
(91, 65, 71),
(93, 80, 77),
(94, 64, 80),
(95, 76, 81),
(96, 71, 82),
(97, 70, 83),
(98, 75, 84),
(99, 81, 85),
(100, 73, 86),
(101, 67, 87),
(103, 81, 88),
(118, 72, 89),
(117, 77, 90),
(115, 63, 91),
(114, 68, 92),
(116, 68, 93),
(104, 67, 94),
(105, 72, 95),
(106, 79, 96),
(113, 63, 97),
(112, 76, 98),
(111, 74, 99),
(108, 69, 101),
(110, 73, 102),
(109, 77, 103),
(83, 71, 107),
(84, 77, 111),
(107, 66, 128);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`, `description`) VALUES
(1, 'Pizze', ''),
(2, 'Entrées', ''),
(3, 'Desserts', ''),
(4, 'Boissons', ''),
(5, 'Bambino', '');

-- --------------------------------------------------------

--
-- Structure de la table `discounts`
--

CREATE TABLE `discounts` (
  `id` int(11) NOT NULL,
  `discount_items` longtext NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `endAt` date DEFAULT NULL,
  `code` varchar(15) NOT NULL,
  `description` text NOT NULL,
  `percentage` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `publish` tinyint(1) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `discounts`
--

INSERT INTO `discounts` (`id`, `discount_items`, `name`, `createdAt`, `updatedAt`, `endAt`, `code`, `description`, `percentage`, `title`, `publish`, `state`) VALUES
(43, '{\"products\":[\"Portofino\",\"Palermo\",\"Parmigiana\"]}', 'wcs', '2018-07-18 15:03:55', '2018-07-18 15:03:55', '2018-07-26', 'SUMMER2018', '', 30, '', 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validation_time` datetime DEFAULT NULL,
  `comments` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `totalTTC` float NOT NULL,
  `totalHT` float NOT NULL,
  `customerId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cart` longtext COLLATE utf8_unicode_ci NOT NULL,
  `chargeId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pending_time` datetime DEFAULT NULL,
  `uid` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `createdAt`, `validation_time`, `comments`, `state`, `user_id`, `updatedAt`, `totalTTC`, `totalHT`, `customerId`, `cart`, `chargeId`, `pending_time`, `uid`) VALUES
(185, '2018-07-25 17:48:34', '2018-07-25 17:48:29', 'Bonjour, je peux avoir double ration de champignons sur ma pizza ?', '1', 144, '2018-07-25 17:48:34', 15.8, 13.92, 'cus_DIQ3wj5rHH5ob7', '[{\"id\":83,\"name\":\"Margharita\",\"ht_price\":9,\"ttc_price\":9.9,\"tva\":10,\"quantity\":1,\"category_id\":1},{\"id\":71,\"name\":\"Judas 8.5° 33cl\",\"ht_price\":4.917,\"ttc_price\":5.9,\"tva\":20,\"quantity\":1,\"category_id\":4}]', 'ch_1CrpE3KzRrq7Vbe5GQttCmyV', '2018-07-25 19:00:20', '2018-07-25-QUT3HQ'),
(186, '2018-07-25 18:04:34', '2018-07-25 18:04:29', 'Bonsoir, je peux avoir une chaise bébé ?', '1', 144, '2018-07-25 18:04:34', 43.5, 38.58, 'cus_DIQ3wj5rHH5ob7', '[{\"id\":83,\"name\":\"Margharita\",\"ht_price\":9,\"ttc_price\":9.9,\"tva\":10,\"quantity\":2,\"category_id\":1},{\"id\":71,\"name\":\"Judas 8.5° 33cl\",\"ht_price\":4.917,\"ttc_price\":5.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":84,\"name\":\"Verona\",\"ht_price\":9.909,\"ttc_price\":10.9,\"tva\":10,\"quantity\":1,\"category_id\":1},{\"id\":77,\"name\":\"Maredsous Triple 10° 33cl\",\"ht_price\":5.75,\"ttc_price\":6.9,\"tva\":20,\"quantity\":1,\"category_id\":4}]', 'ch_1CrpTXKzRrq7Vbe57sNlIXk2', '2018-07-25 21:00:29', '2018-07-25-1H4PBT'),
(189, '2018-07-26 08:47:43', '2018-07-26 08:47:38', 'Salut, pouvez-vous éviter de mettre l\'origan ? Je suis allergique et risque de mourir si j\'en mange.', '1', 144, '2018-07-26 08:47:43', 43.5, 38.58, 'cus_DIQ3wj5rHH5ob7', '[{\"id\":83,\"name\":\"Margharita\",\"ht_price\":9,\"ttc_price\":9.9,\"tva\":10,\"quantity\":2,\"category_id\":1},{\"id\":71,\"name\":\"Judas 8.5° 33cl\",\"ht_price\":4.917,\"ttc_price\":5.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":84,\"name\":\"Verona\",\"ht_price\":9.909,\"ttc_price\":10.9,\"tva\":10,\"quantity\":1,\"category_id\":1},{\"id\":77,\"name\":\"Maredsous Triple 10° 33cl\",\"ht_price\":5.75,\"ttc_price\":6.9,\"tva\":20,\"quantity\":1,\"category_id\":4}]', 'ch_1Cs3GDKzRrq7Vbe5UWIpcAyb', '2018-07-26 20:45:18', '2018-07-26-JLEAHK'),
(190, '2018-07-26 08:52:58', '2018-07-26 08:52:53', 'Sans commentaires', '1', 144, '2018-07-26 08:52:58', 77.2, 69.21, 'cus_DIQ3wj5rHH5ob7', '[{\"id\":83,\"name\":\"Margharita\",\"ht_price\":9,\"ttc_price\":9.9,\"tva\":10,\"quantity\":3,\"category_id\":1},{\"id\":71,\"name\":\"Judas 8.5° 33cl\",\"ht_price\":4.917,\"ttc_price\":5.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":84,\"name\":\"Verona\",\"ht_price\":9.909,\"ttc_price\":10.9,\"tva\":10,\"quantity\":2,\"category_id\":1},{\"id\":77,\"name\":\"Maredsous Triple 10° 33cl\",\"ht_price\":5.75,\"ttc_price\":6.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":92,\"name\":\"Végane\",\"ht_price\":11.727,\"ttc_price\":12.9,\"tva\":10,\"quantity\":1,\"category_id\":1}]', 'ch_1Cs3LIKzRrq7Vbe5L2z3pRfT', '2018-07-26 21:00:13', '2018-07-26-SQM8VO'),
(192, '2018-07-26 11:02:53', '2018-07-26 11:02:48', 'Bonjour, j\'aimerais un supplément fromage. Merci.', '1', 144, '2018-07-26 11:02:53', 77.2, 69.21, 'cus_DIQ3wj5rHH5ob7', '[{\"id\":83,\"name\":\"Margharita\",\"ht_price\":9,\"ttc_price\":9.9,\"tva\":10,\"quantity\":3,\"category_id\":1},{\"id\":71,\"name\":\"Judas 8.5° 33cl\",\"ht_price\":4.917,\"ttc_price\":5.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":84,\"name\":\"Verona\",\"ht_price\":9.909,\"ttc_price\":10.9,\"tva\":10,\"quantity\":2,\"category_id\":1},{\"id\":77,\"name\":\"Maredsous Triple 10° 33cl\",\"ht_price\":5.75,\"ttc_price\":6.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":92,\"name\":\"Végane\",\"ht_price\":11.727,\"ttc_price\":12.9,\"tva\":10,\"quantity\":1,\"category_id\":1}]', 'ch_1Cs5N1KzRrq7Vbe5bfOwXWXb', '2018-07-26 21:45:09', '2018-07-26-SELMGH'),
(193, '2018-07-26 11:08:13', '2018-07-26 11:08:09', 'Bonjour, pouvez-vous mettre des champignons en plus ?', '1', 144, '2018-07-26 11:08:13', 77.2, 69.21, 'cus_DIQ3wj5rHH5ob7', '[{\"id\":83,\"name\":\"Margharita\",\"ht_price\":9,\"ttc_price\":9.9,\"tva\":10,\"quantity\":3,\"category_id\":1},{\"id\":71,\"name\":\"Judas 8.5° 33cl\",\"ht_price\":4.917,\"ttc_price\":5.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":84,\"name\":\"Verona\",\"ht_price\":9.909,\"ttc_price\":10.9,\"tva\":10,\"quantity\":2,\"category_id\":1},{\"id\":77,\"name\":\"Maredsous Triple 10° 33cl\",\"ht_price\":5.75,\"ttc_price\":6.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":92,\"name\":\"Végane\",\"ht_price\":11.727,\"ttc_price\":12.9,\"tva\":10,\"quantity\":1,\"category_id\":1}]', 'ch_1Cs5SBKzRrq7Vbe5dCH2ILhb', '2018-07-26 21:15:31', '2018-07-26-TPKPBQ'),
(194, '2018-07-26 11:19:14', '2018-07-26 11:19:10', 'Bonjour, je suis allergique aux câpres (oui, je sais c\'est chelou...). Pouvez-vous ne pas en mettre sur ma pizza ? Merci.', '1', 144, '2018-07-26 11:19:14', 98, 88.12, 'cus_DIQ3wj5rHH5ob7', '[{\"id\":83,\"name\":\"Margharita\",\"ht_price\":9,\"ttc_price\":9.9,\"tva\":10,\"quantity\":4,\"category_id\":1},{\"id\":71,\"name\":\"Judas 8.5° 33cl\",\"ht_price\":4.917,\"ttc_price\":5.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":84,\"name\":\"Verona\",\"ht_price\":9.909,\"ttc_price\":10.9,\"tva\":10,\"quantity\":3,\"category_id\":1},{\"id\":77,\"name\":\"Maredsous Triple 10° 33cl\",\"ht_price\":5.75,\"ttc_price\":6.9,\"tva\":20,\"quantity\":1,\"category_id\":4},{\"id\":92,\"name\":\"Végane\",\"ht_price\":11.727,\"ttc_price\":12.9,\"tva\":10,\"quantity\":1,\"category_id\":1}]', 'ch_1Cs5cqKzRrq7Vbe5AYC5fpee', '2018-07-26 12:15:03', '2018-07-26-KHGLA5');

-- --------------------------------------------------------

--
-- Structure de la table `order_delay`
--

CREATE TABLE `order_delay` (
  `id` int(11) NOT NULL,
  `time` int(11) NOT NULL DEFAULT '20',
  `state` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `order_delay`
--

INSERT INTO `order_delay` (`id`, `time`, `state`) VALUES
(1, 20, 1);

-- --------------------------------------------------------

--
-- Structure de la table `order_products`
--

CREATE TABLE `order_products` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `free` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `order_products`
--

INSERT INTO `order_products` (`order_id`, `product_id`, `quantity`, `free`) VALUES
(61, 2, 0, 0),
(62, 10, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `ht_price` float NOT NULL,
  `tva` float NOT NULL,
  `state` tinyint(1) NOT NULL,
  `sub_category` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `favorites` tinyint(1) NOT NULL,
  `allergens` longtext COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ttc_price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `ht_price`, `tva`, `state`, `sub_category`, `category_id`, `favorites`, `allergens`, `url`, `ttc_price`) VALUES
(2, 'Mozzarella di Bufala Campana', 'Mozzarella Appellation d\'Origine Protégée, 125 gr', 6.27, 10, 1, 'Antipasti', 2, 0, '[\"Lait\"]', '', 6.9),
(3, 'Mozzarella di Bufala Campana Affumicata', 'Furnée a la paille de blé 125gr', 7.182, 10, 1, 'Antipasti', 2, 0, '[\"Lait\"]', '\"\"', 7.9),
(4, 'Burrata', 'Fromage crémeux, originaire des Pouilles. 125gr', 7.182, 10, 1, 'Antipasti', 2, 0, '[\"Lait\"]', '\"\"', 7.9),
(5, 'Burrata a la truffe', 'Fromage crémeux à la Truffe, originaire des Pouilles. 125gr', 9, 10, 1, 'Antipasti', 2, 0, '[\"Lait\"]', '\"\"', 9.9),
(6, 'Tomates cerises marinées au pesto frais', 'Idéales pour picorer à l\'apéritif', 4.455, 10, 1, 'Antipasti', 2, 0, '[]', '\"\"', 4.9),
(7, 'Poivrons grillés et marinés', 'A déguster en entrée, en salade ou en apéritif', 4.455, 10, 1, 'Antipasti', 2, 0, '[]', '\"\"', 4.9),
(8, 'Salade de roquette', 'Au vinaigre Balsamique de modène', 4.455, 10, 1, 'Antipasti', 2, 0, '[]', '\"\"', 4.9),
(9, 'Tagliere di Verdure grigliate e marinate', 'planche de legumes grillés et marinés', 9, 10, 1, 'Antipasti', 2, 0, '[]', '\"\"', 9.9),
(10, 'Tagliere di Salumi italieni', 'Planche de charcuteries italiennes', 9.909, 10, 1, 'Antipasti', 2, 0, '[]', '\"\"', 10.9),
(11, 'Tagliere di Antipasti misti', 'Planche de charcuteries italiennes et legumes grillés et marinés', 9.909, 10, 1, 'Antipasti', 2, 0, '[]', '\"\"', 10.9),
(12, 'Ricard', 'Apéritif anisé 4cl', 4.083, 20, 1, 'Aperitivo', 4, 0, '[]', '\"\"', 4.9),
(13, 'Martini rosso', 'Apéritif 4 cl. Sucré et légèrement amer, il exhale des arômes multiples grâce un assemblage de vin et d\'herbes sélectionnées.', 4.083, 20, 1, 'Aperitivo', 4, 0, '[]', '\"\"', 4.9),
(14, 'Martini bianco', 'Apéritif 4 cl. Sucré et légèrement amer, il exhale des arômes multiples grâce un assemblage de vin et d\'herbes sélectionnées. ', 4.083, 20, 1, 'Aperitivo', 4, 0, '[]', '\"\"', 4.9),
(15, 'Verre de Tariquet \'Ière Grives’ Farnille Grassa', 'IGP côte de Gascogne', 4.083, 20, 1, 'Aperitivo', 4, 0, '[]', '\"\"', 4.9),
(16, 'Kir', 'Crème de cassis et vin blanc de Bourgogne aligoté', 4.083, 20, 1, 'Aperitivo', 4, 0, '[]', '\"\"', 4.9),
(17, 'Vittel 50cl', 'Eau minérale naturelle en provenance des Vosges (France) – 50 cl', 3.545, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.9),
(18, 'Vittel 1L', 'Eau minérale naturelle en provenance des Vosges (France) – 1l', 4.455, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 4.9),
(19, 'San Pellegrino 50cl', 'Eau minérale naturelle gazeuse – 50 cl', 3.545, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.9),
(20, 'San Pellegrino 1L', 'Eau minérale naturelle gazeuse – 1l', 4.455, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 4.9),
(21, 'Granini Tomate', 'Jus de tomate – 25cl', 3.182, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.5),
(22, 'Granini Pomme', 'Jus de pomme – 25cl', 3.182, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.5),
(23, 'Granini Abricot', 'Jus d’abricot – 25cl', 3.182, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.5),
(24, 'Granini Ananas', 'Jus d’ananas – 25cl', 3.182, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.5),
(25, 'Granini Fraise', 'Jus de fraise – 25cl', 3.182, 10, 0, 'Softs', 4, 0, '[]', '\"\"', 3.5),
(26, 'Granini Orange', 'Jus d’orange – 25cl', 3.182, 10, 1, 'Softs', 4, 0, '[]', 'Pikachu.png', 3.5),
(27, 'Granini ACE', 'Jus à base de jus d’orange, de carrotes et de citron – 25 cl', 3.182, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.5),
(28, 'Perrier 33cl', 'Eau minérale naturellement gazeuse – 33 cl', 3.545, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.9),
(29, 'Coca Cola', '33 cl', 3.545, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.9),
(30, 'Coca Cola Zero', '33 cl', 3.545, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.9),
(31, 'Orangina', '25 cl', 3.545, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.9),
(32, 'Sprite 33cl', 'Boisson gazeuse à base d\'extraits de citron et de lime – 33 cl', 3.545, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.9),
(33, 'Fuzetea', 'Thé glacé, 20 cl', 3.545, 10, 1, 'Softs', 4, 0, '[]', '\"\"', 3.9),
(34, 'Tiramisu traditionnel', 'Dessert au mascarpone battu et café.', 5.364, 10, 1, 'Dolci', 3, 0, '[\"Oeufs\",\"Lait\",\"Blé\"]', '\"\"', 5.9),
(35, 'Tiramisu speculoos', 'Dessert au mascarpone battu, speculoos et café.', 5.364, 10, 1, 'Dolci', 3, 0, '[\"Oeufs\",\"Lait\",\"Blé\"]', '\"\"', 5.9),
(36, 'Tiramisu dulce de leche', 'Tiramisu à la confiture de lait.', 5.364, 10, 1, 'Dolci', 3, 0, '[\"Oeufs\",\"Lait\",\"Blé\"]', '\"\"', 5.9),
(37, 'Tiramisu Nutella', 'Dessert au mascarpone battu au café avec une touche de Nutella.', 5.364, 10, 1, 'Dolci', 3, 0, '[\"Arachide\",\"Oeufs\",\"Lait\",\"Noix\",\"Blé\"]', '\"\"', 5.9),
(38, 'Panna Cotta caramel au beurre salé', 'Entremets à base de crème fraîche gélifiée servi avec un coulis caramel au beurre salé.', 5.364, 10, 1, 'Dolci', 3, 0, '[\"Lait\"]', '\"\"', 5.9),
(39, 'Panna Cotta coulis fruits rouges', 'Entremets à base de crème fraîche gélifiée servi avec un coulis fruits rouges.', 5.364, 10, 1, 'Dolci', 3, 0, '[\"Lait\"]', '\"\"', 5.9),
(40, 'Panna Cotta coulis fruits exotiques', 'Entremets à base de crème fraîche gélifiée servi avec un coulis fruits exotiques.', 5.364, 10, 1, 'Dolci', 3, 0, '[\"Lait\"]', '\"\"', 5.9),
(41, 'Panna Cotta Nutella', ' Entremets à base de crème fraîche gélifiée servi avec un coulis au Nutella.', 5.364, 10, 1, 'Dolci', 3, 0, '[\"Arachide\",\"Lait\",\"Noix\"]', '\"\"', 5.9),
(42, 'Tartare d’ananas, sorbet coco', ' Dessert frais et exotique.', 5.364, 10, 1, 'Dolci', 3, 0, '[\"Oeufs\"]', '\"\"', 5.9),
(43, '« Tarte » au citron meringuée…', 'Façon Zappo', 6.273, 10, 1, 'Dolci', 3, 0, '[\"Oeufs\",\"Lait\",\"Blé\"]', '\"\"', 6.9),
(44, 'Pizzeta Nutella', ' Petite pizza recouverte de Nutella.', 6.273, 10, 1, 'Dolci', 3, 0, '[\"Arachide\",\"Lait\",\"Noix\",\"Blé\"]', '\"\"', 6.9),
(45, 'Café gourmand', ' Assortiment de petits desserts et son café.', 6.273, 10, 1, 'Dolci', 3, 0, '[\"Arachide\",\"Oeufs\",\"Lait\",\"Noix\",\"Blé\"]', '\"\"', 6.9),
(46, 'Expresso', 'Café court grands crus Illy', 1.727, 10, 1, 'Caffe', 4, 0, '[]', '\"\"', 1.9),
(47, 'Ristreto', 'Café serré grand cru Illy', 1.727, 10, 1, 'Caffe', 4, 0, '[]', '\"\"', 1.9),
(48, 'Expresso Macchiato', 'Café expresso grand cru Illy surmonté d\'une petite couche de mousse de lait', 2.091, 10, 1, 'Caffe', 4, 0, '[]', '\"\"', 2.3),
(49, 'Double Expresso', 'Café expresso grand cru Illy, double mouture.', 3.182, 10, 1, 'Caffe', 4, 0, '[]', '\"\"', 3.5),
(50, 'Capuccino', 'Café long grand cru Illy, mélangé et coiffé d\'une mousse de lait crémeuse', 3.545, 10, 1, 'Caffe', 4, 0, '[\"Lait\"]', '\"\"', 3.9),
(51, 'Chococcino', 'Chocolat au lait, intense avec des notes vanillées, et s\'agrémenté d’une mousse de lait.', 4.455, 10, 1, 'Caffe', 4, 0, '[\"Lait\"]', '\"\"', 4.9),
(52, 'Latte Macchiato Caramel', 'Espresso et mousse de lait surmonté d\'un coulis caramel.', 4.455, 10, 1, 'Caffe', 4, 0, '[]', '\"\"', 4.9),
(53, 'Latte Macchiato Noix de Pecan', 'Espresso et mousse de lait surmonté d\'un coulis noix de pécan.', 4.455, 10, 1, 'Caffe', 4, 0, '[]', '\"\"', 4.9),
(54, 'Latte Macchiato Speculoos', 'Espresso et mousse de lait surmonté d\'un coulis speculoos.', 4.455, 10, 1, 'Caffe', 4, 0, '[]', '\"\"', 4.9),
(55, 'Latte Macchiato Amaretto', 'Espresso et mousse de lait surmonté d\'un coulis Amaretto.', 6.273, 10, 1, 'Caffe', 4, 0, '[]', '\"\"', 6.9),
(56, 'Limoncelo Arechio', 'Liqueur de citron de la péninsule de Sorrente. ', 4.083, 20, 1, 'Digestivo', 4, 0, '[]', '\"\"', 4.9),
(57, 'Amaretto Disarronno', 'Liqueur italienne de la région d\'Emilie Romagne.', 4.083, 20, 1, 'Digestivo', 4, 0, '[]', '\"\"', 4.9),
(58, 'EDV Grappa Borgo Antico', 'Eau de vie d\'Italie.', 4.083, 20, 1, 'Digestivo', 4, 0, '[]', '\"\"', 4.9),
(59, 'Peppermint Get 27', 'Liqueur à la menthe.', 4.083, 20, 1, 'Digestivo', 4, 0, '[]', '\"\"', 4.9),
(60, 'BaIlantine’s 4cl', 'Whisky écossais.', 4.917, 20, 1, 'Digestivo', 4, 0, '[]', '\"\"', 5.9),
(61, 'Jack Daniel\'s', 'L’incontournable whisky N°7 de la distillerie Jack Daniel\'s.', 5.75, 20, 1, 'Digestivo', 4, 0, '[]', '\"\"', 6.9),
(62, 'Jack Daniel’s Single Barrel', 'Whisky unique issu d\'un seul fût.', 7.417, 20, 1, 'Digestivo', 4, 0, '[]', '\"\"', 8.9),
(63, 'Lagunitas IPA 6.2° 33cl', 'Belles notes d\'agrumes ainsi qu’une fine touche maltée. La bouche est sèche et herbacée.', 5.75, 20, 1, 'Birra', 4, 0, '[]', 'birra_63_lagunitas.png', 6.9),
(64, 'Vedett Extra White 4.7° 33cl', 'Robe jaune pâle, mousse blanche, agrumes, coriandre, malt, levure, épices', 4.083, 20, 1, 'Birra', 4, 0, '[]', 'birra_64_vedett.png', 4.9),
(65, 'Cuvée des Trolls 7° 25cl', 'Robe blonde paille Fruits, fleurs, agrumes, malt, épices, levure, caramel', 4.917, 20, 1, 'Birra', 4, 0, '[]', 'birra_65_cuvee_trolls.png', 5.9),
(66, 'Adelscott 5.8° 33cl', 'Robe ambrée, malt de whisky, fruits, note fumée Douce, amère, acide', 4.917, 20, 1, 'Birra', 4, 0, '[]', 'birra_66_adelscott.png', 5.9),
(67, 'Mort subite Kriek 4° 37.5cl', 'Bière gourmande, aux notes de cerise fraîche bien mûre, sucrée & acidulée ', 5.75, 20, 1, 'Birra', 4, 0, '[]', 'birra_67_mort_subite.png', 6.9),
(68, 'Maredsous Brune 8° 33cl', 'Robe brune foncée, mousse blanc cassé, caramel, fruits, agrumes, caramel', 4.083, 20, 1, 'Birra', 4, 0, '[]', 'birra_68_maredsous.png', 4.9),
(69, 'Delirium Tremens 8.5 33cl', 'Robe blonde pâle, malt, épices Arrière-goût fort, long, sec-amer', 5.75, 20, 1, 'Birra', 4, 0, '[]', 'birra_69_delirium.png', 6.9),
(70, 'Barbar 8° 33cl', 'Robe blonde profond, mousse onctueuse Miel, épices, agrumes Douce, acide', 4.917, 20, 1, 'Birra', 4, 0, '[]', 'birra_70_barbar.png', 5.9),
(71, 'Judas 8.5° 33cl', 'Ocre, fruité orange/pèche, malt, miel, équilibrée, fine, amertume subtile', 4.917, 20, 1, 'Birra', 4, 0, '[]', 'birra_71_judas.png', 5.9),
(72, 'Chimay Rouge Trappiste 7° 33cl', 'Robe ambrée, mousse épaisse, malt, caramel, abricot, bouche sèche', 4.083, 20, 1, 'Birra', 4, 0, '[]', 'CHIMAY_logo.png', 4.9),
(73, 'Kasteel Rouge 8° 33cl', 'Robe acajou foncé, mousse beige, cerise, réglisse, liqueur, épices Sucrée, alcoolisée', 5.75, 20, 1, 'Birra', 4, 0, '[]', 'birra_73_kasteel_rouge.png', 6.9),
(74, 'Brooklin Lager 5.2° 37.5cl', 'Robe blonde limpide, mousse blanche, fleurs, houblon Légère', 4.917, 20, 1, 'Birra', 4, 0, '[]', 'birra_74_brooklyn.png', 5.9),
(75, 'Hapkin 8.5° 33cl', 'Robe blonde limpide, mousse blanche, fleurs, houblon Légère', 4.917, 20, 1, 'Birra', 4, 0, '[]', 'birra_75_hapkin.png', 5.9),
(76, 'Affligem 6.8° 30cl', 'Robe jaune, légèrement trouble, malt, fruits, douce, fruitée, mielleuse', 4.083, 20, 1, 'Birra', 4, 0, '[]', 'birra_76_affligem.png', 4.9),
(77, 'Maredsous Triple 10° 33cl', 'Robe ambrée, épaisse mousse blanche, malt, caramel, fruits secs, caramel, épices', 5.75, 20, 1, 'Birra', 4, 0, '[]', 'birra_77_maredsous.png', 6.9),
(78, 'Brooklin East IPA 6.9° 35.5cl', 'Arômes houblonnés et maltés, saveurs houblonnées et belle amertume.', 5.75, 20, 1, 'Birra', 4, 0, '[]', 'birra_78_brooklyn-east-india-pale-ale.png', 6.9),
(79, 'Red Stripe 4.7° 33cl', 'Blond très clair, caramel, notes de miel, pétillante, sucrée, amertume agréable', 4.083, 20, 1, 'Birra', 4, 0, '[]', 'birra_79_redstripe.png', 4.9),
(80, 'Mc Chouffe 8° 33cl', 'Robe brune, fine mousse beige, épices, caramel, fruits, malt grillé, caramel, levure', 4.917, 20, 1, 'Birra', 4, 0, '[]', 'birra_80_chouffe.png', 5.9),
(81, 'Desperados 5.9° 33cl', 'Bière aromatisée à la tequila à la fois sucrée et agréablement pétillante en bouche.', 4.083, 20, 1, 'Birra', 4, 0, '[]', 'birra_81_desperados.png', 4.9),
(82, 'Heineken 0% alcool 33cl', 'Bière 0 % d\'alcool au bon goût de houblon', 3.545, 10, 1, 'Birra', 4, 0, '[]', 'birra_82_heineken00.png', 3.9),
(83, 'Margharita', 'Sauce tomate, mozzarella fior di latte, huile d\'olive extra vierge, basilic', 9, 10, 1, 'Pizze', 1, 1, '[\"Blé\"]', 'Pikachu.png', 9.9),
(84, 'Verona', 'Sauce tomate, mozzarella fior di latte, jambon blanc italien, champignons', 9.909, 10, 1, 'Pizze', 1, 1, '[\"Lait\"]', 'Pikachu.png', 10.9),
(85, 'Napoli', 'Sauce tomate, mozzarella fior di latte, anchois marines, persillade, câpres', 9.909, 10, 1, 'Pizze', 1, 0, '[\"Arachide\",\"Lait\",\"Blé\",\"Fruits de mer\"]', 'Pikachu.png', 10.9),
(86, 'Carpaccio', 'Crème, mozzarella fior di latte, tomates fraiches, carpaccio de bœuf huile d\'olive extra vierge, copeaux de parmigiano reggiano, crème balsamique', 10.818, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 11.9),
(87, 'Capra miel', 'Crème, mozzarella fior di latte, tomates fraiches, chèvre, miel', 10.818, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 11.9),
(88, 'Genoa', 'Sauce tomate, crème, mozzarella fior di latte, ravioles de Royan, huile d\'olive extra vierge, copeaux de parmigiano reggiano, basilic', 11.727, 10, 1, 'Pizze', 1, 0, '[\"Oeufs\",\"Lait\",\"Blé\"]', '\"\"', 12.9),
(89, 'Formaggi', 'Sauce tomate, mozzarella fior di latte, gorgonzola, chèvre, ricotta', 11.727, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 12.9),
(90, 'Parmigiana', 'Sauce tomate, mozzarella fior di latte, aubergines grillées, huile d\'olive extra vierge, copeaux de parmigiano reggiano, basilic', 11.727, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 12.9),
(91, 'Diavola', 'Sauce tomate, mozzarella fior di latte, poivrons, spianata piccante, mozzarella di bufala, basilic', 11.727, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 12.9),
(92, 'Végane', 'Sauce tomate, tomates fraiches, poivrons, courgettes, aubergines, origan, roquette, câpres, oignons rouges, huile d\'olive extra vierge, crème balsamique', 11.727, 10, 1, 'Pizze', 1, 1, '[\"Blé\"]', '\"\"', 12.9),
(93, 'Milazzo', 'Sauce tomate, mozzarella fior di latte, viande de bœuf hachée, poivrons, oignons rouges, câpres, copeaux de provolone', 11.727, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 12.9),
(94, 'Stella', 'Tomates fraiches, mozzarella fior di latte, ricotta, roquette, mozzarella di bufala, huile d\'olive extra vierge, crème balsamique', 12.636, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 13.9),
(95, 'Bergamo', 'Crème, mozzarella fior di latte, aiguillettes de poulet rôti, gorgonzola', 12.636, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 13.9),
(96, 'Perrugi', 'Crème, mozzarella fior di latte, saumon fume, ravioles de Royan, huile d\'olive extra vierge, crème balsamique, basilic', 12.636, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\",\"Fruits de mer\"]', '\"\"', 13.9),
(97, 'Fiorella', 'Sauce tomate, mozzarella fior di latte, coppa, pesto, côpeaux de provolone', 12.636, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 13.9),
(98, 'Nonna Luisa', 'Sauce tomate, mozzarella fior di latte, saucisses italiennes, roquette, huile d\'olive extra vierge, copeaux de provolone', 12.636, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 13.9),
(99, 'Forza d’Agro', 'Sauce tomate, mozzarella fior di latte, aubergines, courgettes, jambon blanc italien, roquette, huile d\'olive extra vierge, crème balsamique', 13.545, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 14.9),
(100, 'Siena', 'Sauce tomate, mozzarella fior di latte, crème de cèpes truffée, ravioles de Royan, copeaux de provolone', 13.545, 10, 1, 'Pizze', 1, 0, '[\"Oeufs\",\"Lait\",\"Blé\"]', '\"\"', 14.9),
(101, 'Palermo', 'Sauce tomate, mozzarella fior di latte, roquette, pancetta, tomates cerise, copeaux de provolone, pesto', 13.545, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 14.9),
(102, 'Torino', 'Sauce tomate, mozzarella fior di latte, roquette, mortadelle, mozzarella di bufala, huile d\'olive extra vierge', 13.545, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 14.9),
(103, 'Parma', 'Sauce tomate, mozzarella fior di latte, roquette, jambon cru italien, huile d\'olive extra vierge', 13.545, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 14.9),
(104, 'Udinese', 'Tomates fraiches, mozzarella fior di latte, aubergines grillées, persillade, jambon cru italien, oignons rouges, mozzarella di bufala, huile d\'olive extra vierge, basilic', 13.545, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 14.9),
(105, 'Rimini', 'Crème, mozzarella fior di latte, gorgonzola, champignons, jambon cru italien', 13.545, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 14.9),
(106, 'Agrigento', 'Sauce tomate, mozzarella fior di latte, carpaccio de bœuf, roquette, speck, mozzarella di bufala, pesto, crème balsamique', 14.455, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 15.9),
(107, 'Firenze', 'Crème d\'épinard, ricotta, viande de bœuf hachée, persillade, tomates cerise, pancetta, copeaux de provolone', 14.455, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 15.9),
(108, 'San Marino', 'Crème de courgette, aiguillettes de poulet rôti, ricotta, spianata piccante, roquette, mozzarella di bufala, huile d’olive extra vierge, crème balsamique', 14.455, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 15.9),
(109, 'Catania', 'Crème, mozzarella fior di latte, tomates fraiches, aiguillettes de poulet rôti, spianata piccante, jambon blanc italien, chèvre', 14.455, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 15.9),
(110, 'Rosaria', 'Crème d\'aubergine, mozzarella fior di latte, roquette, jambon cru italien, mortadelle, spianata piccante, burrata, pesto, crème balsamique', 15.364, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 16.9),
(111, 'Corleone', 'Crème de courgette, mozzarella fior di latte, ricotta, tomates fraiches, saumon fumé, roquette, burrata, huile d\'olive extra vierge, crème balsamique', 15.364, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\",\"Fruits de mer\"]', '\"\"', 16.9),
(112, 'Portofino', 'Sauce tomate, mozzarella fior di latte, moules, crevettes, scampis, persillade', 15.364, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\",\"Fruits de mer\"]', '\"\"', 16.9),
(113, 'Roma', 'Tomates fraiches, mozzarella fior di latte, ricotta, roquette, speck, burrata, huile d\'olive extra vierge, crème balsamique', 16.273, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 17.9),
(114, 'Tartuffo', 'Crème de cèpes truffée, mozzarella fior di latte, tomates, fraiche, jambon truffé, burrata, huile d\'olive extra vierge, crème balsamique', 17.182, 10, 1, 'Pizze', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 18.9),
(115, 'Regina', 'Sauce tomate, mozzarella fior di latte, jambon blanc italien, champignons', 12.636, 10, 1, 'Calzoni', 1, 1, '[\"Lait\",\"Blé\"]', '\"\"', 13.9),
(116, 'Milano', 'Sauce tomate, mozzarella fior di latte, aubergines, roquette, huile d\'olive extra vierge, jambon cru italien', 14.455, 10, 1, 'Calzoni', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 15.9),
(117, 'Nanno Sandro', 'Crème d\'épinard, ricotta, tomates fraiches, mozzarella fior di latte, viande de bœuf hachée, saucisses italiennes, roquette, huile d\'olive extra vierge, tomates cerise au pesto', 16.273, 10, 1, 'Calzoni', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 17.9),
(118, 'Zappo', 'Crème, tomates fraiches, mozzarella fior di latte, ricotta, jambon blanc, roquette, mortadelle, burrata, huile d\'olive extra vierge, crème balsamique', 17.182, 10, 1, 'Calzoni', 1, 0, '[\"Lait\",\"Blé\"]', '\"\"', 18.9);

-- --------------------------------------------------------

--
-- Structure de la table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `position` tinyint(1) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `staff`
--

INSERT INTO `staff` (`id`, `name`, `password`, `position`, `state`, `createdAt`, `updatedAt`) VALUES
(38, 'wcs', '$2b$10$VRp/AuoyShBRKHLgf4mb2ujPcBIP691ThxG5UR.CZIWV1tVu76VoG', 1, 1, '2018-06-08 13:16:42', '2018-06-08 13:16:42');

-- --------------------------------------------------------

--
-- Structure de la table `timing`
--

CREATE TABLE `timing` (
  `id` int(11) NOT NULL,
  `day` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lunch_start_time` time NOT NULL,
  `lunch_end_time` time NOT NULL,
  `shift_lunch` tinyint(1) NOT NULL,
  `dinner_start_time` time NOT NULL,
  `dinner_end_time` time NOT NULL,
  `shift_dinner` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `timing`
--

INSERT INTO `timing` (`id`, `day`, `lunch_start_time`, `lunch_end_time`, `shift_lunch`, `dinner_start_time`, `dinner_end_time`, `shift_dinner`) VALUES
(1, 'Lundi', '12:00:00', '14:00:00', 1, '17:45:00', '23:40:00', 1),
(2, 'Mardi', '12:00:00', '16:00:00', 0, '21:00:00', '23:30:00', 1),
(3, 'Mercredi', '12:00:00', '16:00:00', 1, '19:00:00', '21:00:00', 1),
(5, 'Jeudi', '12:00:00', '14:00:00', 1, '19:00:00', '23:00:00', 1),
(12, 'Vendredi', '12:00:00', '14:00:00', 1, '19:00:00', '23:00:00', 1),
(13, 'Samedi', '12:00:00', '14:00:00', 1, '19:00:00', '23:00:00', 0),
(14, 'Dimanche', '12:00:00', '14:00:00', 1, '19:00:00', '23:00:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `timing_exception`
--

CREATE TABLE `timing_exception` (
  `id` int(11) NOT NULL,
  `start_day` date NOT NULL,
  `end_day` date NOT NULL,
  `shift_lunch` tinyint(1) NOT NULL,
  `shift_dinner` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `points` int(11) NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` tinyint(1) NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customerId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `subscription` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `points`, `password`, `createdAt`, `state`, `updatedAt`, `customerId`, `token`, `subscription`) VALUES
(141, 'Anthony', 'anthony.troupenat@gmail.com', '0757898798', 16, '$2b$10$TB6xie3e4hUtClKQTVhfiekSseQ3mGOj4RQs1RawtLz0j2U/WrBFW', '2018-07-25 14:49:13', 1, '2018-07-26 09:17:40', 'cus_DINA7SJw6skvnp', 'aCvjdoafDMo15Xdlco089cWmXnrMGdbbLfvzhHgS2TLKYqvLEA', 1),
(142, 'romain', 'romain.denamur@gmail.com', '0612345678', 6, '$2b$10$60dBZd.JAOF7jBeWzi.sm.zkjo7r9zA6oAqAaeVRW1d.svUL1iko.', '2018-07-25 14:49:18', 1, '2018-07-25 16:42:16', 'cus_DINA3eFGKS3ltz', 'x6RHvwOLizORlpYXSFUzexSOQcKEnQgS5ich2Uc2LILXxEP1dp', 1),
(143, 'Minette', 'Minette66@wanadoo.fr', '0654349865', 2, '$2b$10$lYO1cJ7mH.qfUY49Smpd9.AMpnP4BJRuLcb6yWfDGjKKtUZ.XTAW.', '2018-07-25 14:50:35', 1, '2018-07-25 17:43:34', 'cus_DINCTMcetByeht', 'z3DQMfjkPDs1vMEOqsmV27LtmKvf134t8E4bkAhhLEFBRSAoq3', 1),
(144, 'Julien FOUCHER', 'blomki@gmail.com', '0669362071', 33, '$2b$10$ViqL.qdw99BDbxtWry71C.SAlMZIspMt4Rh31wk0UmhecLZBltrda', '2018-07-25 17:47:30', 1, '2018-07-26 11:19:11', 'cus_DIQ3wj5rHH5ob7', 'WmjgD45Azpc8VsVNDUGIya0U8H4fj3PuY8pWHmVTWvQB66zOHX', 1),
(145, 'jflkjslkdjsqjd', 'mmemail@gmail.com', '0756341278', 0, '$2b$10$cA/oO/dj5.zMkbU8JR6sveX1aGUt4CQoCwx6EHvwth4QJIuqc3kba', '2018-07-25 17:53:47', 1, '2018-07-25 17:53:48', 'cus_DIQ9bMw9I33pvY', 'YpJwAvPbI3npYUGJMOQLGQmbWTNH2syT4QsCO7VVtBObLjWaTf', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `allergens`
--
ALTER TABLE `allergens`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `associateProduct`
--
ALTER TABLE `associateProduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `associate_product_id` (`associate_product_id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `order_delay`
--
ALTER TABLE `order_delay`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `order_products`
--
ALTER TABLE `order_products`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `timing`
--
ALTER TABLE `timing`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `timing_exception`
--
ALTER TABLE `timing_exception`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `allergens`
--
ALTER TABLE `allergens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `associateProduct`
--
ALTER TABLE `associateProduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT pour la table `order_delay`
--
ALTER TABLE `order_delay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT pour la table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `timing`
--
ALTER TABLE `timing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `timing_exception`
--
ALTER TABLE `timing_exception`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `associateProduct`
--
ALTER TABLE `associateProduct`
  ADD CONSTRAINT `associate_product2_relation` FOREIGN KEY (`associate_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `associate_product_relation` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `users_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `orders_relation` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_relation` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
