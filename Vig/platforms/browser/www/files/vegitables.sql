CREATE TABLE IF NOT EXISTS `companymaster` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1500) DEFAULT NULL,
  `address` varchar(5000) DEFAULT NULL,
  `mobile1` bigint(20) DEFAULT NULL,
  `mobile2` bigint(20) DEFAULT NULL,
  `owner` varchar(1500) DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `orderdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderid` int(11) DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  `qty` double DEFAULT NULL,
  `rate` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyid` int(11) DEFAULT NULL,
  `plan` varchar(50) DEFAULT NULL,
  `startingadte` date DEFAULT NULL,
  `validity` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `vegs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeid` int(11) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `vegtype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(150) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

INSERT INTO `companymaster` (`id`,`name`,`address`,`mobile1`,`mobile2`,`owner`,`description`) VALUES (1,'Shree Sai Vegitables Supplyers','Pawar nagar Thane.',9768241152,1111111111,'Abhishek banakar','sample description');



INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (1,'test customer','thane','tes owner',1522626262,7272272727,1,1,'2018-05-19 00:30:29.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (2,'ghssg','gsg','ssf',6111111111,6111111111,1,1,'2018-05-19 00:36:12.000');
INSERT INTO `customer` (`id`,`name`,`address`,`owner`,`mobile1`,`mobile2`,`createdby`,`companyid`,`createddate`) VALUES (3,'saaa','saaaaaaa','saaaaaaaa',2111111111,1222222222,1,1,'2018-05-19 00:36:24.000');

INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (1,1,2,1,11);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (2,1,4,10,12.5);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (3,1,8,5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (4,2,2,1,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (5,2,5,2,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (6,3,2,1,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (7,3,7,1,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (8,4,2,1,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (9,4,7,1,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (10,5,2,1,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (11,5,5,1,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (12,1,6,5,10);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (13,2,3,7,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (14,2,5,2,15);
INSERT INTO `orderdetails` (`id`,`orderid`,`productid`,`qty`,`rate`) VALUES (15,2,7,1,15);

INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (1,1,'2018-05-22 00:00:00.000',43.5,1,'2018-05-19 01:24:39.000',1,'2018-05-19 00:00:00.000',1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (2,1,'2018-05-21 00:00:00.000',NULL,1,'2018-05-19 01:33:37.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (3,1,'2018-05-20 00:00:00.000',25,1,'2018-05-19 01:35:12.000',0,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (4,1,'2018-05-20 00:00:00.000',NULL,1,'2018-05-19 01:37:09.000',NULL,NULL,1);
INSERT INTO `ordermaster` (`id`,`restraurant`,`orderdate`,`amount`,`createdby`,`createddate`,`paymentsts`,`paymentdate`,`companyid`) VALUES (5,1,'2018-05-21 00:00:00.000',NULL,1,'2018-05-19 01:38:45.000',NULL,NULL,1);

INSERT INTO `plan` (`id`,`companyid`,`plan`,`startingadte`,`validity`,`amount`) VALUES (1,1,'FREE','2018-05-01 00:00:00.000',NULL,0);

INSERT INTO `user` (`id`,`name`,`userlevel`,`username`,`password`,`regid`,`custid`,`address`,`mobile1`,`mobile2`,`companyid`) VALUES (1,'Mayur Mhatre','Admin','admin','admin',NULL,1,'Thane',9768241151,NULL,1);

INSERT INTO `vegs` (`id`,`typeid`,`name`,`unit`,`rate`,`companyid`) VALUES (2,2,'tet1','pieces',10,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`unit`,`rate`,`companyid`) VALUES (3,2,'tes','Kg',15,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`unit`,`rate`,`companyid`) VALUES (4,2,'tet3','pieces',10,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`unit`,`rate`,`companyid`) VALUES (6,2,'tet11','pieces',10,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`unit`,`rate`,`companyid`) VALUES (7,2,'tes21','Kg',15,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`unit`,`rate`,`companyid`) VALUES (8,2,'tet31','pieces',10,1);
INSERT INTO `vegs` (`id`,`typeid`,`name`,`unit`,`rate`,`companyid`) VALUES (9,2,'tes41','Kg',15,1);

INSERT INTO `vegtype` (`id`,`type`,`companyid`) VALUES (2,'Indian vegitables',1);