-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 29, 2020 at 10:05 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `startup_coffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_created_at`) VALUES
(1, 'coffee', '2020-12-12 03:00:34'),
(2, 'non-coffee', '2020-12-13 15:05:53'),
(3, 'foods', '2020-12-12 03:01:53'),
(4, 'add-on', '2020-12-13 15:10:49'),
(5, 'favorite', '2020-12-13 14:35:39');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `coupon_id` int(11) NOT NULL,
  `coupon_code` varchar(100) NOT NULL,
  `coupon_discount` int(5) NOT NULL,
  `coupon_start_date` date NOT NULL,
  `coupon_end_date` date NOT NULL,
  `coupon_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `coupon_updated_at` timestamp NULL DEFAULT NULL,
  `coupon_deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`coupon_id`, `coupon_code`, `coupon_discount`, `coupon_start_date`, `coupon_end_date`, `coupon_created_at`, `coupon_updated_at`, `coupon_deleted_at`) VALUES
(3, 'SNDX', 15, '2020-12-08', '2020-12-30', '2020-12-13 07:13:02', '2020-12-13 07:35:55', NULL),
(5, 'STUP', 15, '2020-12-29', '2020-12-30', '2020-12-25 05:11:31', '2020-12-25 05:20:08', NULL),
(6, 'kucingliar', 45, '2020-12-10', '2020-12-26', '2020-12-25 05:12:54', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `delivery_id` int(11) NOT NULL,
  `delivery_home` tinyint(1) DEFAULT NULL,
  `delivery_dine_in` tinyint(1) DEFAULT NULL,
  `delivery_take_away` tinyint(1) DEFAULT NULL,
  `delivery_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `delivery_updated_at` timestamp NULL DEFAULT NULL,
  `delivery_deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`delivery_id`, `delivery_home`, `delivery_dine_in`, `delivery_take_away`, `delivery_created_at`, `delivery_updated_at`, `delivery_deleted_at`) VALUES
