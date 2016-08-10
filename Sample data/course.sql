-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 192.168.122.51:3306
-- Generation Time: Aug 10, 2016 at 09:24 AM
-- Server version: 5.6.30-0ubuntu0.14.04.1
-- PHP Version: 5.5.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DCC`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `category` varchar(255) NOT NULL,
  `documents` varchar(255) DEFAULT NULL,
  `trainerID` varchar(255) DEFAULT NULL,
  `test` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `description`, `category`, `documents`, `trainerID`, `test`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 'CBA Overview', 'Khai Doan', 'CBA Overview', 'This is CBA Overview document', 'Khai Doan', 'This is CBA Overview test', 0, '2016-08-10 07:10:18', '2016-08-10 07:17:06'),
(2, 'CoreMW Overview', 'Tai Dinh', 'CBA Overview', 'This is CoreMW Overview document', 'Tai Dinh', 'This is CoreMW Overview test', 0, '2016-08-10 07:10:18', '2016-08-10 07:17:11'),
(3, 'LDE', 'King Nguyen', 'CBA Overview', 'This is LDE document', 'King Nguyen', 'This is LDE test', 0, '2016-08-10 07:10:18', '2016-08-10 07:17:20'),
(4, 'GIT & GERRIT', 'Bao Nguyen', 'CBA Overview', 'This is GIT & GERRIT document', 'Bao Nguyen', 'This is GIT & GERRIT test', 0, '2016-08-10 07:10:18', '2016-08-10 07:17:24'),
(5, 'Training Overview', 'Brief overview for all training courses', 'General Orientation', 'n/a', 'Quy / Quang', 'n/a', 0, '2016-08-10 07:18:37', '2016-08-10 07:18:37'),
(6, 'DEK Organization and Culture', '1. Who is D.E.K ? 2. DEK Offices 3. Site Organisation Chart 4. Operation Organisation Chart 5. DEK Vn Structure 6. DEK Vn Team Leaders 7. DEK Vn Trade Union 8. DEK Culture 9. DEK Vision and Mission 10. DEK Vn Objective', 'General Orientation', 'n/a', 'Daniel', 'n/a', 0, '2016-08-10 07:19:14', '2016-08-10 07:19:14'),
(7, 'Corporate Policy', '1. How is D.E.K? DEK Culture 2. Respect aspects 3. Ethics 4. Working hours 5. Time reports 6. Salary 7. Working/training onsite 8. Performance review 9. Rules', 'General Orientation', 'n/a', 'Loan', 'n/a', 0, '2016-08-10 07:19:41', '2016-08-10 07:19:41'),
(8, 'Trade Union', '''- TU Introduction - Organization - Responsibility and benefit of TU member', 'General Orientation', 'n/a', 'Phong Thai', 'n/a', 0, '2016-08-10 07:20:15', '2016-08-10 07:20:15'),
(9, 'Linux Overview For Users', '''1. Introduction 2. Root file system 3. Basic commands', 'Linux Programming', 'n/a', 'Bao V Nguyen / Bao DT Ng / Toan Pham', 'n/a', 0, '2016-08-10 07:20:52', '2016-08-10 07:20:52'),
(10, 'Linux Overview For Programers', '1. Linux kernel Architecture    What is Kernel ? 2. Kernel Architecture Overview      User Space      Kernel Space 3. Kernel Functional Overview     File System     Process Management     Device Driver     Memory Management     Networking', 'Linux Programming', 'n/a', 'Bao Viet Ng /  Thang Ba Ng', 'n/a', 0, '2016-08-10 07:21:27', '2016-08-10 07:21:27'),
(11, 'Linux Programming - Shell script', '''<tbd by the trainer>', 'Linux Programming', 'n/a', 'Tuan Dang / Phat Ngo', 'n/a', 0, '2016-08-10 07:22:38', '2016-08-10 07:22:38'),
(12, 'AXE&APZ Overview', 'Co', 'AXE Overview', 'n/a', 'Co', 'n/a', 0, '2016-08-10 07:23:34', '2016-08-10 07:24:07'),
(13, 'APZ-CP Overview', '1. Main characteristics 2. The History 3. Architecture     - Overview     - APZ CP SW architectur     - HW architecture 4. Program execution (PLEX + ASA) 5. Fault tolerance 7. Introduce Subsystems (CPHW, PES, CQS, DBS, CPS) 8. Introduce latest systems (212 40, 50, 55, 60, 70, Blade Cluster)', 'AXE Overview', 'n/a', 'Co', 'n/a', 0, '2016-08-10 07:23:57', '2016-08-10 07:23:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
