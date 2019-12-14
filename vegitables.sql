-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2018 at 03:13 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vegitables`
--

-- --------------------------------------------------------

--
-- Table structure for table `companymaster`
--

CREATE TABLE `companymaster` (
  `id` int(11) NOT NULL,
  `name` varchar(1500) DEFAULT NULL,
  `address` varchar(5000) DEFAULT NULL,
  `mobile1` bigint(20) DEFAULT NULL,
  `mobile2` bigint(20) DEFAULT NULL,
  `owner` varchar(1500) DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companymaster`
--

INSERT INTO `companymaster` (`id`, `name`, `address`, `mobile1`, `mobile2`, `owner`, `description`) VALUES
(1, 'Shree Sai Vegitables Supplyers', 'Pawar nagar Thane.', 9768241152, 1111111111, 'Abhishek banakar', 'sample description');

-- --------------------------------------------------------

--
-- Table structure for table `companypayment`
--

CREATE TABLE `companypayment` (
  `id` int(11) NOT NULL,
  `companyid` int(11) DEFAULT NULL,
  `paymentmonth` varchar(50) DEFAULT NULL,
  `paymentdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` double DEFAULT NULL,
  `planid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(1500) DEFAULT NULL,
  `address` varchar(5000) DEFAULT NULL,
  `owner` varchar(1500) DEFAULT NULL,
  `mobile1` bigint(20) DEFAULT NULL,
  `mobile2` bigint(20) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `address`, `owner`, `mobile1`, `mobile2`, `createdby`, `companyid`, `createddate`) VALUES
(1, 'test customer', 'thane', 'tes owner', 1522626262, 7272272727, 1, 1, '2018-05-19 00:30:29'),
(2, 'ghssg', 'gsg', 'ssf', 6111111111, 6111111111, 1, 1, '2018-05-19 00:36:12'),
(3, 'saaa', 'saaaaaaa', 'saaaaaaaa', 2111111111, 1222222222, 1, 1, '2018-05-19 00:36:24');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `orderid` int(11) DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `qty` double DEFAULT NULL,
  `rate` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `orderid`, `productid`, `qty`, `rate`) VALUES
(1, 1, 2, 1, 11),
(2, 1, 4, 10, 12.5),
(3, 1, 8, 5, 10),
(4, 2, 2, 1, 10),
(5, 2, 5, 2, 15),
(6, 3, 2, 1, 10),
(7, 3, 7, 1, 15),
(8, 4, 2, 1, 10),
(9, 4, 7, 1, 15),
(10, 5, 2, 1, 10),
(11, 5, 5, 1, 15),
(12, 1, 6, 5, 10),
(13, 2, 3, 7, 15),
(14, 2, 5, 2, 15),
(15, 2, 7, 1, 15);

-- --------------------------------------------------------

--
-- Table structure for table `ordermaster`
--

CREATE TABLE `ordermaster` (
  `id` int(11) NOT NULL,
  `restraurant` int(11) DEFAULT NULL,
  `orderdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `amount` double DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paymentsts` int(11) DEFAULT NULL,
  `paymentdate` datetime DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ordermaster`
--

INSERT INTO `ordermaster` (`id`, `restraurant`, `orderdate`, `amount`, `createdby`, `createddate`, `paymentsts`, `paymentdate`, `companyid`) VALUES
(1, 1, '2018-05-22 00:00:00', 43.5, 1, '2018-05-19 01:24:39', 1, '2018-05-19 00:00:00', 1),
(2, 1, '2018-05-21 00:00:00', NULL, 1, '2018-05-19 01:33:37', NULL, NULL, 1),
(3, 1, '2018-05-20 00:00:00', 25, 1, '2018-05-19 01:35:12', 0, NULL, 1),
(4, 1, '2018-05-20 00:00:00', NULL, 1, '2018-05-19 01:37:09', NULL, NULL, 1),
(5, 1, '2018-05-21 00:00:00', NULL, 1, '2018-05-19 01:38:45', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `companyid` int(11) DEFAULT NULL,
  `plan` varchar(50) DEFAULT NULL,
  `startingadte` date DEFAULT NULL,
  `validity` date DEFAULT NULL,
  `amount` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`id`, `companyid`, `plan`, `startingadte`, `validity`, `amount`) VALUES
(1, 1, 'FREE', '2018-05-01', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(1500) DEFAULT NULL,
  `userlevel` varchar(20) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `regid` varchar(5000) DEFAULT NULL,
  `custid` int(11) DEFAULT NULL,
  `address` varchar(5000) DEFAULT NULL,
  `mobile1` bigint(20) DEFAULT NULL,
  `mobile2` bigint(20) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `userlevel`, `username`, `password`, `regid`, `custid`, `address`, `mobile1`, `mobile2`, `companyid`) VALUES
(1, 'Mayur Mhatre', 'Admin', 'admin', 'admin', NULL, 1, 'Thane', 9768241151, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vegs`
--

CREATE TABLE `vegs` (
  `id` int(11) NOT NULL,
  `typeid` int(11) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vegs`
--

INSERT INTO `vegs` (`id`, `typeid`, `name`, `unit`, `rate`, `companyid`) VALUES
(2, 2, 'tet1', 'pieces', 10, 1),
(3, 2, 'tes', 'Kg', 15, 1),
(4, 2, 'tet3', 'pieces', 10, 1),
(6, 2, 'tet11', 'pieces', 10, 1),
(7, 2, 'tes21', 'Kg', 15, 1),
(8, 2, 'tet31', 'pieces', 10, 1),
(9, 2, 'tes41', 'Kg', 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vegtype`
--

CREATE TABLE `vegtype` (
  `id` int(11) NOT NULL,
  `type` varchar(150) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vegtype`
--

INSERT INTO `vegtype` (`id`, `type`, `companyid`) VALUES
(2, 'Indian vegitables', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companymaster`
--
ALTER TABLE `companymaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companypayment`
--
ALTER TABLE `companypayment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ordermaster`
--
ALTER TABLE `ordermaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vegs`
--
ALTER TABLE `vegs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vegtype`
--
ALTER TABLE `vegtype`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companymaster`
--
ALTER TABLE `companymaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `companypayment`
--
ALTER TABLE `companypayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ordermaster`
--
ALTER TABLE `ordermaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vegs`
--
ALTER TABLE `vegs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vegtype`
--
ALTER TABLE `vegtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
