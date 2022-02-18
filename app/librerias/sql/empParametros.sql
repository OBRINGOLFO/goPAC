-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 18, 2022 at 03:47 PM
-- Server version: 10.2.43-MariaDB
-- PHP Version: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Table structure for table `empParametros`
--

CREATE TABLE `empParametros` (
  `uid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `razon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `denominacion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rfc` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `curp` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `regimen` int(11) NOT NULL,
  `uid_direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tasa_iva` float(10,6) DEFAULT NULL,
  `tasa_ieps` float(10,6) DEFAULT NULL,
  `tasa_otros` float(10,6) DEFAULT NULL,
  `ejercicio` int(11) DEFAULT NULL,
  `periodo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `empParametros`
--
ALTER TABLE `empParametros`
  ADD PRIMARY KEY (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