(1, 1, 1, 1, '2020-12-13 14:41:28', NULL, NULL),
(2, 0, 1, 0, '2020-12-13 14:44:12', NULL, NULL),
(3, 0, 1, 1, '2020-12-13 14:45:42', NULL, NULL),
(4, 0, 1, 1, '2020-12-13 14:47:05', NULL, NULL),
(5, 0, 1, 1, '2020-12-13 14:47:21', NULL, NULL),
(6, 0, 1, 1, '2020-12-13 14:48:26', NULL, NULL),
(7, 0, 1, 1, '2020-12-13 14:48:56', NULL, NULL),
(8, 0, 1, 1, '2020-12-13 14:49:43', NULL, NULL),
(9, 0, 1, 1, '2020-12-13 14:50:33', NULL, NULL),
(10, 0, 1, 1, '2020-12-13 14:50:46', NULL, NULL),
(11, 1, 1, 1, '2020-12-13 15:02:06', NULL, NULL),
(12, 0, 1, 1, '2020-12-13 19:19:44', NULL, NULL),
(13, 1, 1, 1, '2020-12-14 04:26:55', NULL, NULL),
(14, 0, 0, 1, '2020-12-16 04:25:40', NULL, NULL),
(15, 1, 1, 1, '2020-12-16 04:39:15', NULL, NULL),
(16, 1, 1, 1, '2020-12-16 04:50:15', NULL, NULL),
(17, 1, 1, 1, '2020-12-17 15:44:38', NULL, NULL),
(18, 1, 1, 1, '2020-12-17 15:44:49', NULL, NULL),
(19, 1, 1, 1, '2020-12-17 15:44:55', NULL, NULL),
(20, 1, 1, 1, '2020-12-17 15:45:12', NULL, NULL),
(21, 1, 1, 1, '2020-12-17 15:45:18', NULL, NULL),
(22, 1, 1, 1, '2020-12-17 15:45:28', NULL, NULL),
(23, 1, 1, 1, '2020-12-17 15:45:38', NULL, NULL),
(24, 0, 0, 0, '2020-12-20 09:48:11', NULL, NULL),
(25, 0, 0, 0, '2020-12-20 09:50:45', NULL, NULL),
(26, 0, 0, 0, '2020-12-20 09:51:26', NULL, NULL),
(27, 0, 0, 0, '2020-12-20 09:52:23', NULL, NULL),
(28, 0, 0, 0, '2020-12-20 09:52:58', NULL, NULL),
(29, 0, 0, 0, '2020-12-20 09:53:11', NULL, NULL),
(30, 0, 0, 0, '2020-12-20 09:53:34', NULL, NULL),
(31, 0, 0, 0, '2020-12-20 09:56:41', NULL, NULL),
(32, 0, 0, 0, '2020-12-20 09:58:53', NULL, NULL),
(33, 0, 0, 0, '2020-12-20 10:00:11', NULL, NULL),
(34, 0, 0, 0, '2020-12-20 10:02:23', NULL, NULL),
(35, 0, 0, 0, '2020-12-20 10:02:48', NULL, NULL),
(36, 0, 0, 0, '2020-12-20 10:05:38', NULL, NULL),
(37, 1, 1, 1, '2020-12-20 10:12:54', NULL, NULL),
(38, 1, 1, 1, '2020-12-20 10:17:57', NULL, NULL),
(39, 1, 1, 1, '2020-12-20 10:20:06', NULL, NULL),
(40, 1, 1, 1, '2020-12-20 10:21:45', NULL, NULL),
(41, 1, 1, 1, '2020-12-20 10:43:58', NULL, NULL),
(42, 1, 1, 1, '2020-12-20 10:45:02', NULL, NULL),
(43, 0, 0, 0, '2020-12-20 13:59:24', NULL, NULL),
(44, 1, 1, 1, '2020-12-20 14:00:49', NULL, NULL),
(45, 1, 1, 1, '2020-12-20 19:55:28', NULL, NULL),
(46, 1, 1, 1, '2020-12-20 19:55:52', NULL, NULL),
(47, 1, 1, 1, '2020-12-20 19:56:16', NULL, NULL),
(48, 1, 1, 1, '2020-12-20 19:56:36', NULL, NULL),
(49, 1, 1, 1, '2020-12-20 19:56:50', NULL, NULL),
(50, 1, 1, 1, '2020-12-21 02:57:48', NULL, NULL),
(51, 1, 1, 1, '2020-12-21 06:11:52', NULL, NULL),
(52, NULL, NULL, NULL, '2020-12-23 03:17:46', NULL, NULL),
(53, 1, 1, 1, '2020-12-23 03:19:11', NULL, NULL),
(54, 1, 1, 1, '2020-12-23 03:23:56', NULL, NULL),
(55, 1, 1, 1, '2020-12-23 03:27:29', NULL, NULL),
(56, 1, 1, 1, '2020-12-23 03:27:53', NULL, NULL),
(57, 1, 1, 1, '2020-12-23 03:40:11', NULL, NULL),
(58, 1, 1, 1, '2020-12-23 03:59:04', NULL, NULL),
(59, 1, 1, 1, '2020-12-23 04:00:41', NULL, NULL),
(60, 1, 1, 1, '2020-12-23 04:04:13', NULL, NULL),
(61, 1, 1, 1, '2020-12-23 04:04:57', NULL, NULL),
(62, 1, 1, 1, '2020-12-23 04:07:51', NULL, NULL),
(63, 1, 1, 1, '2020-12-24 03:17:11', NULL, NULL),
(64, 1, 1, 1, '2020-12-24 03:22:48', NULL, NULL),
(65, 1, 1, 1, '2020-12-24 03:23:27', NULL, NULL),
(66, 1, 1, 1, '2020-12-24 03:26:52', NULL, NULL),
(67, 1, 1, 1, '2020-12-24 03:27:29', NULL, NULL),
(68, 1, 1, 1, '2020-12-24 03:27:51', NULL, NULL),
(69, 1, 1, 1, '2020-12-24 03:28:36', NULL, NULL),
(70, 1, 1, 1, '2020-12-24 03:28:51', NULL, NULL),
(71, 1, 1, 1, '2020-12-24 03:29:59', NULL, NULL),
(72, 1, 1, 1, '2020-12-24 03:30:10', NULL, NULL),
(73, 1, 1, 1, '2020-12-24 03:42:16', NULL, NULL),
(74, 1, 1, 1, '2020-12-24 03:42:52', NULL, NULL),
(75, 1, 1, 1, '2020-12-24 03:51:48', NULL, NULL),
(76, 1, 1, 1, '2020-12-24 03:56:21', NULL, NULL),
(77, 1, 1, 1, '2020-12-24 03:57:17', NULL, NULL),
(78, 1, 1, 1, '2020-12-24 03:57:36', NULL, NULL),
(79, 1, 1, 1, '2020-12-24 03:58:00', NULL, NULL),
(80, 1, 1, 1, '2020-12-24 04:02:33', NULL, NULL),
(81, 1, 1, 1, '2020-12-24 04:03:34', NULL, NULL),
(82, 1, 1, 1, '2020-12-24 04:08:30', NULL, NULL),
(83, 1, 1, 1, '2020-12-24 04:10:08', NULL, NULL),
(84, 1, 1, 1, '2020-12-24 04:23:44', NULL, NULL),
(85, 1, 1, 1, '2020-12-24 06:01:55', NULL, NULL),
(86, 1, 1, 1, '2020-12-24 06:03:44', NULL, NULL),
(87, 1, 1, 1, '2020-12-25 06:29:30', NULL, NULL),
(88, 1, 1, 1, '2020-12-26 11:30:07', NULL, NULL),
(89, 1, 1, 1, '2020-12-27 05:27:45', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_invoice` varchar(20) NOT NULL,
  `order_payment_method` varchar(50) NOT NULL,
  `order_total` int(11) NOT NULL,
  `order_status` tinyint(1) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_invoice`, `order_payment_method`, `order_total`, `order_status`, `customer_id`, `order_created_at`, `order_deleted_at`) VALUES
