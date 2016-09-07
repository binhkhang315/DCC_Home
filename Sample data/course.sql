-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 192.168.122.51:3306
-- Generation Time: Aug 11, 2016 at 10:07 AM
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

INSERT INTO `Courses` (`id`, `name`, `description`, `category`, `documents`, `trainerID`, `test`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 'CBA Overview', '1. Overview\n2. CoreMW\n3. OAM (COM, ECIM)\n4. Linux (LOTC)\n5. Application Environment (Optional)', 'CBA Overview', 'This is CBA Overview document', '[{"text":"Khai Doan"}]', 'This is CBA Overview test', 0, '2016-08-10 07:10:18', '2016-08-11 04:43:12'),
(2, 'CoreMW Overview', '1. Overview\r\n2. Availability Services\r\n3. Manageability Services\r\n4. OpenSAF Infrastructure Services', 'CBA Overview', 'This is CoreMW Overview document', '[{"text":"Tai Dinh"}]', 'This is CoreMW Overview test', 0, '2016-08-10 07:10:18', '2016-08-11 04:37:05'),
(3, 'LDE', '1. Cluster introduction\r\n2. LOTC version\r\n3. Maintenance mode\r\n4. Install LOTC', 'CBA Overview', 'This is LDE document', '[{"text":"King Nguyen"}]', 'This is LDE test', 0, '2016-08-10 07:10:18', '2016-08-11 04:39:36'),
(4, 'GIT & GERRIT', '1. Represent about GIT\r\n- What is GIT?\r\n- Checkout/Checkin/push\r\n- Branch\r\n- Merge\r\n- Rebase\r\n- Cherry-pick\r\n- Submodule\r\n- Practices\r\n2. Represent about GERRIT\r\n- What is GERRIT?\r\n- Change vs patch set\r\n- How to do code review\r\n- Practices', 'CBA Overview', 'This is GIT & GERRIT document', '[{"text":"Bao Nguyen"}]', 'This is GIT & GERRIT test', 0, '2016-08-10 07:10:18', '2016-08-11 04:12:57'),
(5, 'Training Overview', 'Brief overview for all training courses', 'General Orientation', 'n/a', '[{"text":"Quy"},{"text":"Quang"}]', 'n/a', 0, '2016-08-10 07:18:37', '2016-08-11 04:37:12'),
(6, 'DEK Organization and Culture', '1. Who is D.E.K ? 2. DEK Offices 3. Site Organisation Chart 4. Operation Organisation Chart 5. DEK Vn Structure 6. DEK Vn Team Leaders 7. DEK Vn Trade Union 8. DEK Culture 9. DEK Vision and Mission 10. DEK Vn Objective', 'General Orientation', 'n/a', '[{"text":"Daniel"}]', 'n/a', 0, '2016-08-10 07:19:14', '2016-08-11 04:36:17'),
(7, 'Corporate Policy', '1. How is D.E.K? DEK Culture 2. Respect aspects 3. Ethics 4. Working hours 5. Time reports 6. Salary 7. Working/training onsite 8. Performance review 9. Rules', 'General Orientation', 'n/a', '[{"text":"Loan"}]', 'n/a', 0, '2016-08-10 07:19:41', '2016-08-11 04:38:40'),
(8, 'Trade Union', '''- TU Introduction - Organization - Responsibility and benefit of TU member', 'General Orientation', 'n/a', '[{"text":"Phong Thai"}]', 'n/a', 0, '2016-08-10 07:20:15', '2016-08-11 02:47:21'),
(9, 'Linux Overview For Users', '1. Introduction\n2. Root file system \n3. Basic commands', 'Linux Programming', 'n/a', '[{"text":"Bao V Nguyen"},{"text":"Bao DT Ng"},{"text":"Toan Pham"}]', 'n/a', 0, '2016-08-10 07:20:52', '2016-08-11 04:37:19'),
(10, 'Linux Overview For Programers', '1. Linux kernel Architecture    What is Kernel ? 2. Kernel Architecture Overview      User Space      Kernel Space 3. Kernel Functional Overview     File System     Process Management     Device Driver     Memory Management     Networking', 'Linux Programming', 'n/a', '[{"text":"Bao Viet Ng"},{"text":"Thang Ba Ng"}]', 'n/a', 0, '2016-08-10 07:21:27', '2016-08-11 02:48:08'),
(11, 'Linux Programming - Shell script', '''<tbd by the trainer>', 'Linux Programming', 'n/a', '[{"text":"Tuan Dang"},{"text":"Phat Ngo"}]', 'n/a', 0, '2016-08-10 07:22:38', '2016-08-11 02:48:26'),
(12, 'AXE&APZ Overview', '1. Market trend.\r\n2. AXE\r\n    - AXE usage/application <Son to provide slide>\r\n    - HW architecture\r\n    - System characteristics\r\n3. APZ: \r\n    - APZ Control System Overview: \r\n        + CP\r\n        + RP\r\n        + AP/SPG/IO\r\n    - Why?: \r\n        + Scalability\r\n        + Soft realtime, Hard realtime, and No realtime\r\n        + Complexity distribution.\r\n        + Data\r\n        + Redundancy\r\n    - SW upgrade\r\n    - CP tracing\r\n    - Load control\r\n4. Introduce CPs (212 11 -> 212 60, 214 01)\r\n5. Introduce IO (APG40 , APG43)\r\n6. Introduce RPs', 'AXE Overview', 'n/a', '[{"text":"Coo"}]', 'n/a', 0, '2016-08-10 07:23:34', '2016-08-11 02:48:32'),
(13, 'APZ-CP Overview', '1. Main characteristics 2. The History 3. Architecture     - Overview     - APZ CP SW architectur     - HW architecture 4. Program execution (PLEX + ASA) 5. Fault tolerance 7. Introduce Subsystems (CPHW, PES, CQS, DBS, CPS) 8. Introduce latest systems (212 40, 50, 55, 60, 70, Blade Cluster)', 'AXE Overview', 'n/a', '[{"text":"Coo"}]', 'n/a', 0, '2016-08-10 07:23:57', '2016-08-11 02:48:39'),
(999, 'testing3', 'This is testing Des3', 'testing cat3', 'testing doc3', '[{"text":"testing3"}]', 'testing testing3', 0, '0000-00-00 00:00:00', '2016-08-11 07:51:47');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1092;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
