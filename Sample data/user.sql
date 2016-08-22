/*
-- Date: 2016-08-22 09:55
*/



CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (1,'trainee2','I\'m trainee#2','21/10/1995','0123456789','DEK Technologies','trainee2@dek.vn','/img/profile.jpg','2016-08-15 04:04:33','2016-08-15 04:04:33');
INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (2,'adminaaaaaaaa','I\'m admin','20/10/1995','0123456789','DEK Technologies','dek@dek.vn','/img/profile.jpg','2016-08-15 04:06:42','2016-08-15 04:06:42');
INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (3,'trainer3','I\'m trainer#3','23/10/1995','0123456789','DEK Technologies','trainer3@dek.vn','/img/profile.jpg','2016-08-15 04:06:42','2016-08-15 04:06:42');
INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (4,'trainer2','I\'m trainer#2','22/10/1995','0123456789','DEK Technologies','trainer2@dek.vn','/img/profile.jpg','2016-08-15 04:06:42','2016-08-15 04:06:42');
INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (5,'trainee1','I\'m trainee#1','20/10/1995','0123456789','DEK Technologies','trainee1@dek.vn','/img/profile.jpg','2016-08-15 04:06:42','2016-08-15 04:06:42');
INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (6,'trainer1','I\'m trainer#1','21/10/1995','0123456789','DEK Technologies','trainer1@dek.vn','/img/profile.jpg','2016-08-15 04:06:42','2016-08-15 04:06:42');
INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (7,'admin','I\'m admin','20/10/1995','0123456789','DEK Technologies','dek@dek.vn','/img/profile.jpg','2016-08-15 04:13:35','2016-08-15 04:13:35');
INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (8,'qwe@gmail.com','I\'m admin','20/10/1995','0123456789','DEK Technologies','qwe@gmail.com','/img/userPhoto-1471833860288test.jpg','2016-08-15 04:15:25','2016-08-22 02:44:20');
INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (15,'testAssociate','testAssociate','20/10/1995','0123456789','DEK Technologies','testAssociate@dek.vn','/img/profile.jpg','2016-08-17 10:22:20','2016-08-17 10:22:20');
INSERT INTO `user` (`id`,`username`,`status`,`dob`,`phone`,`location`,`email`,`avatar`,`createdAt`,`updatedAt`) VALUES (9999,'testingEmail@gmail.com','For testing! don\'t delete','20/10/1995','0123456789','DEK Technologies','dek@dek.vn','/img/userPhoto-1471492911201admin-icon.jpg','2016-08-15 04:15:25','2016-08-18 04:01:51');