(10, '4086423004', 'cash', 637500, 0, 1, '2020-12-20 15:27:16', NULL),
(13, '3718498258', 'cash', 750000, 0, 1, '2020-12-28 20:28:07', NULL),
(14, '7588634179', 'cash', 750000, 0, 1, '2020-12-20 20:29:21', NULL),
(15, '5809489119', 'cash', 750000, 0, 1, '2020-12-20 20:29:56', NULL),
(17, '6882658153', 'cash', 150000, 0, 1, '2020-12-28 04:32:08', NULL),
(18, '8091815624', 'cash', 150000, 0, 1, '2020-12-28 04:43:00', NULL),
(19, '6944705722', 'Bank', 70000, 0, 2, '2020-12-26 17:59:15', NULL),
(20, '2021595029', 'Card', 105000, 0, 2, '2020-12-26 17:59:19', NULL),
(21, '7126306289', 'Card', 105000, 1, 2, '2020-12-26 17:59:24', NULL),
(22, '5362375433', 'bank bank', 496000, 1, 2, '2021-12-25 16:15:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_detail_delivery` varchar(100) NOT NULL,
  `order_detail_size` varchar(100) NOT NULL,
  `order_detail_qty` int(11) NOT NULL,
  `order_detail_price` int(11) NOT NULL,
  `order_detail_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_detail_deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`order_detail_id`, `order_id`, `product_id`, `order_detail_delivery`, `order_detail_size`, `order_detail_qty`, `order_detail_price`, `order_detail_created_at`, `order_detail_deleted_at`) VALUES
(19, 10, 17, 'dine in', '500 gr', 1, 590750, '2020-12-20 15:27:16', NULL),
(31, 13, 90, 'dine in', 'Regular', 5, 65000, '2020-12-20 20:28:07', NULL),
(32, 13, 89, 'dine in', 'Large', 12, 142000, '2020-12-20 20:28:07', NULL),
(33, 13, 87, 'dine in', 'Large', 7, 327000, '2020-12-20 20:28:07', NULL),
(34, 13, 78, 'dine in', '500 gr', 7, 642000, '2020-12-20 20:28:07', NULL),
(35, 14, 76, 'dine in', 'Regular', 2, 78000, '2020-12-20 20:29:21', NULL),
(36, 14, 75, 'dine in', 'Large', 3, 152000, '2020-12-20 20:29:21', NULL),
(39, 15, 73, 'dine in', 'Regular', 2, 78000, '2020-12-20 20:29:57', NULL),
(40, 15, 72, 'dine in', 'Large', 3, 152000, '2020-12-20 20:29:57', NULL),
(41, 15, 71, 'dine in', 'Large', 4, 377000, '2020-12-20 20:29:57', NULL),
(45, 17, 5, 'dine in', '500 gr', 1, 105000, '2020-12-26 04:32:08', NULL),
(46, 17, 6, 'dine in', '500 gr', 1, 45000, '2020-12-26 04:32:09', NULL),
(47, 18, 5, 'dine in', '500 gr', 1, 105000, '2020-12-26 04:43:00', NULL),
(48, 18, 6, 'dine in', '500 gr', 1, 45000, '2020-12-26 04:43:00', NULL),
(49, 19, 74, 'Dine In', '300gr', 2, 70000, '2020-12-27 07:04:57', NULL),
(50, 20, 74, 'Dine In', '300gr', 2, 70000, '2020-12-27 07:07:44', NULL),
(51, 20, 32, 'Pick Up', 'Large', 1, 35000, '2020-12-27 07:07:45', NULL),
(52, 21, 74, 'Dine In', '300gr', 2, 70000, '2020-12-27 07:23:37', NULL),
(53, 21, 32, 'Pick Up', 'Large', 1, 35000, '2020-12-27 07:23:37', NULL),
(54, 22, 17, 'dine in', '500 gr', 1, 105000, '2020-12-28 16:15:50', NULL),
(55, 22, 18, 'dine in', '500 gr', 1, 45000, '2020-12-28 16:15:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_pic` varchar(255) DEFAULT NULL,
  `product_desc` text NOT NULL,
  `product_start_hour` time NOT NULL,
  `product_end_hour` time NOT NULL,
  `product_qty` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `delivery_id` int(11) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `product_deleted_at` timestamp NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_pic`, `product_desc`, `product_start_hour`, `product_end_hour`, `product_qty`, `category_id`, `size_id`, `delivery_id`, `product_created_at`, `product_updated_at`, `product_deleted_at`) VALUES
(5, 'Banana', 5000, NULL, 'enak', '20:00:00', '22:00:00', 50, 4, 5, 5, '2020-12-20 20:16:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Jus Mengkudu', 178000, NULL, 'mantap', '08:00:00', '22:00:00', 50, 2, 8, 8, '2020-12-13 06:49:43', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'Kopi hitam', 35000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 17, 17, '2020-12-17 07:44:39', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Kopi merah', 35000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 18, 18, '2020-12-17 07:44:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'Kopi ungu', 35000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 19, 19, '2020-12-17 07:44:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'Kopi biru', 35000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 20, 20, '2020-12-17 07:45:12', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 'Americano', 35000, NULL, 'kopi mantap', '19:00:00', '22:00:00', 1, 1, 39, 38, '2020-12-20 02:17:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 'Vanilla Milk Shake', 45000, NULL, 'minuman segar', '10:00:00', '20:00:00', 2, 2, 40, 39, '2020-12-20 02:20:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 'Nasi padang', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 'Hot Tea', 35000, NULL, 'minuman segar', '10:00:00', '18:00:00', 150, 2, 45, 44, '2020-12-20 06:00:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, 'Espresso', 35000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 46, 45, '2020-12-20 11:55:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, 'Macchiato', 55000, NULL, 'kopi enak', '08:00:00', '22:00:00', 50, 1, 47, 46, '2020-12-20 11:55:52', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, 'Latte', 10000, NULL, 'kopi segar', '08:00:00', '22:00:00', 50, 1, 48, 47, '2020-12-20 11:56:16', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 'Cappucino', 18000, NULL, 'kopi segar', '08:00:00', '22:00:00', 50, 1, 49, 48, '2020-12-20 11:56:37', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, 'Mocha', 28000, NULL, 'kopi segar', '08:00:00', '22:00:00', 50, 1, 50, 49, '2020-12-20 11:56:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 'Affogato', 315000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 17, 17, '2020-12-17 07:44:39', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 'Kopi Tubruk', 35000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 18, 18, '2020-12-17 07:44:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, 'Caramel Latte', 23000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 19, 19, '2020-12-17 07:44:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(41, 'Vanilla Latte', 5000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 20, 20, '2020-12-17 07:45:12', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, 'Hazelnut Latte', 89000, NULL, 'kopi mantap', '19:00:00', '22:00:00', 1, 1, 39, 38, '2020-12-20 02:17:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(43, 'Avocado Coffee', 35000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 1, 46, 45, '2020-12-20 11:55:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(44, 'Caramel Latte', 55000, NULL, 'kopi enak', '08:00:00', '22:00:00', 50, 1, 47, 46, '2020-12-20 11:55:52', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(45, 'Moccacino', 10000, NULL, 'kopi segar', '08:00:00', '22:00:00', 50, 1, 48, 47, '2020-12-20 20:25:12', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(46, 'Caramel Machiatto', 18000, NULL, 'kopi segar', '08:00:00', '22:00:00', 50, 1, 49, 48, '2020-12-20 11:56:37', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(47, 'Cold Brew', 28000, NULL, 'kopi segar', '08:00:00', '22:00:00', 50, 1, 50, 49, '2020-12-20 11:56:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(48, 'Vanilla Milkshake', 135000, NULL, 'minuman dingin enak', '08:30:00', '24:00:00', 3500, 2, 4, 4, '2020-12-13 15:04:44', '2020-12-13 07:04:44', '0000-00-00 00:00:00'),
(49, 'Chocolatte Milkshake', 178000, NULL, 'mantap', '08:00:00', '22:00:00', 50, 2, 8, 8, '2020-12-13 06:49:43', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(50, 'Banana Milkshake', 45000, NULL, 'minuman segar', '10:00:00', '20:00:00', 2, 2, 40, 39, '2020-12-20 02:20:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(51, 'Strawberry Milkshake', 35000, NULL, 'minuman segar', '10:00:00', '18:00:00', 150, 2, 45, 44, '2020-12-20 06:00:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(52, 'Tea', 178000, NULL, 'mantap', '08:00:00', '22:00:00', 50, 2, 8, 8, '2020-12-13 06:49:43', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(53, 'Lychee Tea', 45000, NULL, 'minuman segar', '10:00:00', '20:00:00', 2, 2, 40, 39, '2020-12-20 02:20:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(54, 'Lemon Tea', 35000, NULL, 'minuman segar', '10:00:00', '18:00:00', 150, 2, 45, 44, '2020-12-20 06:00:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(55, 'Green Tea', 135000, NULL, 'minuman dingin enak', '08:30:00', '24:00:00', 3500, 2, 4, 4, '2020-12-13 15:04:44', '2020-12-13 07:04:44', '0000-00-00 00:00:00'),
(56, 'Thai Tea', 45000, NULL, 'minuman segar', '10:00:00', '20:00:00', 2, 2, 40, 39, '2020-12-20 02:20:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(57, 'Teh Tarik', 35000, NULL, 'minuman segar', '10:00:00', '18:00:00', 150, 2, 45, 44, '2020-12-20 06:00:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(58, 'Teh Poci', 135000, NULL, 'minuman dingin enak', '08:30:00', '24:00:00', 3500, 2, 4, 4, '2020-12-13 15:04:44', '2020-12-13 07:04:44', '0000-00-00 00:00:00'),
(59, 'Chicken Muffin', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(60, 'Egg Muffin', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(61, 'Sausage Muffin', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(62, 'Spicy Chicken', 78000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(63, 'Double cheese burger', 90000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 20:23:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(64, 'Triple cheese burger ', 445000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 20:23:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(65, 'Fire Wings', 48000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(66, 'Nasi padang', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(67, 'Chicken Muffin', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(68, 'Egg Muffin', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(69, 'Sausage Muffin', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(70, 'Spicy Chicken', 78000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 3, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(71, 'Lychee', 67000, NULL, 'enak', '20:00:00', '22:00:00', 50, 4, 5, 5, '2020-12-20 20:16:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(72, 'Stawberry', 346000, NULL, 'enak', '20:00:00', '22:00:00', 50, 4, 5, 5, '2020-12-20 20:16:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(73, 'Blueberry', 95000, NULL, 'enak', '20:00:00', '22:00:00', 50, 4, 5, 5, '2020-12-20 20:16:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(74, 'Chicken Muffin', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 5, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(75, 'Egg Muffin', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 5, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(76, 'Spicy Chicken', 78000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 5, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(77, 'Double cheese burger', 90000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 5, 41, 40, '2020-12-20 20:23:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(78, 'Triple cheese burger ', 445000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 5, 41, 40, '2020-12-20 20:23:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(79, 'Chicken Muffin', 35000, NULL, 'makanan enak', '13:00:00', '19:00:00', 3, 5, 41, 40, '2020-12-20 02:21:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(80, 'Vanilla Milk Shake', 45000, NULL, 'minuman segar', '10:00:00', '20:00:00', 2, 5, 40, 39, '2020-12-20 02:20:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(81, 'Hot Tea', 35000, NULL, 'minuman segar', '10:00:00', '18:00:00', 150, 5, 45, 44, '2020-12-20 06:00:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(82, 'Kopi Tubruk', 35000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 5, 18, 18, '2020-12-17 07:44:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(83, 'Caramel Latte', 23000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 5, 19, 19, '2020-12-17 07:44:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, 'Vanilla Latte', 5000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 5, 20, 20, '2020-12-17 07:45:12', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, 'Hazelnut Latte', 89000, NULL, 'kopi mantap', '19:00:00', '22:00:00', 1, 5, 39, 38, '2020-12-20 02:17:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(86, 'Avocado Coffee', 35000, NULL, 'kopi enak mantap', '08:00:00', '22:00:00', 50, 5, 46, 45, '2020-12-20 11:55:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(87, 'Caramel Latte', 55000, NULL, 'kopi enak', '08:00:00', '22:00:00', 50, 5, 47, 46, '2020-12-20 11:55:52', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(88, 'Moccacino', 10000, NULL, 'kopi segar', '08:00:00', '22:00:00', 50, 5, 48, 47, '2020-12-20 20:25:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(89, 'Caramel Machiatto', 18000, NULL, 'kopi segar', '08:00:00', '22:00:00', 50, 5, 49, 48, '2020-12-20 11:56:37', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 'Cold Brew', 28000, NULL, 'kopi segar', '08:00:00', '22:00:00', 50, 5, 50, 49, '2020-12-20 11:56:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(93, 'abraham', 15000, '2020-12-24T03-17-11.108Znodejs.png', 'gambar', '08:00:00', '12:00:00', 1, 1, 64, 63, '2020-12-23 19:17:11', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(96, 'abraham', 15000, '2020-12-25T06-29-30.006Zpopular1.jpg', 'gambar', '08:00:00', '12:00:00', 1, 1, 88, 87, '2020-12-24 22:29:30', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(97, 'abraham', 15000, '2020-12-26T11-30-07.260Zpopular1.jpg', 'gambar', '08:00:00', '12:00:00', 1, 1, 89, 88, '2020-12-26 03:30:07', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(98, 'nama', 1000, '', '15000', '11:00:00', '14:00:00', 150, 0, 90, 89, '2020-12-26 21:27:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `size_id` int(11) NOT NULL,
  `size_regular` tinyint(1) DEFAULT NULL,
  `size_large` tinyint(1) DEFAULT NULL,
  `size_extra_large` tinyint(1) DEFAULT NULL,
  `size_250gr` tinyint(1) DEFAULT NULL,
  `size_300gr` tinyint(1) DEFAULT NULL,
  `size_500gr` tinyint(1) DEFAULT NULL,
  `size_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `size_updated_at` timestamp NULL DEFAULT NULL,
  `size_deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`size_id`, `size_regular`, `size_large`, `size_extra_large`, `size_250gr`, `size_300gr`, `size_500gr`, `size_created_at`, `size_updated_at`, `size_deleted_at`) VALUES
(1, 0, 0, 0, 1, 1, 1, '2020-12-13 14:41:28', NULL, NULL),
(2, 0, 0, 1, 0, 0, 0, '2020-12-13 14:44:12', NULL, NULL),
(3, 1, 1, 1, 0, 0, 0, '2020-12-13 14:45:42', NULL, NULL),
(4, 0, 1, 1, 1, 0, 0, '2020-12-13 14:47:05', NULL, NULL),
(5, 1, 1, 1, 0, 0, 0, '2020-12-13 14:47:21', NULL, NULL),
(6, 0, 0, 0, 1, 1, 1, '2020-12-13 14:48:26', NULL, NULL),
(7, 0, 0, 0, 1, 1, 1, '2020-12-13 14:48:56', NULL, NULL),
(8, 0, 0, 0, 1, 1, 1, '2020-12-13 14:49:43', NULL, NULL),
(9, 1, 1, 1, 0, 0, 0, '2020-12-13 14:50:33', NULL, NULL),
(10, 1, 1, 1, 0, 0, 0, '2020-12-13 14:50:46', NULL, NULL),
(11, 1, 1, 1, 0, 0, 0, '2020-12-13 15:02:05', NULL, NULL),
(12, 1, 1, 1, 0, 0, 0, '2020-12-13 19:19:44', NULL, NULL),
(13, 1, 1, 1, 0, 0, 0, '2020-12-14 04:26:55', NULL, NULL),
(14, 1, 1, 1, 0, 0, 0, '2020-12-16 04:25:40', NULL, NULL),
(15, 1, 1, 1, 1, 1, 1, '2020-12-16 04:39:15', NULL, NULL),
(16, 1, 1, 1, 1, 1, 1, '2020-12-16 04:50:14', NULL, NULL),
(17, 0, 0, 0, 0, 0, 0, '2020-12-17 15:44:38', NULL, NULL),
(18, 1, 1, 1, 0, 0, 0, '2020-12-17 15:44:49', NULL, NULL),
(19, 1, 1, 1, 0, 0, 0, '2020-12-17 15:44:55', NULL, NULL),
(20, 1, 1, 1, 0, 0, 0, '2020-12-17 15:45:12', NULL, NULL),
(21, 1, 1, 1, 0, 0, 0, '2020-12-17 15:45:18', NULL, NULL),
(22, 1, 1, 1, 0, 0, 0, '2020-12-17 15:45:28', NULL, NULL),
(23, 1, 1, 1, 0, 0, 0, '2020-12-17 15:45:37', NULL, NULL),
(24, 1, 0, 1, 0, 0, 0, '2020-12-20 09:44:03', NULL, NULL),
(25, 1, 0, 1, 1, 1, 1, '2020-12-20 09:48:11', NULL, NULL),
(26, 0, 0, 0, 0, 0, 0, '2020-12-20 09:50:45', NULL, NULL),
(27, 1, 0, 1, 1, 1, 1, '2020-12-20 09:51:26', NULL, NULL),
(28, 0, 1, 1, 1, 1, 1, '2020-12-20 09:52:22', NULL, NULL),
(29, 0, 1, 1, 1, 1, 1, '2020-12-20 09:52:58', NULL, NULL),
(30, 1, 1, 1, 1, 1, 1, '2020-12-20 09:53:11', NULL, NULL),
(31, 1, 1, 1, 1, 1, 1, '2020-12-20 09:53:34', NULL, NULL),
(32, 1, 0, 1, 1, 1, 1, '2020-12-20 09:56:41', NULL, NULL),
(33, 1, 0, 1, 1, 1, 1, '2020-12-20 09:58:53', NULL, NULL),
(34, 1, 0, 1, 1, 1, 1, '2020-12-20 10:00:11', NULL, NULL),
(35, 1, 0, 1, 1, 1, 1, '2020-12-20 10:02:23', NULL, NULL),
(36, 1, 1, 1, 1, 1, 1, '2020-12-20 10:02:47', NULL, NULL),
(37, 1, 0, 1, 1, 1, 1, '2020-12-20 10:05:37', NULL, NULL),
(38, 1, 0, 1, 1, 1, 1, '2020-12-20 10:12:53', NULL, NULL),
(39, 1, 0, 1, 1, 1, 1, '2020-12-20 10:17:57', NULL, NULL),
(40, 1, 0, 1, 1, 1, 1, '2020-12-20 10:20:06', NULL, NULL),
(41, 0, 0, 0, 1, 1, 1, '2020-12-20 10:21:45', NULL, NULL),
(42, 1, 0, 1, 1, 1, 1, '2020-12-20 10:43:58', NULL, NULL),
(43, 1, 0, 1, 1, 1, 1, '2020-12-20 10:45:02', NULL, NULL),
(44, 1, 0, 1, 0, 0, 0, '2020-12-20 13:59:24', NULL, NULL),
(45, 1, 1, 1, 0, 0, 0, '2020-12-20 14:00:49', NULL, NULL),
(46, 1, 1, 1, 0, 0, 0, '2020-12-20 19:55:27', NULL, NULL),
(47, 1, 1, 1, 0, 0, 0, '2020-12-20 19:55:52', NULL, NULL),
(48, 1, 1, 1, 0, 0, 0, '2020-12-20 19:56:16', NULL, NULL),
(49, 1, 1, 1, 0, 0, 0, '2020-12-20 19:56:36', NULL, NULL),
(50, 1, 1, 1, 0, 0, 0, '2020-12-20 19:56:49', NULL, NULL),
(51, 1, 1, 1, 0, 0, 0, '2020-12-21 02:57:47', NULL, NULL),
(52, 1, 1, 1, 0, 0, 0, '2020-12-21 06:11:52', NULL, NULL),
(53, NULL, NULL, NULL, NULL, NULL, NULL, '2020-12-23 03:17:46', NULL, NULL),
(54, 1, 1, 1, 0, 0, 0, '2020-12-23 03:19:11', NULL, NULL),
(55, 1, 1, 1, 0, 0, 0, '2020-12-23 03:23:55', NULL, NULL),
(56, 1, 1, 1, 0, 0, 0, '2020-12-23 03:27:29', NULL, NULL),
(57, 1, 1, 1, 0, 0, 0, '2020-12-23 03:27:53', NULL, NULL),
(58, 1, 1, 1, 0, 0, 0, '2020-12-23 03:40:11', NULL, NULL),
(59, 1, 1, 1, 0, 0, 0, '2020-12-23 03:59:04', NULL, NULL),
(60, 1, 1, 1, 0, 0, 0, '2020-12-23 04:00:41', NULL, NULL),
(61, 1, 1, 1, 0, 0, 0, '2020-12-23 04:04:12', NULL, NULL),
(62, 1, 1, 1, 0, 0, 0, '2020-12-23 04:04:57', NULL, NULL),
(63, 1, 1, 1, 0, 0, 0, '2020-12-23 04:07:51', NULL, NULL),
(64, 1, 1, 1, 0, 0, 0, '2020-12-24 03:17:11', NULL, NULL),
(65, 1, 1, 1, 0, 0, 0, '2020-12-24 03:22:47', NULL, NULL),
(66, 1, 1, 1, 0, 0, 0, '2020-12-24 03:23:27', NULL, NULL),
(67, 1, 1, 1, 0, 0, 0, '2020-12-24 03:26:52', NULL, NULL),
(68, 1, 1, 1, 0, 0, 0, '2020-12-24 03:27:29', NULL, NULL),
(69, 1, 1, 1, 0, 0, 0, '2020-12-24 03:27:50', NULL, NULL),
(70, 1, 1, 1, 0, 0, 0, '2020-12-24 03:28:36', NULL, NULL),
(71, 1, 1, 1, 0, 0, 0, '2020-12-24 03:28:51', NULL, NULL),
(72, 1, 1, 1, 0, 0, 0, '2020-12-24 03:29:59', NULL, NULL),
(73, 1, 1, 1, 0, 0, 0, '2020-12-24 03:30:09', NULL, NULL),
(74, 1, 1, 1, 0, 0, 0, '2020-12-24 03:42:16', NULL, NULL),
(75, 1, 1, 1, 0, 0, 0, '2020-12-24 03:42:52', NULL, NULL),
(76, 1, 1, 1, 0, 0, 0, '2020-12-24 03:51:48', NULL, NULL),
(77, 1, 1, 1, 0, 0, 0, '2020-12-24 03:56:20', NULL, NULL),
(78, 1, 1, 1, 0, 0, 0, '2020-12-24 03:57:16', NULL, NULL),
(79, 1, 1, 1, 0, 0, 0, '2020-12-24 03:57:35', NULL, NULL),
(80, 1, 1, 1, 0, 0, 0, '2020-12-24 03:57:59', NULL, NULL),
(81, 1, 1, 1, 0, 0, 0, '2020-12-24 04:02:33', NULL, NULL),
(82, 1, 1, 1, 0, 0, 0, '2020-12-24 04:03:34', NULL, NULL),
(83, 1, 1, 1, 0, 0, 0, '2020-12-24 04:08:30', NULL, NULL),
(84, 1, 1, 1, 0, 0, 0, '2020-12-24 04:10:08', NULL, NULL),
(85, 1, 1, 1, 0, 0, 0, '2020-12-24 04:23:44', NULL, NULL),
(86, 1, 1, 1, 0, 0, 0, '2020-12-24 06:01:55', NULL, NULL),
(87, 1, 1, 1, 0, 0, 0, '2020-12-24 06:03:44', NULL, NULL),
(88, 1, 1, 1, 0, 0, 0, '2020-12-25 06:29:30', NULL, NULL),
(89, 1, 1, 1, 0, 0, 0, '2020-12-26 11:30:07', NULL, NULL),
(90, 1, 1, 1, 0, 0, 0, '2020-12-27 05:27:44', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_pic` varchar(200) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` tinyint(1) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `user_first_name` varchar(50) NOT NULL,
  `user_last_name` varchar(50) NOT NULL,
  `user_dob` date NOT NULL,
  `user_gender` varchar(10) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_pic`, `user_password`, `user_role`, `user_phone`, `user_address`, `user_first_name`, `user_last_name`, `user_dob`, `user_gender`, `user_created_at`, `user_updated_at`) VALUES
