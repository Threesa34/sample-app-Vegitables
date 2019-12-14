CREATE TABLE IF NOT EXISTS `companymaster` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1500) DEFAULT NULL,
  `address` varchar(5000) DEFAULT NULL,
  `mobile1` bigint(20) DEFAULT NULL,
  `mobile2` bigint(20) DEFAULT NULL,
  `owner` varchar(1500) DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `companypayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyid` int(11) DEFAULT NULL,
  `paymentmonth` varchar(50) DEFAULT NULL,
  `paymentdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` double DEFAULT NULL,
  `planid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1500) DEFAULT NULL,
  `address` varchar(5000) DEFAULT NULL,
  `owner` varchar(1500) DEFAULT NULL,
  `mobile1` bigint(20) DEFAULT NULL,
  `mobile2` bigint(20) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `orderdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderid` int(11) DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `qty` double DEFAULT NULL,
  `rate` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `ordermaster` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `restraurant` int(11) DEFAULT NULL,
  `orderdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `amount` double DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL,
  `createddate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paymentsts` int(11) DEFAULT NULL,
  `paymentdate` datetime DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyid` int(11) DEFAULT NULL,
  `plan` varchar(50) DEFAULT NULL,
  `startingadte` date DEFAULT NULL,
  `validity` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `reneweddate` datetime DEFAULT NULL,
  `amtpaid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1500) DEFAULT NULL,
  `userlevel` varchar(20) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `regid` varchar(5000) DEFAULT NULL,
  `custid` int(11) DEFAULT NULL,
  `address` varchar(5000) DEFAULT NULL,
  `mobile1` bigint(20) DEFAULT NULL,
  `mobile2` bigint(20) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `vegs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeid` int(11) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `marathiname` varchar(500) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `vegtype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(150) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

INSERT INTO `companymaster` (`id`,`name`,`address`,`mobile1`,`mobile2`,`owner`,`description`) VALUES (1,'Shree Sai Green & Fresh Vegitables Supplyers','Pawar nagar Thane.',9768241152,1111111111,'Abhishek banakar','sample description');
INSERT INTO `companymaster` (`id`,`name`,`address`,`mobile1`,`mobile2`,`owner`,`description`) VALUES (2,'Priyanka vegitables','Dombiwali',5454848454,NULL,'Priyanka yogi','Test');



INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (6,'Alok Hotel','Thane relway station West','Gopal Shet',NULL,NULL,1,1,'2018-05-30 20:43:59.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (7,'Sarovar Hotel','Kalwa Naka','Sunil Shet',NULL,NULL,1,1,'2018-05-30 20:45:53.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (8,'metkut','Ghantali mandir opposite','sunny pawaskar',NULL,NULL,1,1,'2018-05-30 20:59:32.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (9,'metkut fast','ghantali mandir road','sunny pawaskar',NULL,NULL,1,1,'2018-06-02 00:01:25.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (10,'snack attack','manpada','mahesh Agrawal',NULL,NULL,1,1,'2018-06-02 00:01:57.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (11,'shreya','khevra circle',NULL,NULL,NULL,1,1,'2018-06-02 00:02:25.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (12,'27yard','kothari compound',NULL,NULL,NULL,1,1,'2018-06-02 01:06:15.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (13,'royal garden','owala ghodbandar road','Santosh shet',NULL,NULL,1,1,'2018-06-02 01:07:32.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (14,'70°east','kothari compound','sunny sir',NULL,NULL,1,1,'2018-06-02 01:09:56.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (15,'kalpruksh hotel','vartak Nagar naka',NULL,NULL,NULL,1,1,'2018-06-02 01:10:42.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (16,'akash hotel','kalawa','satish shet',NULL,NULL,1,1,'2018-06-02 01:12:23.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (17,'sandya','balkum naka',NULL,NULL,NULL,1,1,'2018-06-02 01:13:14.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (18,'Kath & ghat','pachpakhadi','sunny pawaskar',NULL,NULL,1,1,'2018-06-02 01:17:26.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (19,'Mayur',NULL,'Own',9854789654,NULL,28,2,'2018-06-15 15:57:27.000');

INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (1,1,2,1,11);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (2,1,4,10,12.5);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (3,1,8,5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (4,2,2,1,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (5,2,5,2,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (8,4,2,1,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (9,4,7,1,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (12,1,6,5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (13,2,3,7,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (14,2,5,2,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (15,2,7,1,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (18,7,10,15,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (19,7,11,50,22.5);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (20,8,10,15,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (21,8,11,0.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (22,9,10,1.5,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (23,9,11,2.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (24,9,12,0.25,45);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (25,9,13,0.25,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (26,10,10,15,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (27,10,11,0.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (28,10,12,0.2,45);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (29,11,10,15,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (30,11,11,0.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (31,11,12,0.2,45);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (32,12,10,15,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (33,12,11,0.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (34,12,12,0.2,45);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (35,13,10,15,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (36,13,11,0.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (37,13,12,0.2,45);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (38,14,10,15,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (39,14,11,0.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (40,14,12,0.2,45);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (41,15,10,15,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (42,15,11,0.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (43,15,12,0.2,45);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (44,16,10,10,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (45,16,11,9,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (46,16,12,8,45);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (47,16,13,7,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (48,17,10,10,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (49,17,11,5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (50,17,12,4,45);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (51,18,10,10,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (52,18,16,5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (53,19,10,10,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (54,19,17,15,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (55,19,20,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (56,20,10,50,0);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (57,19,22,0.5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (58,21,10,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (59,21,15,0.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (60,21,17,1.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (61,22,10,15,15.5);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (62,22,15,20,28);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (63,23,10,15,10.5);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (64,23,11,2.5,16);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (65,23,15,2.5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (66,23,16,2.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (67,23,18,5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (68,23,19,2.5,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (69,23,20,5,18);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (70,23,21,5,19);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (71,23,22,5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (72,23,23,6,18);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (73,23,24,10,17.5);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (74,23,25,5,20);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (75,23,30,0.5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (76,23,34,2.5,12.5);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (77,23,44,0.5,26);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (83,26,10,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (84,26,11,3,16);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (85,26,15,2,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (86,26,16,2.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (87,26,18,2.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (88,26,19,2.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (89,26,20,5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (90,26,21,5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (91,26,22,5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (92,26,23,9,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (93,26,30,1,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (94,26,44,1.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (95,26,69,7.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (96,27,10,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (97,27,11,10,16);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (98,27,15,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (99,27,16,10,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (100,28,10,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (101,28,11,10,16);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (102,28,15,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (103,28,16,10,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (104,29,20,2,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (105,29,21,2,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (106,29,22,2,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (107,29,23,2,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (108,30,10,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (109,30,11,10,16);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (110,30,15,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (111,31,10,6,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (112,31,11,2,16);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (113,31,15,0.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (114,31,19,3,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (115,31,21,1,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (116,31,23,14,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (117,31,30,1,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (118,31,31,35,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (119,31,32,5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (120,31,34,2,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (121,31,37,5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (122,31,47,15,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (123,31,65,8,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (124,31,66,15,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (125,31,67,15,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (126,31,72,2,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (127,32,10,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (128,32,11,2,16);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (129,32,16,2.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (130,32,18,2.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (131,32,20,5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (132,32,21,5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (133,32,22,5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (134,32,23,11,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (135,32,25,2,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (136,32,26,2,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (137,32,30,1,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (138,32,44,1.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (139,32,72,7.5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (140,33,80,5.8,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (141,34,80,50,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (142,35,81,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (143,35,83,10,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (144,35,92,5,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (145,35,84,5,210);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (146,36,10,10,50);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (147,36,11,2.5,16);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (148,36,15,2,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (149,36,16,2.5,25);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (150,36,17,1.25,NULL);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (151,36,18,1,NULL);

INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (1,1,'2018-05-22 00:00:00.000',43.5,1,'2018-05-19 01:24:39.000',1,'2018-05-19 00:00:00.000',1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (2,4,'2018-05-21 00:00:00.000',NULL,1,'2018-05-19 01:33:37.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (4,1,'2018-05-20 00:00:00.000',NULL,1,'2018-05-19 01:37:09.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (7,3,'2018-05-20 00:00:00.000',37.5,3,'2018-05-19 21:25:10.000',1,'2018-05-19 00:00:00.000',1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (8,0,'2018-05-21 00:00:00.000',NULL,3,'2018-05-20 13:36:59.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (9,4,'2018-05-22 00:00:00.000',110,3,'2018-05-20 17:59:33.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (10,4,'2018-05-22 00:00:00.000',45,3,'2018-05-21 20:58:29.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (11,4,'2018-05-22 00:00:00.000',45,3,'2018-05-21 20:58:39.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (12,4,'2018-05-22 00:00:00.000',45,3,'2018-05-21 20:58:47.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (13,4,'2018-05-22 00:00:00.000',45,3,'2018-05-21 20:58:52.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (14,4,'2018-05-22 00:00:00.000',45,3,'2018-05-21 20:58:53.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (15,4,'2018-05-22 00:00:00.000',45,3,'2018-05-21 20:58:53.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (16,4,'2018-05-24 00:00:00.000',60,3,'2018-05-21 21:00:43.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (17,4,'2018-05-25 00:00:00.000',45,3,'2018-05-21 21:04:05.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (18,4,'2018-05-23 00:00:00.000',275,3,'2018-05-22 16:36:30.000',1,'2018-05-22 00:00:00.000',1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (19,4,'2018-05-24 00:00:00.000',155,3,'2018-05-22 20:27:23.000',1,'2018-05-22 00:00:00.000',1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (20,4,'2018-05-24 00:00:00.000',0,3,'2018-05-22 20:52:46.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (21,8,'2018-06-03 00:00:00.000',0,6,'2018-06-02 00:35:03.000',0,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (22,8,'2018-06-04 00:00:00.000',792.5,6,'2018-06-02 00:35:18.000',0,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (23,7,'2018-06-03 00:00:00.000',1114.75,7,'2018-06-02 01:03:35.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (26,4,'2018-06-10 00:00:00.000',160.5,3,'2018-06-09 00:47:47.000',0,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (27,8,'2018-06-10 00:00:00.000',410,6,'2018-06-09 19:54:46.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (28,8,'2018-06-09 00:00:00.000',410,6,'2018-06-09 19:57:53.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (29,8,'2018-06-09 00:00:00.000',20,6,'2018-06-09 19:59:20.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (30,8,'2018-06-10 00:00:00.000',160,6,'2018-06-10 13:29:56.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (31,8,'2018-06-13 00:00:00.000',32,6,'2018-06-12 22:03:32.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (32,6,'2018-06-12 00:00:00.000',144.5,3,'2018-06-12 22:05:16.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (33,19,'2018-06-15 00:00:00.000',87,29,'2018-06-15 15:58:57.000',1,'2018-06-15 00:00:00.000',2);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (34,19,'2018-06-16 00:00:00.000',750,29,'2018-06-15 16:01:05.000',NULL,NULL,2);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (35,19,'2018-06-25 00:00:00.000',1050,29,'2018-06-25 12:30:47.000',NULL,NULL,2);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (36,1,'2019-11-10 00:00:00.000',602.5,2,'2019-11-09 20:15:41.000',0,NULL,1);

INSERT INTO `plan` (`id`,`companyid`,`plan`,`startingadte`,`validity`,`amount`,`reneweddate`,`amtpaid`) VALUES (1,1,'Free','2018-05-01 00:00:00.000',NULL,0,NULL,1);
INSERT INTO `plan` (`id`,`companyid`,`plan`,`startingadte`,`validity`,`amount`,`reneweddate`,`amtpaid`) VALUES (2,2,'Demo','2018-06-15 00:00:00.000','2018-06-29 00:00:00.000',0,NULL,NULL);

INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (1,'Mayur Mhatre','Admin','admin','admin','APA91bHBt7s7AzpT7c-rAkA8oif1Y8u3XWAif9N3PUlnYPSOAK7-SQ7aH0jbvvZHDEqNo5MhQpNPDjpaQ5cA99qwA64ZMqZ1rasuDoyNNSQbxpdR1yqgE8aEoARFS8nS0Wnp_Qlc8NrP',1,'Thane',9768241151,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (3,'Gopal sheth','Customer','alok','321','APA91bF_UQQ2sPxtKEQz2ecdB7XgpeHP5WfjKZjSSjZx27cobg90fGGYMdDgOSavaqOxW0qHruQoRiFOG0jcDhKBGSrlxb6pFqq1QS3nPoOjI_JcWrOAmz48U39Wu0xs1rNpFNwS60ka',6,'Thane',5454848484,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (6,'sunny pawaskar','Customer','metkut','321','APA91bFowvs4k7ZtYevFI4kzkmyEYSM5TqoVB8jV-sGF2KU1VGexJ1Vs7Sbub1ZovafUUhGDuelD1nx3g7TVSNVOddbC4kDsptfkS_pATGF2zr8JzkQ1eGf5cVjlqh8cXWRmTS1TaLkl',8,'ghantali mandir opp.',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (7,'Sunil shet','Customer','sarovar','321','APA91bF_UQQ2sPxtKEQz2ecdB7XgpeHP5WfjKZjSSjZx27cobg90fGGYMdDgOSavaqOxW0qHruQoRiFOG0jcDhKBGSrlxb6pFqq1QS3nPoOjI_JcWrOAmz48U39Wu0xs1rNpFNwS60ka',7,'kalwa naka',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (8,'sunny pawaskar','Customer','metkutf','321',NULL,9,'ghantali mandir road',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (9,'mahesh Agrawal','Customer','snackattack','321',NULL,10,'manpada',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (10,NULL,'Customer','shreya','321',NULL,11,'khevra circle',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (12,NULL,'Customer','27yard','321',NULL,12,'kothari compound',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (13,'Santosh shet','Customer','royalgarden','321',NULL,13,'owala',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (14,'sunny','Customer','70east','321',NULL,14,'kothari compound',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (15,NULL,'Customer','kalpruksh','321',NULL,15,'vartak Nagar naka',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (16,'sunny pawaskar','Customer','kath&ghat','321',NULL,18,'pachpakhadi',NULL,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (18,'Mayur Mhatre','SuperAdmin','mayur','mayur2503','APA91bFowvs4k7ZtYevFI4kzkmyEYSM5TqoVB8jV-sGF2KU1VGexJ1Vs7Sbub1ZovafUUhGDuelD1nx3g7TVSNVOddbC4kDsptfkS_pATGF2zr8JzkQ1eGf5cVjlqh8cXWRmTS1TaLkl',NULL,'Pawar Nagar, Thane',9768241151,NULL,NULL);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (27,'abhishek bankar','Admin','abhishek','321','APA91bF_UQQ2sPxtKEQz2ecdB7XgpeHP5WfjKZjSSjZx27cobg90fGGYMdDgOSavaqOxW0qHruQoRiFOG0jcDhKBGSrlxb6pFqq1QS3nPoOjI_JcWrOAmz48U39Wu0xs1rNpFNwS60ka',NULL,'D6/146 new mahada pawar nagar Thane(w)',9892801773,NULL,1);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (28,'Priyanka yogi','Admin','Priyanka','321','APA91bEsUNIsbhB05YJgLk3KftSSB6XIZkNRGJp4hkcTxHr4eCMnxyt_m0zdelA_15AvEp90yINDi81aZ0NNl4hoHxOsuw-_w7VcCMV6Bs8N1R2gX9A7rRo-na2QesEnFZCL1lCCMdM3',NULL,'Dombiwali',5464848484,NULL,2);
INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (29,'Mhatre','Customer','Mayur123','321','APA91bFowvs4k7ZtYevFI4kzkmyEYSM5TqoVB8jV-sGF2KU1VGexJ1Vs7Sbub1ZovafUUhGDuelD1nx3g7TVSNVOddbC4kDsptfkS_pATGF2zr8JzkQ1eGf5cVjlqh8cXWRmTS1TaLkl',19,NULL,9856321478,NULL,2);

INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (10,3,'Tomato','Taoma^Tao','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (11,3,'Chiily','imarcaI','Kg',16,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (15,3,'Ginger','AaWk','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (16,3,'Carrot','gaajar','Kg',25,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (17,3,'Beet','baIT','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (18,3,'Beens','frSaI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (19,3,'Cucumber','kakDI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (20,3,'Cabbage','kaobaI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (21,3,'Flower','Flaa^var','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (22,3,'Capsicum','isamalaa','Kg',10,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (23,3,'Coriander','kaoqaIMbaIr','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (24,3,'Palak','palak','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (25,3,'Sp. Onion','kaMdaPa<aa','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (26,3,'Pudina','pudInaa','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (27,3,'Celery','saalarI','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (28,3,'Muli','mauLI','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (29,3,'Dudhi','duQaI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (30,3,'Kadipatta','kDIp<aa','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (31,3,'Lemon','ilaMbau','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (32,3,'Bhendi','BaoMDI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (33,3,'Karela','karlaI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (34,3,'Pumpkin','BaaopLa','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (35,3,'Kohala','kaohLa','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (36,3,'Suran','saurNa','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (37,3,'Small Brinzol','MMCaoTI vaaMgaI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (38,3,'Tondli','taoMDlaI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (39,3,'Padval','pDvaL','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (40,3,'Mugi','maugaI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (41,3,'Raw banana','kccaI koLI','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (42,3,'Onion','kaMda','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (43,3,'Potato','baTaTa','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (44,3,'Drumstick','Saovagaa','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (45,3,'Green peas','vaTaNaa','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (46,3,'Walor','vaalavaD','Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (47,3,'Methi','maoqaI','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (48,4,'Red Yellow Capsicum',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (49,4,'Mushroom',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (50,4,'Jugni',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (51,4,'Lolorosa',NULL,'Gm',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (52,4,'Roman Lotus',NULL,'Gm',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (53,4,'Thyme',NULL,'Gm',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (54,4,'Baby Corn',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (55,4,'Broccoli',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (56,4,'Cherry Tomato',NULL,'Gm',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (57,4,'Basil leaf',NULL,'Gm',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (58,4,'Pasali Leaves',NULL,'Gm',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (59,4,'Pokhchai',NULL,'Gm',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (60,4,'Iceberg',NULL,'Gm',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (61,4,'Oregano',NULL,'Gm',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (62,4,'Leekas',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (65,3,'bharta brinjal',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (66,3,'Lal math',NULL,'pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (67,3,'chawli leaves',NULL,'pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (68,3,'chawli',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (69,3,'parvar',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (70,3,'gawar',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (71,3,'alu leaves',NULL,'pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (72,3,'staff vegetable',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (73,5,'pineapple',NULL,'pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (74,5,'Apple',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (75,5,'watermelon',NULL,'pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (76,5,'banana','kela','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (77,5,'grapes',NULL,'Kg',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (78,5,'kiwi','kIvaI','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (79,5,'Mango','AaMbaa','pieces',NULL,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (81,8,'Tomato','Taoma^Tao','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (82,8,'Chiily','imarcaI','Kg',26,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (83,8,'Ginger','AaWk','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (84,8,'Carrot','gaajar','Kg',210,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (85,8,'Beet','baIT','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (86,8,'Beens','frSaI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (87,8,'Cucumber','kakDI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (88,8,'Cabbage','kaobaI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (89,8,'Flower','Flaa^var','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (90,8,'Capsicum','isamalaa','Kg',20,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (91,8,'Coriander','kaoqaIMbaIr','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (92,8,'Palak','palak','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (93,8,'Sp. Onion','kaMdaPa<aa','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (94,8,'Pudina','pudInaa','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (95,8,'Celery','saalarI','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (96,8,'Muli','mauLI','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (97,8,'Dudhi','duQaI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (98,8,'Kadipatta','kDIp<aa','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (99,8,'Lemon','ilaMbau','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (100,8,'Bhendi','BaoMDI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (101,8,'Karela','karlaI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (102,8,'Pumpkin','BaaopLa','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (103,8,'Kohala','kaohLa','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (104,8,'Suran','saurNa','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (105,8,'Small Brinzol','MMCaoTI vaaMgaI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (106,8,'Tondli','taoMDlaI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (107,8,'Padval','pDvaL','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (108,8,'Mugi','maugaI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (109,8,'Raw banana','kccaI koLI','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (110,8,'Onion','kaMda','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (111,8,'Potato','baTaTa','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (112,8,'Drumstick','Saovagaa','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (113,8,'Green peas','vaTaNaa','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (114,8,'Walor','vaalavaD','Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (115,8,'Methi','maoqaI','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (116,9,'Red Yellow Capsicum',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (117,9,'Mushroom',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (118,9,'Jugni',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (119,9,'Lolorosa',NULL,'Gm',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (120,9,'Roman Lotus',NULL,'Gm',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (121,9,'Thyme',NULL,'Gm',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (122,9,'Baby Corn',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (123,9,'Broccoli',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (124,9,'Cherry Tomato',NULL,'Gm',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (125,9,'Basil leaf',NULL,'Gm',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (126,9,'Pasali Leaves',NULL,'Gm',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (127,9,'Pokhchai',NULL,'Gm',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (128,9,'Iceberg',NULL,'Gm',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (129,9,'Oregano',NULL,'Gm',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (130,9,'Leekas',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (131,8,'bharta brinjal',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (132,8,'Lal math',NULL,'pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (133,8,'chawli leaves',NULL,'pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (134,8,'chawli',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (135,8,'parvar',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (136,8,'gawar',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (137,8,'alu leaves',NULL,'pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (138,8,'staff vegetable',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (139,10,'pineapple',NULL,'pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (140,10,'Apple',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (141,10,'watermelon',NULL,'pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (142,10,'banana','kela','pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (143,10,'grapes',NULL,'Kg',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (144,10,'kiwi',NULL,'pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (145,10,'Mango',NULL,'pieces',NULL,2);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`marathiname`,`unit`,`rate`,`companyid`) VALUES (146,11,'Brinjal','vaaMgaI','Kg',20,2);

INSERT INTO `vegtype` (`id`,`type`,`companyid`) VALUES (3,'Indian',1);
INSERT INTO `vegtype` (`id`,`type`,`companyid`) VALUES (4,'English',1);
INSERT INTO `vegtype` (`id`,`type`,`companyid`) VALUES (5,'fruits',1);
INSERT INTO `vegtype` (`id`,`type`,`companyid`) VALUES (8,'Indian',2);
INSERT INTO `vegtype` (`id`,`type`,`companyid`) VALUES (9,'English',2);
INSERT INTO `vegtype` (`id`,`type`,`companyid`) VALUES (10,'fruits',2);
INSERT INTO `vegtype` (`id`,`type`,`companyid`) VALUES (11,'Fruit vegetables',2);