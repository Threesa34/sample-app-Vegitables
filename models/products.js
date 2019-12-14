var connection = require('../connection');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

function products() {
	

	
	
	/* INVENTORY */
	
	this.GetStockStatement= function (fromdate,todate, res) {
		connection.acquire(function (err, con) {
			if(todate == "undefined")
			{
				var sql = 'SELECT products.id,products.name,(SELECT SUM(pomaster.qty) FROM pomaster WHERE pomaster.productid = products.id AND DATE_FORMAT(pomaster.podate,"%Y-%m-%d") = "'+fromdate+'") as recqty,(SELECT SUM(stockused.qty) FROM stockused WHERE stockused.itemid = products.id AND DATE_FORMAT(stockused.useddate,"%Y-%m-%d") = "'+fromdate+'")as issuedqty,((SELECT sum(pomaster.qty) FROM pomaster WHERE pomaster.productid = products.id AND DATE_FORMAT(pomaster.podate,"%Y-%m-%d") < "'+fromdate+'") - (SELECT SUM(stockused.qty) FROM stockused WHERE stockused.itemid = products.id AND DATE_FORMAT(stockused.useddate,"%Y-%m-%d") < "'+fromdate+'")) as openingbal  FROM products';
			}
		else
		{
			var sql= 'SELECT products.id,products.name,(SELECT SUM(pomaster.qty) FROM pomaster WHERE pomaster.productid = products.id AND DATE_FORMAT(pomaster.podate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'") as recqty,(SELECT SUM(stockused.qty) FROM stockused WHERE stockused.itemid = products.id AND DATE_FORMAT(stockused.useddate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'")as issuedqty,((SELECT sum(pomaster.qty) FROM pomaster WHERE pomaster.productid = products.id AND DATE_FORMAT(pomaster.podate,"%Y-%m-%d") < "'+fromdate+'") - (SELECT SUM(stockused.qty) FROM stockused WHERE stockused.itemid = products.id AND DATE_FORMAT(stockused.useddate,"%Y-%m-%d") < "'+fromdate+'")) as openingbal  FROM products ';
		}
		var querrry = con.query(sql, function (err, result) {
			con.release();
			if(err)
			{}
			else
			{res.send(result)}
		});
		});
	};
	
	
	this.Getacrecievable= function (fromdate,todate,custtype,userid,res) {
		connection.acquire(function (err, con) {
			if(todate == "undefined")
			{
				var sql = 'SELECT entitymaster.entityname,(SELECT SUM(invoicemaster.netamount) FROM invoicemaster WHERE invoicemaster.orderfrom = entitymaster.id AND DATE_FORMAT(invoicemaster.invoicedate,"%Y-%m-%d") = "'+fromdate+'") as credit,(SELECT SUM(reciepts.paidamount) FROM reciepts WHERE reciepts.orderfrom = entitymaster.id AND DATE_FORMAT(reciepts.createddate,"%Y-%m-%d") = "'+fromdate+'") as debit,((SELECT SUM(invoicemaster.netamount) FROM invoicemaster WHERE invoicemaster.orderfrom = entitymaster.id AND DATE_FORMAT(invoicemaster.invoicedate,"%Y-%m-%d") < "'+fromdate+'") - (SELECT SUM(reciepts.paidamount) FROM reciepts WHERE reciepts.orderfrom = entitymaster.id AND DATE_FORMAT(reciepts.createddate,"%Y-%m-%d") < "'+fromdate+'")) as openingbal FROM entitymaster WHERE entitymaster.entitytype = "'+custtype+'" AND entitymaster.userid = '+userid;
			}
		else
		{
			var sql= 'SELECT entitymaster.entityname,(SELECT SUM(invoicemaster.netamount) FROM invoicemaster WHERE invoicemaster.orderfrom = entitymaster.id AND DATE_FORMAT(invoicemaster.invoicedate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'") as credit,(SELECT SUM(reciepts.paidamount) FROM reciepts WHERE reciepts.orderfrom = entitymaster.id AND DATE_FORMAT(reciepts.createddate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'") as debit,((SELECT SUM(invoicemaster.netamount) FROM invoicemaster WHERE invoicemaster.orderfrom = entitymaster.id AND DATE_FORMAT(invoicemaster.invoicedate,"%Y-%m-%d") < "'+fromdate+'") - (SELECT SUM(reciepts.paidamount) FROM reciepts WHERE reciepts.orderfrom = entitymaster.id AND DATE_FORMAT(reciepts.createddate,"%Y-%m-%d") < "'+fromdate+'")) as openingbal FROM entitymaster WHERE entitymaster.entitytype = "'+custtype+'" AND entitymaster.userid = '+userid;
		}
		var querrry = con.query(sql, function (err, result) {
			con.release();
			if(err)
			{}
			else
			{res.send(result)}
		});
		});
	};   
	
	
	this.Getacpayables= function (fromdate,todate,id, res) {
		connection.acquire(function (err, con) {
			if(id == 0)
			{
				var sql = 'SELECT a.`name`,(SELECT (SELECT SUM(grmaster.netamount) FROM grmaster WHERE grmaster.createddate >= "'+fromdate+' 00:00:00" AND grmaster.createddate <= "'+todate+' 00:00:00" AND grmaster.poid in (SELECT pomaster.id FROM pomaster WHERE pomaster.vendor = a.id)) - (SELECT SUM(vendorpayment.paidamount) FROM vendorpayment WHERE vendorpayment.createddate >= "'+fromdate+' 00:00:00" AND vendorpayment.createddate <= "'+todate+' 00:00:00")) as openingbal,(SELECT SUM(grmaster.netamount) FROM grmaster WHERE grmaster.poid in (SELECT pomaster.id FROM pomaster WHERE pomaster.vendor = a.id)) as credit,(SELECT SUM(vendorpayment.paidamount) FROM vendorpayment WHERE vendorpayment.`vendor` = a.id) as debit FROM `vendor` a'
			}
			else 
			{
				var sql = 'SELECT a.`name`,(SELECT (SELECT SUM(grmaster.netamount) FROM grmaster WHERE grmaster.createddate >= "'+fromdate+' 00:00:00" AND grmaster.createddate <= "'+todate+' 00:00:00" AND grmaster.poid in (SELECT pomaster.id FROM pomaster WHERE pomaster.vendor = a.id)) - (SELECT SUM(vendorpayment.paidamount) FROM vendorpayment WHERE vendorpayment.createddate >= "'+fromdate+' 00:00:00" AND vendorpayment.createddate <= "'+todate+' 00:00:00")) as openingbal,(SELECT SUM(grmaster.netamount) FROM grmaster WHERE grmaster.poid in (SELECT pomaster.id FROM pomaster WHERE pomaster.vendor = a.id)) as credit,(SELECT SUM(vendorpayment.paidamount) FROM vendorpayment WHERE vendorpayment.`vendor` = a.id) as debit FROM `vendor` a where a.id ='+id; 
			}
		var querry = con.query(sql, function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{}
			else
			{res.send(result)}
		});
		});
	};   
	
	this.Getacrecievables= function (fromdate,todate, res) {
		connection.acquire(function (err, con) {
		var sql = con.query('SELECT a.`entityname`,(SELECT IFNULL((SELECT SUM(invoicemaster.netamount) FROM invoicemaster WHERE invoicemaster.invoicedate >= "'+fromdate+' 00:00:00" AND invoicemaster.invoicedate <= "'+todate+' 00:00:00" AND invoicemaster.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.orderfrom = a.id)),0) - IFNULL((SELECT SUM(reciepts.paidamount) FROM reciepts WHERE reciepts.createddate >= "'+fromdate+' 00:00:00" AND reciepts.createddate <= "'+todate+' 00:00:00"),0)) as openingbal,IFNULL((SELECT SUM(invoicemaster.netamount) FROM invoicemaster WHERE invoicemaster.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.orderfrom = a.id)),0) as credit,IFNULL((SELECT SUM(reciepts.paidamount) FROM reciepts WHERE reciepts.orderfrom = a.id),0) as debit FROM `entitymaster` a ', function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{}
			else
			{res.send(result)}
		});
		});
	};   
	
	/* PRODUCTS */
	
	this.UpaloadProductsRaw= function (product, res) {
		console.log(product)
				var ss = '';
							for(var i = 0 ; i < product.length;i++)
							{
								if(product[i].DTDS2 == undefined)
								{product[i].DTDS2 = 'N.A.';}
								if(product[i].DTDS3 == undefined)
								{product[i].DTDS3 = 'N.A.';}
								if(product[i].DTDS4 == undefined)
								{product[i].DTDS4 = 0;}
								if(product[i].DTDS5 == undefined)
								{product[i].DTDS5 = 0;}
								if(product[i].DTDS6 == undefined)
								{product[i].DTDS6 = 0;}
								if(product[i].DTDS7 == undefined)
								{product[i].DTDS7 = 0;}
								if(product[i].DTDS8 == undefined)
								{product[i].DTDS8 = 0;}
								if(product[i].DTDS9 == undefined)
								{product[i].DTDS9 = 0;}
							
								ss = ss + '("'+product[i].DTDS0+'",'+product[i].DTDS1+',"'+product[i].DTDS2+'","'+product[i].DTDS3+'",'+product[i].DTDS4+','+product[i].DTDS5+','+product[i].DTDS6+','+product[i].DTDS7+','+product[i].DTDS8+','+product[i].DTDS9+'),';
							}
							ss = ss.substr(0, ss.length - 1);
		connection.acquire(function (err, con) {
			
				console.log(ss);
				con.query('insert into products (name,mrp,pack,description,porate,distrate,retailerrate,taxpercent,minpoqty,maxpoqty) values '+ ss, function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Product"});
					}
					else
					{
						res.send({status:0,message:"New Product Added Successfully."});
					}
				});
			
		});
	};   
	
	this.AddNewPlan= function (product, res) {
		connection.acquire(function (err, con) {
					var ss = '';
					if(product.twlmprice)
					{
						ss = ss+'INSERT INTO `plans`(`name`, `type`,`validity`,`twlmprice`,`cgst`, `sgst`) VALUES ("'+product.name+'","'+product.type+'","12 Months",'+product.twlmprice+','+product.cgst+','+product.sgst+');'
					}					
					if(product.sixmprice)
					{
						ss = ss+'INSERT INTO `plans`(`name`, `type`,`validity`,`sixmprice`,`cgst`, `sgst`) VALUES ("'+product.name+'","'+product.type+'","6 Months",'+product.sixmprice+','+product.cgst+','+product.sgst+');'
					}
					if(product.thrmprice)
					{
						ss = ss+'INSERT INTO `plans`(`name`, `type`,`validity`, `thrmprice`,`cgst`, `sgst`) VALUES ("'+product.name+'","'+product.type+'","3 Months",'+product.thrmprice+','+product.cgst+','+product.sgst+');'
					}					
					if(product.onemprice)
					{
						ss = ss+'INSERT INTO `plans`(`name`, `type`,`validity`,`onemprice`, `cgst`, `sgst`) VALUES ("'+product.name+'","'+product.type+'","1 Months",'+product.onemprice+','+product.cgst+','+product.sgst+');'
					}
				con.query(ss, function (err, result) {
					con.release();

					if(err)
					{
						res.send({status:1,message:"Failed To Add New Plan"});
					}
					else
					{
						res.send({status:0,message:"New Plan Added Successfully."});
					}
				});
		
		});
	};   
	this.ListProducts = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT `id`,`name`,`type`,`validity`,`cgst`,`sgst`,(CASE WHEN `twlmprice` IS NOT NULL THEN twlmprice WHEN `sixmprice` IS NOT NULL THEN `sixmprice` WHEN `thrmprice` IS NOT NULL THEN `thrmprice` WHEN `onemprice` IS NOT NULL THEN `onemprice` ELSE 0 END) AS price FROM `plans` ORDER BY id DESC', function (err, result) {
				con.release();
				console.log(err);
				res.send(result);
			});
		});
	}; 
	
	this. getperticulerUserAttendance = function (month,userid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT `id`,`userid`,(select username from user where id = userattendance.userid) as username,`attdate`,`intime`,`inaddress`,`outtime`,`outaddress` FROM `userattendance` WHERE MONTH(attdate) ='+month+' AND userid = '+userid, function (err, result) {
				con.release();
				console.log(err);
				res.send(result);
			});
		});
	}; 
	
	this.EditProduct= function (product, res) {
		connection.acquire(function (err, con) {
			con.query('update plans set ? where id= ?',[product[0],product[0].id], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Update Plan"});
					}
					else
					{
						res.send({status:0,message:"Plan Updated Successfully."});
					}
		});
		});
	}; 
	
	this.GetProduct= function (productid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `plans` where id = '+productid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 

	this.DeleteProduct= function (productid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `plans` where id = '+productid, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Plan"});
					}
					else
					{
						res.send({status:0,message:"Plan Deleted Successfully."});
					}
			});
		});
	};
  
  this.getDashboardValues= function (userlevel,userid, res) {
		connection.acquire(function (err, con) {
			if(userlevel == 'HO')
			{
					con.query('SELECT (SELECT COUNT(*) from products) as totalproducts,(SELECT COUNT(*) FROM entitymaster WHERE entitymaster.entitytype="Retailer") as totalretailers,(SELECT COUNT(*) FROM entitymaster WHERE entitymaster.entitytype="Wholesaler") as totalwholersalers,(SELECT COUNT(*) FROM entitymaster WHERE entitymaster.entitytype="Distributor") as totaldistributor,(SELECT COUNT(*) FROM vendormaster) as totalvendors FROM user WHERE userlevel = "HO"', function (err, result) {
						con.release();
						res.send(result);
			});
			}
			else
			{
				con.query('SELECT user.id,(SELECT COUNT(*) from products) as totalproducts,(SELECT COUNT(*) FROM entitymaster WHERE entitymaster.entitytype="Retailer") as totalretailers,(SELECT COUNT(*) FROM entitymaster WHERE entitymaster.entitytype="Distributor") as totaldistributor,(SELECT COUNT(*) FROM ordermaster WHERE ordermaster.orderfrom in (SELECT entitymaster.id FROM entitymaster WHERE entitymaster.entitytype = "Distributor") AND ordermaster.createdby = user.id AND ordermaster.orderdate = CURDATE()) as distributorsorder,(SELECT COUNT(*) FROM entitymaster WHERE entitymaster.entitytype="Wholesaler") as totalwholersalers,(SELECT COUNT(*) FROM ordermaster WHERE ordermaster.orderfrom in (SELECT entitymaster.id FROM entitymaster WHERE entitymaster.entitytype = "Retailer") AND ordermaster.createdby = user.id AND ordermaster.orderdate = CURDATE()) as retailersorder,(SELECT COUNT(*) FROM ordermaster WHERE ordermaster.orderfrom in (SELECT entitymaster.id FROM entitymaster WHERE entitymaster.entitytype = "Wholesaler") AND ordermaster.createdby = user.id AND ordermaster.orderdate = CURDATE()) as wholesalersorders,(SELECT COUNT(*) FROM reciepts WHERE reciepts.orderfrom in (SELECT entitymaster.id FROM entitymaster WHERE entitymaster.entitytype = "Distributor") AND reciepts.createdby = user.id AND reciepts.createddate = CURDATE()) as distcollection,(SELECT COUNT(*) FROM reciepts WHERE reciepts.orderfrom in (SELECT entitymaster.id FROM entitymaster WHERE entitymaster.entitytype = "Retailer") AND reciepts.createdby = user.id AND reciepts.createddate = CURDATE()) as retcollection FROM user WHERE id = '+userid, function (err, result) {
						con.release();
						res.send(result);
				});
			}
		});
	}; 
  
	/* CUSTOMER'S ORDERS */
	
	this.GetProductsalerate= function (productname,mrp,custtype, res) {
		if(custtype == 'Distributor')
		{
			var tablefield = 'distrate';
		}
		else
		{
			var tablefield = 'retailerrate';
		}
		connection.acquire(function (err, con) {
			con.query('SELECT '+tablefield+' as salerate,id as productid,`taxpercent` FROM `products` WHERE `name` = "'+productname+'" AND `mrp` ='+mrp, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.GetOrderDetails= function (orderid, res) {
		connection.acquire(function (err, con) {
		var sql = 	con.query('SELECT *,(case when ((SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Distributor") THEN (SELECT user.username FROM user WHERE user.id = ordermaster.orderto) ELSE (SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = ordermaster.orderto) END)as deponame,(select SUM(qty) from orderdetails where orderdetails.orderid = ordermaster.id) as totalqty,(SELECT products.name FROM products WHERE products.id = orderdetails.productid) as product,(SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) as customername,(SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) as custtype,(SELECT entitymaster.contactperson FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) as contactperson,(SELECT entitymaster.diliveryaddress FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) as diliveryaddress,(SELECT CONCAT(entitymaster.mobile1," / ",entitymaster.mobile2) FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) as contactdetails,ordermaster.id as orderid,orderdetails.id as orderdetailsid,orderdetails.productid as existprdid,orderdetails.mrp as existingmrp,ordermaster.orderstatus FROM `ordermaster`,`orderdetails` WHERE ordermaster.id = '+orderid+' AND orderdetails.orderid = '+orderid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	
	this.ListDistributorOrders= function (interval, res) {
		if(interval == 'Today')
		{
			var orderinterval = 'DATE_FORMAT(orderdate,"%Y-%m-%d") = CURDATE() AND  (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Distributor" OR (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Super Market"';
		}
		if(interval == 'Week')
		{
			var orderinterval = 'WEEKOFYEAR(orderdate) = WEEKOFYEAR(NOW()) AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Distributor" OR (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Super Market"';
		}
		if(interval == 'Month')
		{
			var orderinterval = 'MONTH(orderdate) = MONTH(CURDATE()) AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Distributor" OR (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Super Market"';
		}
		connection.acquire(function (err, con) {
			var sql = con.query('SELECT `id`,`orderdate`,`orderfrom`,(SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) as customername,`orderto`,(SELECT user.username FROM user WHERE user.id = ordermaster.orderto) as deponame,`netamount`,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as nosku,orderstatus FROM `ordermaster` where '+orderinterval+'', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	
	
	this.ListRetailerOrder= function (interval, res) {
		if(interval == 'Today')
		{
			var orderinterval = 'DATE_FORMAT(orderdate,"%Y-%m-%d") = CURDATE() AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Retailer"';
		}
		if(interval == 'Week')
		{
			var orderinterval = 'WEEKOFYEAR(orderdate) = WEEKOFYEAR(NOW()) AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Retailer"';
		}
		if(interval == 'Month')
		{
			var orderinterval = 'MONTH(orderdate) = MONTH(CURDATE()) AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) = "Retailer"';
		}
		connection.acquire(function (err, con) {
			var sql = con.query('SELECT `id`,`orderdate`,`orderfrom`,(SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) as customername,`orderto`,(SELECT user.username FROM user WHERE user.id = ordermaster.orderto) as deponame,`netamount`,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as nosku,orderstatus FROM `ordermaster` where '+orderinterval+'', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	 this.OrderCreate= function (orderdata, res) {
		 var ss = '';
		 
		connection.acquire(function (err, con) {
				con.query('INSERT INTO `ordermaster`(`orderfrom`, `orderto`, `grossamount`, `taxamount`, `netamount`,`createdby`, `orderlat`, `orderlan`,`orderstatus`) VALUES (?,?,?,?,?,?,?,?,"Order Placed")',[orderdata[0].orderfrom,orderdata[0].orderto,orderdata[0].grossamount,orderdata[0].taxamount,orderdata[0].netamount,orderdata[0].createdby,orderdata[0].orderlat,orderdata[0].orderlan], function (err, result1) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Update Product"});
					}
					else
					{
						connection.acquire(function (err, con) {
							for(var i = 0 ; i < orderdata.length;i++)
		 {	
					if(orderdata[i].freeqty == "")
						orderdata[i].freeqty = 0;
				
			 ss = ss + '('+result1.insertId+','+orderdata[i].productid+','+orderdata[i].mrp+','+orderdata[i].salerate+','+orderdata[i].qty+','+orderdata[i].freeqty+','+orderdata[i].amount+','+orderdata[i].taxpercent+'),';
		 }
		 ss = ss.substr(0,ss.length-1);
				con.query('INSERT INTO `orderdetails`(`orderid`, `productid`, `mrp`, `unitprice`, `qty`, `freeqty`, `netprice`, `taxpercent`) VALUES '+ss, function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Create Order "});
					}
						
					else
					{
						res.send({status:0,message:"Order Created Successfully."});
					}
						});
					});
					}
		});
		});
	};  
	
	this.EditOrder = function(orderdata, res)
	{
		var sql ='';
		connection.acquire(function (err, con) {
			for(var i = 0 ; i < orderdata.length;i++)
			{
				if(orderdata[i].freeqty == '')
					orderdata[i].freeqty =0;
				
				if(orderdata[i].orderdetailsid == undefined)
				{
				sql = sql+'INSERT INTO `orderdetails`(`orderid`, `productid`, `mrp`, `unitprice`, `qty`, `freeqty`, `netprice`, `taxpercent`) VALUES ('+orderdata[0].orderid+','+orderdata[i].productid+','+orderdata[i].mrp+','+orderdata[i].unitprice+','+orderdata[i].qty+','+orderdata[i].freeqty+','+orderdata[i].amount+','+orderdata[i].taxpercent+');'
				}
				else
				{
					sql = sql+' UPDATE `orderdetails` SET `productid` = '+orderdata[i].productid+',`mrp`='+orderdata[i].mrp+',`unitprice`='+orderdata[i].unitprice+',`qty`='+orderdata[i].qty+',`freeqty`='+orderdata[i].freeqty+',`netprice`='+orderdata[i].netprice+',`taxpercent`='+orderdata[i].taxpercent+' WHERE `orderid`= '+orderdata[i].orderid+' AND `productid` = '+orderdata[i].existprdid+' AND `mrp` = '+orderdata[i].existingmrp+';';
				}
			}
			    sql = sql+'UPDATE `ordermaster` SET `grossamount`= '+orderdata[0].grossamount+',`taxamount`= '+orderdata[0].taxamount+',`netamount`= '+orderdata[0].netamount+'WHERE `id` = '+orderdata[0].orderid;
				
				con.query(sql, function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Update Order "});
					}
						
					else
					{
						res.send({status:0,message:"Order Updated Successfully."});
					}
						});
		});
	}
	
	
	this.DeleteSalesOrder= function (orderid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `ordermaster` WHERE `id` = '+orderid+';DELETE FROM `orderdetails` WHERE `orderid` = '+orderid+';', function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Sales Order"});
					}
					else
					{
						res.send({status:0,message:"Sales Order Deleted Successfully."});
					}
			});
		});
	};
	
	this.GetMrponproductname= function (productname, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT `mrp` FROM `products` WHERE `name` = "'+productname+'"', function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"no data found"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	this.StcokBalCheck= function (productname,mrp, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT SUM(qty) as balqty FROM `grdetails` WHERE productsid = (SELECT products.id FROM products WHERE products.name = "'+productname+'" AND mrp = '+mrp+' limit 1)', function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"no data found"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	
				/* DASHBOARD */
				
				
	this.ListUserReviews= function (userlevel,userid, res) {
		connection.acquire(function (err, con) {
			if(userlevel == "HO")
				{
					var sql = 'SELECT *,(SELECT user.username FROM user WHERE user.id = userreview.userid) as username,(SELECT user.username FROM user WHERE user.id = userreview.createdby) as reviewedby FROM userreview ORDER BY id DESC'
				}
				else
				{
					var sql = 'SELECT *,(SELECT user.username FROM user WHERE user.id = userreview.userid) as username,(SELECT user.username FROM user WHERE user.id = userreview.createdby) as reviewedby FROM userreview WHERE userreview.createdby = '+userid+' ORDER BY id DESC'
				}
				con.query(sql, function (err, result) {
				con.release();
				if(err)
					{
						
					}
					else
					{
						res.send(result);
					}
			});
		});
		};
		
		this.deleteReview= function (id, res) {
		connection.acquire(function (err, con) {
			
				con.query('DELETE FROM `userreview` WHERE `id` = '+id, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:'Failed to delete record'});
					}
					else
					{
						res.send({status:0,message:'Record deleted successfully'});
					}
			});
		});
		};
		
	this.getDashboardCount= function (interval,userlevel,userid, res) {
		connection.acquire(function (err, con) {
			if(userlevel == "HO")
				{
					if(interval == "Today")
			{
		var sql = 'SELECT username,(SELECT COUNT(*) FROM customers) as customers,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats != "1" AND DATE_FORMAT(enquiry.enqdate,"%Y-%m-%d") =CURDATE()) as newenq,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats = "1" AND DATE_FORMAT(enquiry.connectiondate,"%Y-%m-%d") = CURDATE()) as newconn,(SELECT COUNT(complaints.id) FROM complaints WHERE DATE_FORMAT(complaints.complaintdate,"%Y-%m-%d") = CURDATE()) as compl,(SELECT SUM(collection.amount) FROM collection WHERE DATE_FORMAT(collection.createddate,"%Y-%m-%d") = CURDATE()) as totalcollection FROM user WHERE userlevel = "HO" limit 1';
			}
			if(interval == "Month")
			{
				var sql = 'SELECT username,(SELECT COUNT(*) FROM customers) as customers,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats != "1" AND MONTH(enquiry.enqdate) =MONTH(CURDATE()) AND YEAR(enquiry.enqdate) = YEAR(CURDATE())) as newenq,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats = "1" AND MONTH(enquiry.connectiondate) = MONTH(CURDATE()) AND YEAR(enquiry.connectiondate) = YEAR(CURDATE())) as newconn,(SELECT COUNT(complaints.id) FROM complaints WHERE MONTH(complaints.complaintdate) = MONTH(CURDATE()) AND YEAR(complaints.complaintdate) = YEAR(CURDATE())) as compl,(SELECT SUM(collection.amount) FROM collection WHERE MONTH(collection.createddate) = MONTH(CURDATE()) AND YEAR(collection.createddate) = YEAR(CURDATE())) as totalcollection FROM user WHERE userlevel = "HO" LIMIT 1';
			}
			if(interval == "Week")
			{
				var sql = 'SELECT username,(SELECT COUNT(*) FROM customers) as customers,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats != "1" AND WEEKOFYEAR(enquiry.enqdate) = WEEKOFYEAR(NOW())) as newenq,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats = "1" AND WEEKOFYEAR(enquiry.connectiondate) = WEEKOFYEAR(NOW())) as newconn,(SELECT COUNT(complaints.id) FROM complaints WHERE WEEKOFYEAR(complaints.complaintdate) = WEEKOFYEAR(NOW())) as compl,(SELECT SUM(collection.amount) FROM collection WHERE WEEKOFYEAR(collection.createddate) = WEEKOFYEAR(NOW())) as totalcollection FROM user WHERE userlevel = "HO" LIMIT 1';
			}
				}
				else
				{
					if(interval == "Today")
			{
				var sql = 'SELECT username,(SELECT COUNT(*) FROM customers) as customers,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats != "1" AND DATE_FORMAT(enquiry.enqdate,"%Y-%m-%d") =CURDATE()  AND (enquiry.userid = user.id OR enquiry.createdby = user.id)) as newenq,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats = "1" AND DATE_FORMAT(enquiry.connectiondate,"%Y-%m-%d") = CURDATE()  AND (enquiry.userid = user.id OR enquiry.createdby = user.id)) as newconn,(SELECT COUNT(complaints.id) FROM complaints WHERE DATE_FORMAT(complaints.complaintdate,"%Y-%m-%d") = CURDATE() AND (complaints.userid = user.id OR complaints.createdby = user.id)) as compl,(SELECT SUM(collection.amount) FROM collection WHERE DATE_FORMAT(collection.createddate,"%Y-%m-%d") = CURDATE() AND collection.createdby = user.id) as totalcollection FROM user WHERE  user.id = '+userid;
			}
			if(interval == "Month")
			{
				var sql = 'SELECT username,(SELECT COUNT(*) FROM customers) as customers,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats != "1" AND MONTH(enquiry.enqdate) = MONTH(NOW()) AND (enquiry.userid = user.id OR enquiry.createdby = user.id)) as newenq,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats = "1" AND MONTH(enquiry.connectiondate) = MONTH(NOW())  AND (enquiry.userid = user.id OR enquiry.createdby = user.id)) as newconn,(SELECT COUNT(complaints.id) FROM complaints WHERE MONTH(complaints.complaintdate) = MONTH(CURDATE()) AND (complaints.userid = user.id OR complaints.createdby = user.id)) as compl,(SELECT SUM(collection.amount) FROM collection WHERE MONTH(collection.createddate) = MONTH(CURDATE()) AND YEAR(collection.createddate) = YEAR(CURDATE()) AND collection.createdby = user.id) as totalcollection FROM user WHERE user.id = '+userid;
			}
			if(interval == "Week")
			{
				var sql = 'SELECT username,(SELECT COUNT(*) FROM customers) as customers,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats != "1" AND WEEKOFYEAR(enquiry.enqdate) = WEEKOFYEAR(NOW()) AND (enquiry.userid = user.id OR enquiry.createdby = user.id)) as newenq,(SELECT COUNT(*) FROM enquiry WHERE enquiry.conectionstats = "1" AND WEEKOFYEAR(enquiry.connectiondate) = WEEKOFYEAR(NOW())  AND (enquiry.userid = user.id OR enquiry.createdby = user.id)) as newconn,(SELECT COUNT(complaints.id) FROM complaints WHERE WEEKOFYEAR(complaints.complaintdate) = WEEKOFYEAR(NOW()) AND (complaints.userid = user.id OR complaints.createdby = user.id)) as compl,(SELECT SUM(collection.amount) FROM collection WHERE WEEKOFYEAR(collection.createddate) = WEEKOFYEAR(NOW()) AND collection.createdby = user.id) as totalcollection FROM user WHERE user.id = '+userid;
			}
				}
			con.query(sql, function (err, result) {
				con.release();
				if(err)
					{
						
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	this.getPopulerPlans = function(req,res)
	{
		connection.acquire(function (err, con) {
			con.query("SELECT  id,concat(name,'_',type,'_',validity) as plan,(SELECT COUNT(enquiry.plan) FROM enquiry WHERE enquiry.plan = plans.id) AS plansaled FROM plans GROUP BY id ORDER BY id DESC", function (err, result) {
				if(err)
				{}
				else
				{
					res.send(result);
				}
			});
		});
	};
		this.getAnnualsalesReport = function(req,res)
	{
		var result1=[];
		var result=[];
		 connection.acquire(function (err, con) {
			con.query('SELECT MONTHNAME(STR_TO_DATE(Month(a.enqdate), "%m")) as category,(SELECT COUNT(*) FROM enquiry e1 WHERE e1.conectionstats = 0 AND MONTH(e1.enqdate) = Month(a.enqdate)) as value1,(SELECT COUNT(*) FROM enquiry e1 WHERE e1.conectionstats = 1 AND MONTH(e1.enqdate) = Month(a.enqdate)) as value2,0 as value3 FROM enquiry a  GROUP BY Year(a.enqdate), Month(a.enqdate)', function (err, result) {
				
				if(err)
					{
						
					}
					else
					{
						con.query('SELECT MONTHNAME(STR_TO_DATE(Month(a.complaintdate), "%m")) as category,(SELECT COUNT(*) FROM complaints WHERE MONTH(complaints.complaintdate) = MONTH(a.complaintdate)) as value3,0 as value1,0 as value2 FROM complaints a GROUP BY Year(a.complaintdate), Month(a.complaintdate)', function (err, result1) {
							if(result[0] == undefined)
							{
								con.query('SELECT MONTHNAME(STR_TO_DATE(Month(a.complaintdate), "%m")) as category,0 as value1,0 as value2,0 as value3', function (err, resultundefined) {
								
								var result = resultundefined;
							});
							}
							if(result1[0] == undefined)
							{
								con.query('SELECT MONTHNAME(STR_TO_DATE(Month(a.complaintdate), "%m")) as category,0 as value1,0 as value2,0 as value3', function (err, result1undefined) {
								
								var result1 = result1undefined;
							});
							}
							
							if(result1.length < result.length)
							{
								
								for(var i = 0 ; i < result.length;i++)
								{
									for(var j = 0 ; j < result1.length;j++)
									{
									if(result[i].category == result1[j].category)
									{
										result[i].value3 = result1[j].value3;
									}
									}
								}
								res.send(result);
							}
							
							if(result1.length > result.length)
							{
								
								for(var i = 0 ; i < result1.length;i++)
								{
									for(var j =0;j < result.length;j++)
									{
									if(result1[i].category == result[j].category)
									{
										result1[i].value1 = result[j].value1;
										result1[i].value2 = result[j].value2;
									}
									}
								}
								res.send(result1);
							}
							if(result1.length == result.length)
							{
							for(var i = 0 ; i < result1.length;i++)
								{
									for(var j =0;j < result.length;j++)
									{
									if(result1[i].category == result[j].category)
									{
										result1[i].value1 = result[j].value1;
										result1[i].value2 = result[j].value2;	
									}
									
									}
								}
								res.send(result1);
							}
						});
						con.release();
					}
			});
		}); 
	};
	
	
	/* INVOICE */
	
	this.InvoiceCreate= function (invoicedata, res) {
		 var ss = '';
		 connection.acquire(function (err, con) {
			 con.query('SELECT * FROM `invoicemaster` WHERE `orderid` = '+invoicedata[0].orderid,function (err, resultduplicate) {
					con.release();
					if(resultduplicate == undefined || resultduplicate.length == 0)
					{
							connection.acquire(function (err, con) {
				con.query('INSERT INTO `invoicemaster`( `orderid`,`orderfrom`, `entityaddress`, `orderto`, `grossamount`, `taxamount`, `netamount`, `taxpercent`, `createdby`) VALUES  ('+invoicedata[0].orderid+','+invoicedata[0].orderfrom+',"'+invoicedata[0].diliveryaddress+'",'+invoicedata[0].orderto+','+invoicedata[0].grossamount+','+invoicedata[0].taxamount+','+invoicedata[0].netamount+','+invoicedata[0].taxpercent+','+invoicedata[0].createdby+');UPDATE ordermaster set orderstatus = "Order Shipped" WHERE id = '+invoicedata[0].orderid+';', function (err, result1) {
					con.release();
					console.log(err);
					if(err)
					{
						res.send({status:1,message:"Failed To Create Invoice"});
					}
					else
					{
						connection.acquire(function (err, con) {
							for(var i = 0 ; i < invoicedata.length;i++)
		 {	
					if(invoicedata[i].freeqty == "")
						invoicedata[i].freeqty = 0;
				
			 ss = ss + '('+result1[0].insertId+','+invoicedata[i].productid+','+invoicedata[i].unitprice+','+invoicedata[i].mrp+','+invoicedata[i].qty+','+invoicedata[i].freeqty+','+invoicedata[i].netprice+','+invoicedata[i].taxpercent+'),';
		 }
		 ss = ss.substr(0,ss.length-1);
				con.query('INSERT INTO `invoicedetails`(`invoiceid`, `productid`, `unitprice`,`mrp`, `qty`,`freeqty`, `netprice`, `taxpercent`) VALUES  '+ss, function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Create Invoice "});
					}
						
					else
					{
						res.send({status:0,message:"Invoice Created Successfully."});
					}
						});
					});
					}
		});
		});
					}
					else
					{
						res.send({status:01,message:"Invoice Already Created"});
					}
					
				});
		 });
	
	};
				
  
  this.DistributorInvoiceList= function (interval,custtype, res) {
		if(interval == 'Today')
		{
			var orderinterval = 'DATE_FORMAT(invoicedate,"%Y-%m-%d") = CURDATE() AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = invoicemaster.orderfrom) = "'+custtype+'"';
		}
		if(interval == 'Week')
		{
			var orderinterval = 'WEEKOFYEAR(invoicedate) = WEEKOFYEAR(NOW()) AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = invoicemaster.orderfrom) = "'+custtype+'"';
		}
		if(interval == 'Month')
		{
			var orderinterval = 'MONTH(invoicedate) = MONTH(CURDATE()) AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = invoicemaster.orderfrom) = "'+custtype+'"';
		}
		connection.acquire(function (err, con) {
			var sql = con.query('SELECT `id`,`orderid`,`invoicedate`,`netamount`,deliveryboy,(SELECT user.username FROM user WHERE user.id = invoicemaster.deliveryboy) as deliveryboyname,(SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = invoicemaster.`orderfrom`) as customername,orderfrom,orderto,(SELECT user.username FROM user WHERE user.id = invoicemaster.orderto) as deponame,orderid FROM `invoicemaster` where '+orderinterval+'', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.setDeliveryBoy= function (invoiceid,dboyid,orderid, res) {
		connection.acquire(function (err, con) {
		 con.query('UPDATE invoicemaster SET `deliveryboy` = '+dboyid+' WHERE `id` = '+invoiceid+';UPDATE ordermaster set orderstatus = "Out For Delivery" WHERE id = '+orderid+';', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.GetInvoiceDetails= function (invoiceid, res) {
		connection.acquire(function (err, con) {
		 con.query('SELECT invoicemaster.orderfrom,invoicemaster.grossamount,invoicemaster.taxamount,invoicemaster.invoicedate,invoicemaster.netamount,invoicedetails.*, invoicemaster.id as invoiceid,invoicedetails.id as invoivedetailsid,(select sum(invoicedetails.qty) from invoicedetails where invoicedetails.invoiceid = invoicemaster.id) as totalqty,(SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = invoicemaster.orderfrom) as customername,(SELECT entitymaster.contactperson FROM entitymaster WHERE entitymaster.id = invoicemaster.orderfrom) as contactperson,(SELECT user.username FROM user WHERE user.id = invoicemaster.orderto) as deponame,(SELECT entitymaster.diliveryaddress FROM entitymaster WHERE entitymaster.id = invoicemaster.orderfrom) as diliveryaddress,(SELECT CONCAT(entitymaster.mobile1," / ",entitymaster.mobile2) FROM entitymaster WHERE entitymaster.id = invoicemaster.orderfrom) as contactdetails,(select products.name from products where products.id = invoicedetails.productid) as product FROM `invoicemaster` , `invoicedetails` WHERE invoicemaster.id = '+invoiceid+' AND invoicedetails.invoiceid ='+invoiceid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.UpdateinvoiceOrder= function (invoicedetails, res) {
		var ss = ''
		for(var i = 0 ; i < invoicedetails.length;i++)
		{
			ss = ss+'UPDATE `invoicedetails` SET `qty`='+invoicedetails[i].qty+',`freeqty`='+invoicedetails[i].freeqty+',`netprice`='+invoicedetails[i].amount+' WHERE `invoiceid` = '+invoicedetails[i].invoiceid+' AND `productid` = '+invoicedetails[i].productid+';'
		}
		ss= ss+'UPDATE invoicemaster SET `grossamount` = '+invoicedetails[0].grossamount+',`taxamount`='+invoicedetails[0].taxamount+',`netamount`='+invoicedetails[0].netamount+' WHERE `id` = '+invoicedetails[0].invoiceid+';';
		connection.acquire(function (err, con) {
		 con.query(ss, function (err, result) {
				con.release();
				if(err)
				{
					res.send({status:1,message:'Failed To Updated record'});
				}
				else
					res.send({status:0,message:'Record Updated Successfullty'});
			});
		});
	}; 
	
	this.ListInvoiceForSalesReturns= function (req, res) {
		connection.acquire(function (err, con) {
		 con.query('SELECT `id` FROM `invoicemaster` WHERE id NOT IN (SELECT salesreturnmaster.invoiceid FROM salesreturnmaster)', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.ListSalesReturns= function (req, res) {
		connection.acquire(function (err, con) {
		 con.query('SELECT `id`,`createddate`,`invoiceid`,`netamount` FROM `salesreturnmaster`', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.GetSalesReturnsDetails= function (salesreturnid, res) {
		connection.acquire(function (err, con) {
		 con.query('SELECT a.id as masterid,b.id as detailsid,a.`netamount`,a.`taxamount`,a.`grossamount`,a.`invoiceid`,a.`createddate`,b.`productid`,b.`recieveqty`,b.`defectiveqty`,b.`okqty`,b.`salerate`,b.`mrp`,b.`taxpercent`,b.`netvalue`,(select products.name from products where products.id = b.productid) as name FROM salesreturnmaster a ,salesreturndetails b WHERE a.id = '+salesreturnid+' AND b.salesreturnid = '+salesreturnid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.DeleteSalesReturn= function (salesreturnid, res) {
		connection.acquire(function (err, con) {
		 con.query('DELETE FROM `salesreturnmaster` WHERE salesreturnmaster.id = '+salesreturnid+'; DELETE FROM `salesreturndetails` where salesreturndetails.salesreturnid = '+salesreturnid, function (err, result) {
				con.release();
				console.log(err);
				if(err)
				{res.send({status:0,message:'Failed To Delete Record'});}
				else
				{res.send({status:0,message:'Record Deleted Successfully'});}
			});
		});
	}; 
	
	this.AddSalesreturnDetails= function (salesreturns, res) {
		var ss = '';
		
		
		connection.acquire(function (err, con) {
		 con.query('INSERT INTO `salesreturnmaster`(`invoiceid`, `grossamount`, `taxamount`, `netamount`) VALUES (?,?,?,?)',[salesreturns[0].invoiceid,salesreturns[0].grossamount,salesreturns[0].taxamount,salesreturns[0].netamount], function (err, result1) {
				con.release();
				if(err)
					{}
				else
					{
						for(var i = 0 ;i < salesreturns.length;i++)
		{
			if(salesreturns[i].defqty == undefined)
				salesreturns[i].defqty = 0;
			
			ss = ss+'('+result1.insertId+','+salesreturns[i].productid+','+salesreturns[i].qty+','+salesreturns[i].defqty+','+salesreturns[i].okqty+','+salesreturns[i].unitprice+','+salesreturns[i].mrp+','+salesreturns[i].taxpercent+','+salesreturns[i].netprice+'),'
		}
		ss = ss.substr(0, ss.length - 1);
						connection.acquire(function (err, con) {
							con.query('INSERT INTO `salesreturndetails`(`salesreturnid`, `productid`, `recieveqty`, `defectiveqty`, `okqty`, `salerate`, `mrp`, `taxpercent`, `netvalue`) VALUES '+ss, function (err, result){
								con.release();
								if(err)
								{res.send({status:1,message:'Failed To Inserted Record'});}
							else
								{res.send({status:0,message:'record Inserted Successfully'});}
							});
						});
					}
					
			});
		});
	}; 
	
	this.EditSalesreturnDetails= function (salesreturns, res) {
		connection.acquire(function (err, con) {
				con.query('UPDATE `salesreturnmaster` set`grossamount` = '+salesreturns[0].grossamount+', `taxamount` = '+salesreturns[0].taxamount+', `netamount` = '+salesreturns[0].netamount+' where salesreturnmaster.id = '+salesreturns[0].masterid, function (err, result1) {
					con.release();
					if(err)
					{
						console.log("Failed To Update Data");
					}
					else
					{
						connection.acquire(function (err, con) {
							var ss = '';
							for(var i = 0 ; i < salesreturns.length;i++)
							{
								ss = ss + 'UPDATE `salesreturndetails` SET `salerate`='+salesreturns[i].salerate+',`recieveqty`='+salesreturns[i].recieveqty+',`defectiveqty`='+salesreturns[i].defectiveqty+',`okqty`='+salesreturns[i].okqty+',`netvalue`='+salesreturns[i].amount+',`taxpercent`='+salesreturns[i].taxpercent+' WHERE `salesreturnid`='+salesreturns[i].masterid+' AND `productid`='+salesreturns[i].productid+';';
							}
							ss = ss.substr(0, ss.length - 1);
							con.query(ss, function (err, result) {
								if(err)
								{res.send({status:1,message:"Failed To Update Data"});}
								else
								{res.send({status:0,message:"Record Updated Successfully.",insertId:result.insertId});}
							});
						});
						
					}
				});
		});
	}; 
	
			/* RECIEPTS */  
			
			this.AddReciept= function (recieptsdetails, res) {
		connection.acquire(function (err, con) {
		 con.query('INSERT INTO `reciepts`(`invoiceid`, `orderfrom`, `amount`, `paymentmode`, `chqno`, `chqdate`, `branch`, `paidamount`, `pendingamount`,`createdby`) VALUES (?,?,?,?,?,?,?,?,?,?)',[recieptsdetails[0].invoiceid,recieptsdetails[0].orderfrom,recieptsdetails[0].netamount,recieptsdetails[0].paymentmode,recieptsdetails[0].chqno,recieptsdetails[0].chqdate,recieptsdetails[0].branch,recieptsdetails[0].paidamount,recieptsdetails[0].pendingamount,recieptsdetails[0].createdby], function (err, result) {
				con.release();
				console.log(err);
				if(err)
				{res.send({status:0,message:'Failed To Delete Record'});}
				else
				{res.send({status:0,message:'Record Deleted Successfully'});}
			});
		});
	}; 
	
	
	this.ListCustomerReciepts= function (interval,custtype, res) {
		if(interval == 'Today')
		{
			var orderinterval = 'DATE_FORMAT(`createddate`,"%Y-%m-%d") = CURDATE() AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = reciepts.orderfrom) = "'+custtype+'"';
		}
		if(interval == 'Week')
		{
			var orderinterval = 'WEEKOFYEAR(createddate) = WEEKOFYEAR(NOW()) AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = reciepts.orderfrom) = "'+custtype+'"';
		}
		if(interval == 'Month')
		{
			var orderinterval = 'MONTH(createddate) = MONTH(CURDATE()) AND (SELECT entitymaster.entitytype FROM entitymaster WHERE entitymaster.id = reciepts.orderfrom) = "'+custtype+'"';
		}
		connection.acquire(function (err, con) {
			var sql = con.query('SELECT `id`,createddate,`invoiceid`,paymentmode,(SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = reciepts.orderfrom) as customername,`paidamount`,`pendingamount` FROM `reciepts` WHERE '+orderinterval+'', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.getRecieptDetails= function (recieptid, res) {
		connection.acquire(function (err, con) {
		 con.query('SELECT *,(select entitymaster.entityname from entitymaster where entitymaster.id = reciepts.orderfrom) as customername,(SELECT invoicemaster.invoicedate FROM invoicemaster WHERE invoicemaster.id = reciepts.invoiceid) as invoicedate,(SELECT SUM(a.paidamount) FROM reciepts a WHERE a.invoiceid = reciepts.invoiceid) as totalpaid FROM `reciepts` WHERE id = '+ recieptid, function (err, result) {
				con.release();
				if(err)
				{res.send({status:0,message:'No Record Found'});}
				else
				{res.send(result);}
			});
		});
	}; 
	
	this.getChequerecieptdata= function (fromdate,todate, res) {
		connection.acquire(function (err, con) {
			if(todate == "undefined")
			{
				var sql = 'SELECT reciepts.createddate,(SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = reciepts.orderfrom) as customername,`invoiceid`,`paidamount`,`chqno`,`chqdate`,`branch`,(SELECT user.username FROM user WHERE user.id = reciepts.createdby) as username, (SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = (SELECT entitymaster.area FROM entitymaster WHERE entitymaster.id = reciepts.orderfrom)) as area FROM reciepts WHERE reciepts.paymentmode = "Cheque" AND DATE_FORMAT(reciepts.createddate,"%Y-%m-%d") = "'+fromdate+'"';
			}
			else
			{
				var sql = 'SELECT reciepts.createddate,(SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = reciepts.orderfrom) as customername,`invoiceid`,`paidamount`,`chqno`,`chqdate`,`branch`,(SELECT user.username FROM user WHERE user.id = reciepts.createdby) as username, (SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = (SELECT entitymaster.area FROM entitymaster WHERE entitymaster.id = reciepts.orderfrom)) as area FROM reciepts WHERE reciepts.paymentmode = "Cheque" AND DATE_FORMAT(reciepts.createddate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'"';
			}
		 con.query(sql, function (err, result) {
				con.release();
				console.log(err);
				if(err)
				{res.send({status:0,message:'No Record Found'});}
				else
				{res.send(result);}
			});
		});
	}; 
	
	
	this.EdiRecieptDetails = function(user, res) {
		connection.acquire(function(err, con) {
			
			if(user[0].paidamountnew)
		 {
		
		 con.query('INSERT INTO `reciepts`(`invoiceid`, `orderfrom`, `amount`, `paymentmode`, `chqno`, `chqdate`, `branch`, `paidamount`, `pendingamount`, `createdby`) VALUES (?,?,?,?,?,?,?,?,?,?)',[user[0].invoiceid,user[0].orderfrom,user[0].amount,user[0].paymentmodenew,user[0].chqnonew,user[0].chqdatenew,user[0].banknew,user[0].paidamountnew,user[0].pendingamountnew,user[0].userid], function(err1, result1) {
        con.release();
		console.log(err1)
        if (err1) {
          res.send({status: 1, message: 'Failed To Update Payment Record'});
        } 
		else {
			res.send({status: 0, message: 'Payment Record Upadeted Sucessfully'});
		}
      });
	
		 }
			else
	{
		 con.query('UPDATE `reciepts` SET `chqno`=?,`chqdate`=?,`branch`=?,`paidamount`=?,`pendingamount`=? WHERE id =?',[user[0].chqno,user[0].chqdate,user[0].branch,user[0].paidamount,user[0].pendingamount,user[0].id], function(err, result) {
        con.release();
		console.log(err)
        if (err) {
          res.send({status: 1, message: 'Failed To Update Payment Record'});
        } 
		else {
			res.send({status: 0, message: 'Payment Record Upadeted Sucessfully'});
		}
      });
	}
	});
  };
  
  this.DeleteReciepts= function (id, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `reciepts` WHERE id = '+id, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Record"});
					}
					else
					{
						res.send({status:0,message:"Record Deleted Successfully."});
					}
			});
		});
	};   


	this.getuserMonthlyReview= function (reviewmonth,selecteduser, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT id,(SELECT COUNT(*) FROM userreview a WHERE a.userid = '+selecteduser+' AND MONTH(a.createddate) = "'+reviewmonth+'" AND a.review = "Good") as gdrvcnt,reason,(SELECT user.fullname from user WHERE user.id = userreview.createdby) as reviewdby,DATE_FORMAT(`createddate`,"%d %b") as rvddt,review,(SELECT COUNT(*) FROM userreview a WHERE a.userid = '+selecteduser+'  AND MONTH(a.createddate) = "'+reviewmonth+'"  AND a.review = "Bad") as bdrvcnt FROM `userreview` WHERE userreview.userid = '+selecteduser+'  AND MONTH(userreview.createddate) = "'+reviewmonth+'"', function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"No Record Found"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};   
	
	
	
	this.getInvoiceidForreciepts= function (custid, res) {
		connection.acquire(function (err, con) {
		 con.query('SELECT invoicemaster.id FROM invoicemaster WHERE invoicemaster.orderfrom = '+custid+' AND invoicemaster.id  NOT IN (SELECT reciepts.invoiceid FROM reciepts)', function (err, result) {
				con.release();
				
				console.log(err);
				if(err)
				{res.send({status:0,message:'No Record Found'});}
				else
				{res.send(result);}
			});
		});
	}; 
	
 	this.UpdateCurrentLocation= function (possition, res) {
		console.log(possition);
		if(possition.userid != undefined)
		{
		/* connection.acquire(function (err, con) {
		 con.query('SELECT * FROM `lastlocation` WHERE `userid` = '+possition.userid, function (err, result) {
				con.release();
				console.log(result)
			  if(result == undefined || result.length <= 0)
			  { */
				  connection.acquire(function(err, con) {
				var sql = con.query('INSERT INTO `lastlocation`(`userid`,`lat`, `lan`, `address`,`loginstatus`,`timing`) values ('+possition.userid+', '+possition.lat+', '+possition.lan+',"'+possition.address+'",1,NOW())',function(err1, result){
				con.release();
				console.log(err1);
			  if(err1)
			  {res.send({status:1 , message:"Failed To Update Record"});}
				else
					{res.send({status:1 , message:"Updated Successfully"});}
				});
				});
			  /* }
				else
					{
						connection.acquire(function(err, con) {
				var sql = con.query('update lastlocation set lat ='+possition.lat+', lan = '+possition.lan+',address = "'+possition.address+'",loginstatus = 1,`timing` = NOW() WHERE `userid` = '+possition.userid,function(err1, result){
				con.release();
			  if(err1)
			  {res.send({status:1 , message:"Failed To Update Record"});}
				else
					{res.send({status:1 , message:"Updated Successfully"});}
				});
				});
					}
			});
		}); */
		}
	};  
	this.listCurentPossition = function(req,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('SELECT *,DATE_FORMAT(timing,"%Y-%m-%d %h:%i:%s %p") as timing,(select username from user where id = lastlocation.userid) as username FROM lastlocation',function(err, result){
			con.release();
			  if(err)
			  {
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
  this.listCurentPossitionWithUser = function(userid,res)
	{ 			
		var selecteduser = userid.replace("number:",'');
		connection.acquire(function(err, con) {
			con.query('SELECT *,DATE_FORMAT(timing,"%Y-%m-%d %h:%i:%s %p") as timing,(select username from user where id = lastlocation.userid) as username FROM lastlocation where userid = '+selecteduser,function(err, result){
			con.release();
			  if(err)
			  {
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };

  this.SetUserreview = function(selecteduser,review,userid,reason,res)
	{ 			
		connection.acquire(function(err, con) {
			con.query('SELECT * FROM `userreview` WHERE `userid` = ? AND `createdby` = ? AND DATE_FORMAT(`createddate`,"%Y-%m-%d") =CURDATE()',[selecteduser,userid],function(err, result){
				console.log(err)
				 if(err)
			  {
					con.release()
					res.send({status:1,message:'Something Went Wrong please try Again'});
			  }
				else
				{
					if(result.length > 0)
				{
					var sql ='UPDATE `userreview` SET `review`="'+review+'",`reason`="'+reason+'" WHERE `id` = '+result[0].id;
				}
				else
				{
					var sql ='INSERT INTO `userreview`(`userid`, `review`,`reason`, `createdby`) VALUES ('+selecteduser+',"'+review+'","'+reason+'",'+userid+')'
				}
				con.query(sql,function(err, result){
			
			  if(err)
			  {
				 con.release()
				 res.send({status:1,message:'Something Went Wrong please try Again'});
			  }
				else
				{
					con.release()
					res.send({status:0,message:'Thank You.!'});
				}
				
			});
				}
				
			});
		});
  };
  
  this.updateLogoutstatus = function(userid,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('UPDATE `currentlocation` SET `loginstatus`= 0 WHERE `userid` = '+userid,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Logout Successfully"});
				}
			});
		});
  };
  

  this.DeleteSelectedProducts = function(products,res)
	{ 				
	   var ss= '';
		connection.acquire(function(err, con) {
			for(var i = 0 ; i < products.length;i++)
			{
				ss =ss+'DELETE FROM `plans` WHERE id = '+products[i].id+';';
			}
			con.query(ss,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Selected Plans Deleted Successfully"});
				}
			});
		});
  };
  
  
  
  this.DeleteSelectedItems = function(products,res)
	{ 				
	   var ss= '';
		connection.acquire(function(err, con) {
			for(var i = 0 ; i < products.length;i++)
			{
				ss =ss+'DELETE FROM `products` WHERE id = '+products[i].id+';';
			}
			con.query(ss,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Selected Products Deleted Successfully"});
				}
			});
		});
  };
  
 
  
  this.DeleteSelectedCustomers = function(customers,res)
	{ 				
	   var ss= '';
		connection.acquire(function(err, con) {
			for(var i = 0 ; i < customers.length;i++)
			{
				ss =ss+'DELETE FROM `customers` WHERE `id` ='+customers[i].id+';';
			}
			console.log(ss);
			con.query(ss,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Selected Customers Deleted Successfully"});
				}
			});
		});
  };
  
  this.getOrderTrack = function(userid,orderdate,res)
	{ 				
		if(orderdate == "undefined")
		{
			var interval = "CURDATE()";
			
		}
		else
		{
			var interval = '"'+orderdate+'"';
		}
		connection.acquire(function(err, con) {
			con.query('SELECT (SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = ordermaster.orderfrom) as entityname,ordermaster.netamount,DATE_FORMAT(orderdate,"%h:%i %p") as ordertime,orderlat,orderlan FROM `ordermaster` WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(orderdate,"%Y-%m-%d") = '+interval+'',function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"No data Found"});
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
  this.getSalesSummary = function(fromdate,todate,userid,res)
	{ 				
		connection.acquire(function(err, con) {
			if(todate == "undefined")
			{
				var sql = 'SELECT products.id,products.name,products.mrp,(IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = "'+fromdate+'")),0)) as qty,(IFNULL((SELECT SUM(orderdetails.freeqty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = "'+fromdate+'")),0)) as freeqty FROM products ORDER BY products.mrp ASC';
			}
			else
			{
				var sql = 'SELECT products.id,products.name,products.mrp,(IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'")),0)) as qty,(IFNULL((SELECT SUM(orderdetails.freeqty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'")),0)) as freeqty FROM products ORDER BY products.mrp ASC';
			}
			con.query(sql,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"No data Found"});
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
						/* OFFLINE */
						
						this.offlineData = function(userid,res)
	{ 				
			connection.acquire(function(err, con) {
				con.query('SELECT * FROM `products` ORDER BY id desc',function(err1, productsdetails){
				if(err1)
				{
				 res.send({status:1,message:"No data Found"});
				}
				else
				{
					
				}
			
			
			con.query('SELECT * FROM `entitymaster` WHERE `userid` = '+userid,function(err2,entitydetails){
				if(err2)
				{
				 res.send({status:1,message:"No data Found"});
				}
				else
				{
					
				}
			
			con.query('SELECT * FROM ordermaster WHERE DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = CURDATE() AND ordermaster.createdby = '+userid,function(err3,ordermasterdata){
				if(err3)
				{
				 res.send({status:1,message:"No data Found"});
				}
				else
				{
					
				}
			
			
			con.query('SELECT * FROM orderdetails WHERE orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = CURDATE() AND ordermaster.createdby = '+userid+')',function(err4,orderdetailsdata){
				if(err4)
				{
				 res.send({status:1,message:"No data Found"});
				}
				else
				{
				
				}
			
			
				con.release();
						res.json({
                                success: true,
                                Products: productsdetails ,
								customers: entitydetails,
								ordermaster: ordermasterdata,
								orderdetails: orderdetailsdata,
                            });
							});
			});
			});
			});
			});
		
  };
  
  
					/* insert offline order data */  
			this.insertofflineorderdata = function(orderdata,res)
			{
				var e1 =0,e2=0;
		 connection.acquire(function(err, con) {
				for(var i = 0 ; i < orderdata[0].length;i++)
				{
					con.query('INSERT INTO `ordermaster`(`orderfrom`, `orderto`, `grossamount`, `taxamount`, `netamount`,`createdby`, `orderstatus`,`offlineorderid`) VALUES ('+orderdata[0][i].orderfrom+','+orderdata[0][i].orderto+','+orderdata[0][i].grossamount+','+orderdata[0][i].taxamount+','+orderdata[0][i].netamount+','+orderdata[0][i].createdby+',"Order Placed",'+orderdata[0][i].id+')',function(err3,result1){
									if(err3)
									{
										e1 = 1;
									}
							con.query('select offlineorderid from ordermaster where ordermaster.id = '+result1.insertId,function(errtemp,orderid){
							var ss = '';
					for(var j = 0 ; j < orderdata[1].length;j++)
					{
						if(orderid[0].offlineorderid == orderdata[1][j].orderid)
						{
							ss = ss+'('+result1.insertId+','+orderdata[1][j].productid+','+orderdata[1][j].mrp+','+orderdata[1][j].unitprice+','+orderdata[1][j].qty+','+orderdata[1][j].freeqty+','+orderdata[1][j].netprice+','+orderdata[1][j].taxpercent+'),';
						}
					}
					ss = ss.substr(0, ss.length - 1);
							
					con.query('INSERT INTO `orderdetails`(`orderid`, `productid`, `mrp`, `unitprice`, `qty`, `freeqty`, `netprice`, `taxpercent`) VALUES'+ss,function(err,result){
						if(err)
									{
										e2 = 1;
									}
					});
					});
					});
				}
				if(e1 == 1 && e2 == 1)
				{
					res.send({status:'0',message:'Somethig Went Worng'});
				}
				else
				{
					res.send({status:'1',message:'Successfullty Inserted'});
				}					
				con.release();
				
				}); 
			};
			
			
			/* Raw Products */
			
			/* PRODUCTS */
	
	this.UpaloadProducts= function (product, res) {
				var ss = '';
							for(var i = 0 ; i < product.length;i++)
							{
								
								if(product[i].DTDS6 == undefined)
								{product[i].DTDS6 = 0;}
								if(product[i].DTDS7 == undefined)
								{product[i].DTDS7 = 0;}
								
								if(product[i].DTDS1 == undefined)
								{product[i].DTDS1 = 'N.A.';}
								if(product[i].DTDS2 != undefined)
								{
									ss = ss+'INSERT INTO `plans`(`name`, `type`,`validity`,`twlmprice`,`cgst`, `sgst`) VALUES ("'+product[i].DTDS0+'","'+product[i].DTDS1+'","12 Months",'+product[i].DTDS2+','+product[i].DTDS6+','+product[i].DTDS7+');'
								}
							if(product[i].DTDS3 != undefined)
								{
									ss = ss+'INSERT INTO `plans`(`name`, `type`,`validity`,`sixmprice`,`cgst`, `sgst`) VALUES ("'+product[i].DTDS0+'","'+product[i].DTDS1+'","6 Months",'+product[i].DTDS3+','+product[i].DTDS6+','+product[i].DTDS7+');'
								}
								if(product[i].DTDS4 != undefined)
								{
									ss = ss+'INSERT INTO `plans`(`name`, `type`,`validity`,`thrmprice`,`cgst`, `sgst`) VALUES ("'+product[i].DTDS0+'","'+product[i].DTDS1+'","3 Months",'+product[i].DTDS4+','+product[i].DTDS6+','+product[i].DTDS7+');'
								}
								if(product[i].DTDS5 != undefined)
								{
									ss = ss+'INSERT INTO `plans`(`name`, `type`,`validity`,`onemprice`,`cgst`, `sgst`) VALUES ("'+product[i].DTDS0+'","'+product[i].DTDS1+'","1 Months",'+product[i].DTDS5+','+product[i].DTDS6+','+product[i].DTDS7+');'
								}
							}
							
				connection.acquire(function (err, con) {
			
				con.query(ss, function (err, result) {
					con.release();
					console.log(err)
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Product"});
					}
					else
					{
						res.send({status:0,message:"New Product Added Successfully."});
					}
				});
			
		});
	};   
	
	this.addRawProducts= function (product, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT * FROM `rawproducts` where name=? AND  mrp = ?',[product.name,product.mrp], function (err, result1) {
			if(result1.length > 0)
			{res.send({status:2,message:"Product Name Already Exist"});}
			else
			{
				product.taxpercent = parseFloat(product.cgst) +  parseFloat(product.sgst);
		con.query('INSERT INTO `rawproducts` set ?',[product], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Product"});
					}
					else
					{
						res.send({status:0,message:"New Product Added Successfully.",insertId:result.insertId});
					}
				});
			}
		});
		});
	};   
	this. rawProductList = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(IFNULL((SELECT SUM(rawgrdetails.qty) FROM rawgrdetails WHERE rawgrdetails.productsid = rawproducts.id),0) - IFNULL((SELECT SUM(raworderdetails.qty) FROM raworderdetails WHERE raworderdetails.productid = rawproducts.id),0)) as balance FROM `rawproducts`', function (err, result) {
				con.release();
				console.log(err);
				res.send(result);
			});
		});
	}; 
	
	this.editRawProduct= function (product, res) {
		connection.acquire(function (err, con) {
				con.query('update rawproducts set ? where id= ?',[product[0],product[0].id], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Update Product"});
					}
					else
					{
						res.send({status:0,message:"Product Updated Successfully."});
					}
		});
		});
	}; 
	
	this.getRawProductData= function (productid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `rawproducts` where id = '+productid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 

	this.DeleteRawProduct= function (productid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `rawproducts` where id = '+productid, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Product"});
					}
					else
					{
						res.send({status:0,message:"Product Deleted Successfully."});
					}
			});
		});
	};
			
			
			 this.DeleteSelectedrawProducts = function(products,res)
	{ 				
	   var ss= '';
		connection.acquire(function(err, con) {
			for(var i = 0 ; i < products.length;i++)
			{
				ss =ss+'DELETE FROM `rawproducts` WHERE id = '+products[i].id+';';
			}
			con.query(ss,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Selected Products Deleted Successfully"});
				}
			});
		});
  };

  
  
	this.GetRawStockStratement= function (fromdate,todate, res) {
		connection.acquire(function (err, con) {
			if(todate == "undefined")
			{
				var sql = 'SELECT rawproducts.name,(SELECT SUM(rawgrdetails.qty) FROM rawgrdetails WHERE rawgrdetails.productsid = rawproducts.id AND rawgrdetails.grid in (SELECT rawgrmaster.id FROM rawgrmaster WHERE DATE_FORMAT(rawgrmaster.createddate,"%Y-%m-%d") = "'+fromdate+'")) as recqty,((SELECT sum(rawgrdetails.qty) FROM rawgrdetails WHERE rawgrdetails.productsid = rawproducts.id AND rawgrdetails.grid in (SELECT rawgrmaster.id FROM rawgrmaster WHERE DATE_FORMAT(rawgrmaster.createddate,"%Y-%m-%d") < "'+fromdate+'")) - (SELECT SUM(raworderdetails.qty)  FROM raworderdetails WHERE raworderdetails.productid = rawproducts.id AND raworderdetails.orderid in (SELECT rawordermaster.id FROM rawordermaster WHERE DATE_FORMAT(rawordermaster.orderdate,"%Y-%m-%d") < "'+fromdate+'"))) as opningbal,(SELECT SUM(raworderdetails.qty)  FROM raworderdetails WHERE raworderdetails.productid = rawproducts.id AND raworderdetails.orderid in (SELECT rawordermaster.id FROM rawordermaster WHERE DATE_FORMAT(rawordermaster.orderdate,"%Y-%m-%d") = "'+fromdate+'")) as issuedqty FROM rawproducts ORDER BY rawproducts.mrp ASC';
			}
		else
		{
			var sql= 'SELECT rawproducts.name,(SELECT SUM(rawgrdetails.qty) FROM rawgrdetails WHERE rawgrdetails.productsid = rawproducts.id AND rawgrdetails.grid in (SELECT rawgrmaster.id FROM rawgrmaster WHERE DATE_FORMAT(rawgrmaster.createddate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'")) as recqty,((SELECT sum(rawgrdetails.qty) FROM rawgrdetails WHERE rawgrdetails.productsid = rawproducts.id AND rawgrdetails.grid in (SELECT rawgrmaster.id FROM rawgrmaster WHERE DATE_FORMAT(rawgrmaster.createddate,"%Y-%m-%d") < "'+fromdate+'")) - (SELECT SUM(raworderdetails.qty) FROM raworderdetails WHERE raworderdetails.productid = rawproducts.id AND raworderdetails.orderid in (SELECT rawordermaster.id FROM rawordermaster WHERE DATE_FORMAT(rawordermaster.orderdate,"%Y-%m-%d") < "'+fromdate+'"))) as opningbal,(SELECT SUM(raworderdetails.qty) FROM raworderdetails WHERE raworderdetails.productid = rawproducts.id AND raworderdetails.orderid in (SELECT rawordermaster.id FROM rawordermaster WHERE DATE_FORMAT(rawordermaster.orderdate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'")) as issuedqty FROM rawproducts ORDER BY rawproducts.mrp ASC ';
		}
		var querrry = con.query(sql, function (err, result) {
			con.release();
			if(err)
			{}
			else
			{res.send(result)}
		});
		});
	};
  
  this.AddrawSalesOrder= function (rawproductdetails, res) {
	  var ss= '';
		connection.acquire(function (err, con) {
			con.query('INSERT INTO `rawordermaster`(`orderdate`, `createdby`) VALUES (CURDATE(),'+rawproductdetails[0].createdby+')', function(err,result1){
				if(err)
				{
					res.send({status:1,message:'Failed To Insert Record'});
				}
			else
			{
						for(var i = 0 ; i < rawproductdetails.length;i++)
					{
						if(rawproductdetails[i].qty)
						{
							ss = ss+'('+result1.insertId+','+rawproductdetails[i].id+','+rawproductdetails[i].qty+'),'
						}
					}
					ss = ss.substr(0, ss.length - 1);
					con.query('INSERT INTO `raworderdetails`(`orderid`, `productid`, `qty`) VALUES '+ss, function (err, result) {
						con.release();
						if(err)
						{
							con.query('DELETE FROM `rawordermaster` WHERE id = '+result1.insertId, function(err,result1){
								if(err)
								{}
								else
								{
									res.send({status:1,message:'Failed To Insert Record'});
								}
								});
						}
						else
						{
							res.send({status:1,message:'Record inserted Successfully'});
						}
					});
			}
				
			});
			
		});
	}; 
  
  this.Getraworderlist= function (interval, res) {
		connection.acquire(function (err, con) {
			if(interval == 'Today')
			{
				var sql = 'SELECT *,(SELECT COUNT(*) FROM raworderdetails WHERE raworderdetails.orderid = rawordermaster.id) AS nosku,(SELECT user.username FROM user WHERE user.id = rawordermaster.createdby) as username  FROM `rawordermaster` WHERE `orderdate` = CURDATE()';
			}
			if(interval == 'Week')
			{
				var sql = 'SELECT *,(SELECT COUNT(*) FROM raworderdetails WHERE raworderdetails.orderid = rawordermaster.id) AS nosku,(SELECT user.username FROM user WHERE user.id = rawordermaster.createdby) as username FROM `rawordermaster` WHERE WEEKOFYEAR(`orderdate`) = WEEKOFYEAR(NOW())';
			}
			if(interval == 'Month')
			{
				var sql = 'SELECT *,(SELECT COUNT(*) FROM raworderdetails WHERE raworderdetails.orderid = rawordermaster.id) AS nosku,(SELECT user.username FROM user WHERE user.id = rawordermaster.createdby) as username FROM `rawordermaster` WHERE MONTH(`orderdate`) = MONTH(NOW())';
			}
			con.query(sql, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.GetRawOrderDetails= function (orderid, res) {
		connection.acquire(function (err, con) {
			
				var sql = 'SELECT *,(IFNULL((SELECT SUM(rawgrdetails.qty) FROM rawgrdetails WHERE rawgrdetails.productsid = a.productid),0) - IFNULL((SELECT SUM(raworderdetails.qty) FROM raworderdetails WHERE raworderdetails.productid = a.productid),0)) as balance,(SELECT rawproducts.name FROM rawproducts WHERE rawproducts.id = a.productid) as productname,(SELECT rawproducts.pack FROM rawproducts WHERE rawproducts.id = a.productid) as pack,(SELECT user.username FROM user WHERE user.id = rawordermaster.createdby) as username,(SELECT raworderdetails.qty FROM raworderdetails WHERE raworderdetails.productid = a.productid) as prevqty FROM `rawordermaster`,raworderdetails as a WHERE rawordermaster.id = '+orderid+' AND a.orderid = '+orderid;
			
			con.query(sql, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.EditrawSalesOrder= function (orderdata, res) {
		connection.acquire(function (err, con) {
			var sql = '';
				for(var i = 0 ; i < orderdata.length;i++)
				{
					sql = sql+'UPDATE `raworderdetails` SET `qty`='+orderdata[i].qty+' WHERE `productid`='+orderdata[i].productid+' AND `orderid` = '+orderdata[i].orderid+';';
				}
				con.query(sql, function (err, result) {
				con.release();
				if(err)
				res.send({status:0,message:'Failed To Update Record'});
				else
					res.send({status:1,message:'Record Updated Successfully'});
			});
		});
	}; 
	
	this.DeleterawSalesOrder= function (orderid, res) {
		connection.acquire(function (err, con) {
			
				con.query('DELETE FROM `raworderdetails` WHERE raworderdetails.orderid = '+orderid+';DELETE FROM `rawordermaster` WHERE rawordermaster.id = '+orderid+';', function (err, result) {
				con.release();
				if(err)
				res.send({status:0,message:'Failed To Delete Record'});
				else
					res.send({status:1,message:'Record Deleted Successfully'});
			});
		});
	}; 
	
	
	
	this.getSalesSummary = function(fromdate,todate,userid,res)
	{ 				
		connection.acquire(function(err, con) {
			if(todate == "undefined")
			{
				var sql = 'SELECT products.id,products.name,products.mrp,(IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = "'+fromdate+'")),0)) as qty,(IFNULL((SELECT SUM(orderdetails.freeqty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = "'+fromdate+'")),0)) as freeqty FROM products ORDER BY products.mrp ASC';
			}
			else
			{
				var sql = 'SELECT products.id,products.name,products.mrp,(IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'")),0)) as qty,(IFNULL((SELECT SUM(orderdetails.freeqty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'")),0)) as freeqty FROM products ORDER BY products.mrp ASC';
			}
			con.query(sql,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"No data Found"});
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
  
  this.getSaleSummaryinterval= function (interval,userid, res) {
		if(interval == 'Today')
		{
			var orderinterval = 'SELECT products.id,products.name,products.mrp,(IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = CURDATE())),0)) as qty,(IFNULL((SELECT SUM(orderdetails.freeqty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = CURDATE())),0)) as freeqty FROM products ORDER BY products.mrp ASC';
		}
		if(interval == 'Week')
		{
			var orderinterval = 'SELECT products.id,products.name,products.mrp,(IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND WEEKOFYEAR(ordermaster.orderdate) = WEEKOFYEAR(NOW()))),0)) as qty,(IFNULL((SELECT SUM(orderdetails.freeqty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND WEEKOFYEAR(ordermaster.orderdate) = WEEKOFYEAR(NOW()))),0)) as freeqty FROM products ORDER BY products.mrp ASC';
		}
		if(interval == 'Month')
		{
			var orderinterval = 'SELECT products.id,products.name,products.mrp,(IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND MONTH(ordermaster.orderdate) = MONTH(CURDATE()))),0)) as qty,(IFNULL((SELECT SUM(orderdetails.freeqty) FROM orderdetails WHERE orderdetails.productid = products.id AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND MONTH(ordermaster.orderdate) = MONTH(CURDATE()))),0)) as freeqty FROM products ORDER BY products.mrp ASC';
		}
		connection.acquire(function (err, con) {
			var sql = con.query(orderinterval, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	  this.getSaledprddetails= function (fromdate,todate,productid,userid, res) {
		connection.acquire(function (err, con) {
			if(todate == "undefined")
			{
				var sql = 'SELECT (SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = (SELECT ordermaster.orderfrom FROM ordermaster WHERE ordermaster.id = orderdetails.orderid)) as custid,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = (SELECT entitymaster.area FROM entitymaster WHERE entitymaster.id = (SELECT ordermaster.orderfrom FROM ordermaster WHERE ordermaster.id = orderdetails.orderid))) as area,(SELECT products.name FROM products WHERE products.id = orderdetails.productid) as productname,orderdetails.mrp,orderdetails.qty,orderdetails.freeqty,(SELECT SUM(a.qty) + SUM(a.freeqty) FROM orderdetails a WHERE a.productid = orderdetails.productid AND a.orderid in (SELECT ordermaster.id FROM ordermaster WHERE DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = "'+fromdate+'" AND ordermaster.createdby = '+userid+')) as totalsaled FROM orderdetails WHERE orderdetails.productid = '+productid+' AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") = "'+fromdate+'" AND ordermaster.createdby = '+userid+')';
			}
			else
			{
				var sql = 'SELECT (SELECT entitymaster.entityname FROM entitymaster WHERE entitymaster.id = (SELECT ordermaster.orderfrom FROM ordermaster WHERE ordermaster.id = orderdetails.orderid)) as custid,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = (SELECT entitymaster.area FROM entitymaster WHERE entitymaster.id = (SELECT ordermaster.orderfrom FROM ordermaster WHERE ordermaster.id = orderdetails.orderid))) as area,(SELECT products.name FROM products WHERE products.id = orderdetails.productid) as productname,orderdetails.mrp,orderdetails.qty,orderdetails.freeqty,(SELECT SUM(a.qty) + SUM(a.freeqty) FROM orderdetails a WHERE a.productid = orderdetails.productid AND a.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.createdby = '+userid+' AND DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'")) as totalsaled   FROM orderdetails WHERE orderdetails.productid = '+productid+' AND orderdetails.orderid in (SELECT ordermaster.id FROM ordermaster WHERE DATE_FORMAT(ordermaster.orderdate,"%Y-%m-%d") BETWEEN "'+fromdate+'" AND "'+todate+'" AND ordermaster.createdby = '+userid+')';
			}
			con.query(sql, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
  
  /* MATERIAL */
  
  this.AddNewItem= function (material, res) {
		connection.acquire(function (err, con) {
		var sql = con.query('INSERT INTO `products` set ?',material, function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{
				res.send({status:1,message:' Failed To Add New Item'})
			}
			else
			{res.send({status:0,message:'Item Added Successfully'})}
		});
		});
	};   
	
	this.UpdateItemDetails= function (material, res) {
		connection.acquire(function (err, con) {
		var sql = con.query('UPDATE `products` SET ? where id = ?',[material[0],material[0].id], function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{
				res.send({status:1,message:' Failed To Update Item'})
			}
			else
			{res.send({status:0,message:'Item Updated Successfully'})}
		});
		});
	};   

	this.ListItem= function (req, res) {
		connection.acquire(function (err, con) {
		var sql = con.query('SELECT * FROM `products`', function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{
				res.send({status:1,message:' no data Found'})
			}
			else
			{res.send(result)}
		});
		});
	};
	
	this.getItemData= function (itemid, res) {
		connection.acquire(function (err, con) {
		var sql = con.query('SELECT * FROM `products` where id = '+itemid, function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{
				res.send({status:1,message:' no data Found'})
			}
			else
			{res.send(result)}
		});
		});
	};   
	
	this.UploadItems= function (product, res) {
				var ss = '';
							for(var i = 0 ; i < product.length;i++)
							{
								if(product[i].DTDS1 == undefined)
								{product[i].DTDS1 = 0;}
								if(product[i].DTDS2 == undefined)
								{product[i].DTDS2 = 0;}
								
								ss = ss + '("'+product[i].DTDS0+'",'+product[i].DTDS1+','+product[i].DTDS2+'),';
							}
							ss = ss.substr(0, ss.length - 1);
							console.log(ss);
		connection.acquire(function (err, con) {
			
				con.query('INSERT INTO `products`(`name`, `minpoqty`, `maxpo`) VALUES '+ ss, function (err, result) {
					con.release();
					console.log(err)
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Product"});
					}
					else
					{
						res.send({status:0,message:"New Product Added Successfully."});
					}
				});
			
		});
	};   
	
	
	
	/* LEAVES MANAGEMENT */
  
  this.SubmitLeave= function (leaves, res) {
	  leaves.approval = 1;
		connection.acquire(function (err, con) {
		var sql = con.query('INSERT INTO `leaves` set ?',leaves, function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{
				res.send({status:1,message:' Failed To Add Leave'})
			}
			else
			{res.send({status:0,message:'Leave Added Successfully , Wait For Aproval'})}
		});
		});
	};   
	
	this.ApproveLeave= function (leaveid,reason,id, res) {
		connection.acquire(function (err, con) {
		var sql = con.query('UPDATE `leaves` SET `approval`= "'+id+'",`remark_review` ="'+reason+'" ,notificationread = 1 where id = '+leaveid, function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{
				res.send({status:1,message:' Failed To Approved'})
			}
			else
			{res.send({status:0,message:'Approved Successfully'})}
		});
		});
	};   
	
	
	
	this.DeleteSelectedApproval = function(customers,res)
	{ 				
	   var ss= '';
		connection.acquire(function(err, con) {
			for(var i = 0 ; i < customers.length;i++)
			{
				ss =ss+'DELETE FROM `leaves` WHERE `id` ='+customers[i].id+';';
			}
			console.log(ss);
			con.query(ss,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Selected Leaves Deleted Successfully"});
				}
			});
		});
	}
	this.LeavesList= function (userid,userlevel, res) {
		connection.acquire(function (err, con) {
			if(userlevel == 'HO')
			{
				var sql = 'SELECT *,(SELECT user.username from user WHERE user.id = leaves.userid) as username,(CASE WHEN reason = "Other" THEN otherreason ELSE reason END) AS reason  FROM `leaves`';
			}
			else
			{
				var sql = 'SELECT *,(SELECT user.username from user WHERE user.id = leaves.userid) as username,(CASE WHEN reason = "Other" THEN otherreason ELSE reason END) AS reason FROM `leaves` WHERE `userid` = '+userid;
			}	
			con.query(sql, function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{
				res.send({status:1,message:' no data Found'})
			}
			else
			{res.send(result)}
		});
		});
	};
	
	this.getItemData= function (itemid, res) {
		connection.acquire(function (err, con) {
		var sql = con.query('SELECT * FROM `products` where id = '+itemid, function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{
				res.send({status:1,message:' no data Found'})
			}
			else
			{res.send(result)}
		});
		});
	};   
	
	this.DeleteLeave= function (leaveid, res) {
		connection.acquire(function (err, con) {
		var sql = con.query('DELETE FROM `leaves` WHERE id = '+leaveid, function (err, result) {
			con.release();
			console.log(err);
			if(err)
			{
				res.send({status:1,message:'Something Went Wrong , Please Try.'})
			}
			else
			{res.send({status:0,message:'Record Deleted'})}
		});
		});
	};   
	
	
	/* ADVERTISEMENT */
	
	this.ListAdvertsiment= function (userlevel,userid, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT * FROM `advertisment` WHERE `createdby` = '+userid, function (err, result) {
			if(err)
			{
				con.release();
				res.send({status:1,message:'No Data Found.'})
			}
			else
			{
				con.release();
				res.send(result)
				}
		});
		});
	};   
	
	this.GetAdvertisementDetails= function (advid, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT * FROM `advertisment` WHERE `id` = '+advid, function (err, result) {
			if(err)
			{
				con.release();
				res.send({status:1,message:'No Data Found.'})
			}
			else
			{
				con.release();
				res.send(result)
				}
		});
		});
	};   
	
	this.DeleteAdvertsiment= function (advdetails, res) {
		connection.acquire(function (err, con) {
		con.query('DELETE FROM `advertisment` WHERE id = '+advdetails.id, function (err, result) {
			if(err)
			{
				con.release();
				res.send({status:1,message:'Failed To Delete Record.'})
			}
			else
			{
				if(advdetails.filename != '')
				{
					fs.unlinkSync('./www/uploads/'+advdetails.filename);
					fs.unlinkSync('./www/advfiles/'+advdetails.advfile);
				}
				con.release();
				res.send({status:0,message:'Record Deleted Succesfully'})
				}
		});
		});
	};   
	
	
	
	this.SendAdvertisement= function (advdetails, res) {
		
				

				 
		
		/* connection.acquire(function (err, con) {
		con.query('DELETE FROM `advertisment` WHERE id = '+advdetails.id, function (err, result) {
			if(err)
			{
				con.release();
				res.send({status:1,message:'Failed To Delete Record.'})
			}
			else
			{
				if(advdetails.filename != '')
				{
					fs.unlinkSync('./www/uploads/'+advdetails.filename);
				}
				con.release();
				res.send({status:0,message:'Record Deleted Succesfully'})
				}
		});
		}); */
	};   
	  
	
  
  
  
}
module.exports = new products();