(1, 'rizqon', 'rizqon@gmail.com', '', '$2b$10$PyQKwH8t.qHa8kKrMBbHreUcS/jLPDqQ.wGn90DPRVKTwwXL8e7Zy', 0, '', '', '', '', '0000-00-00', '', '2020-12-21 23:46:29', NULL),
(2, 'rizqon maulana', 'rizqonmaulana@gmail.com', '', '$2b$10$/LLFNGsLQvbB8B2NmpKsuOPIiPjyHZCUXAN5bP6o8PwlUXhWLU91m', 0, '', '', '', '', '0000-00-00', '', '2020-12-21 23:48:39', NULL),
(3, 'mm lana', 'rlana@gmail.com', '', '$2b$10$JEgjQZ88GK.Ne3d.LgxbPuVKuG9y0yLMlKobgUyURf4/3sdEOKTx6', 1, '081348494465', 'Jl.Praja Bakti Blok 2E no.74', 'Rizqon', 'Maulana', '2000-01-01', 'male', '2020-12-22 15:12:26', NULL),
(4, 'mlana', 'mlana@gmail.com', '', '$2b$10$33gsDv4MKkicJAgkdYDEUOE8RvxGm6xuNgce.uz/gmDUwmtLIGO0u', 1, '081348494465', 'Jl.Praja Bakti Blok 2E no.74', 'Rizqon', 'Maulana', '2000-01-01', 'male', '2020-12-22 15:16:52', NULL),
(5, 'rizqonmaulanaaa', 'rmlana@gmail.com', '2020-12-26T11-59-10.894Zerd.png', '$2b$10$y.Hkg7Todelnqp9WjlhMGeSAtWiIn5T9L1/Cx3zoaF7dkVvbbAnqm', 1, '0819893979', 'Jl. cplus', 'linus', 'torvalds', '2019-01-01', 'male', '2020-12-22 15:19:10', '2020-12-26 03:59:10'),
(6, 'Abraham', 'abraham@gmail.com', '2020-12-26T11-27-59.725Zbg2.png', '$2b$10$tgciLhOB6SsWsMDrH6ezx.gaGufdQBSxaodY84DGONoRyKzKilL7S', 0, '081348494465', 'Jl. dunia akhirat', 'abraham', 'lincoln', '1945-08-17', 'male', '2020-12-26 03:27:59', NULL),
(7, 'Abraham', 'abrahamdamar@gmail.com', '2020-12-26T11-30-26.873Zbg2.png', '$2b$10$KmEM986fm1u3CyPwrnbYU.9nwVLcUtJF.q/ludtVYj1/e5fhcoNxa', 0, '081348494465', 'Jl. dunia akhirat', 'abraham', 'lincoln', '1945-08-17', 'male', '2020-12-26 03:30:27', NULL),
(8, 'Abraham', 'abrahamlincoln@gmail.com', '2020-12-26T11-59-43.591Zbg2.png', '$2b$10$feJuqAHhu6fpqeJeaoJ1rOjsVOf6qc12IeF71z3mMMtr.kS8rmSPq', 0, '081348494465', 'Jl. dunia akhirat', 'abraham', 'lincoln', '1945-08-17', 'male', '2020-12-26 03:59:43', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`delivery_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`order_detail_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `delivery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
