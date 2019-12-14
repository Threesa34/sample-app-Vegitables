var connection = require('../connection');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var fs = require('fs');
var pdf = require('html-pdf');
var smtpConfig = {
    host: 'smtp.rediffmailpro.com'
    , port: 587,
    auth: {
        user: 'support@deeptrack.in'
        , pass: 'Deep@123'
    }
};

const gcm = require('node-gcm');
	const gcmKey = 'AIzaSyAV7AGHHXiaARWtvOtbGNHt3wUIUCgzrG8'; // Your gcm key in quotes
							//const deviceToken = regtokens // Receiver device token
							const sender = new gcm.Sender(gcmKey);
							var message = new gcm.Message();

function user() {
    this.SetRgIdForPush = function (details, res) {
        connection.acquire(function (err, con) {
            con.query('UPDATE user SET `regid` = "'+details.registrationId+'" WHERE id = '+details.userid, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.userList = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,(select a.username from user a where a.id = user.supervisor) as supervisorname FROM `user` order by id desc', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.ListProductsType = function (companyid, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM `vegtype` WHERE `companyid` = '+companyid, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.ProductList = function (companyid, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,(SELECT vegtype.type FROM vegtype WHERE vegtype.id = vegs.typeid LIMIT 1) as type FROM `vegs` WHERE `companyid` = '+companyid, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.userduplicatecheck = function (username, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM `user` WHERE `username` = "'+username+'"', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.forgetpwd = function (userdetails, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM `user` WHERE `username` = ? AND `mobile1` = ? ',[userdetails.username,userdetails.mobile1], function (err, result) {
                con.release();
                if (err) {
				res.send({status:0,message:'Details does not exit'});
                } else {
                    res.send({status:0,message:'User Password:'+result[0].password});

                }
            });
        });
    };
	
	
	this.ListCustomersdata = function (companyid, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM `customer` WHERE `companyid` = '+companyid, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.GetCustomerDetails = function (custid,userlevel,companyid, res) {
        connection.acquire(function (err, con) {
			if(userlevel == 'Admin')
			{
				var sql = 'SELECT *,"company" as type,(SELECT plan.plan FROM plan WHERE plan.companyid = companymaster.id  ORDER BY id DESC LIMIT 1) as plan,(SELECT DATE_FORMAT(plan.validity,"%Y-%m-%d") FROM plan WHERE plan.companyid = companymaster.id  ORDER BY id DESC LIMIT 1) as validity FROM `companymaster` WHERE `id` = '+companyid;
			}
			if(userlevel == 'Customer')
			{
				var sql = 'SELECT *,"customer" as type FROM `customer` WHERE `id` = '+custid;
			}
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.GetVendorDetails = function (companyid, res) {
        connection.acquire(function (err, con) {
			
				var sql = 'SELECT *,"company" as type,(SELECT plan.plan FROM plan WHERE plan.companyid = companymaster.id  ORDER BY id DESC LIMIT 1) as plan,(SELECT plan.validity FROM plan WHERE plan.companyid = companymaster.id  ORDER BY id DESC LIMIT 1) as validity,(SELECT plan.startingadte FROM plan WHERE plan.companyid = companymaster.id  ORDER BY id DESC LIMIT 1) as startingadte,(SELECT plan.amount FROM plan WHERE plan.companyid = companymaster.id ORDER BY id DESC LIMIT 1) as amount FROM `companymaster` WHERE `id` = '+companyid;
			
            con.query(sql, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.ListCompanyPlan = function (userlevel,companyid, res) {
        connection.acquire(function (err, con) {
			
				if(userlevel == 'SuperAdmin')
				{
					var sql = 'SELECT `id`,`name`,`owner`,(SELECT plan.plan FROM plan WHERE plan.companyid = companymaster.id ORDER BY plan.id DESC LIMIT 1) as plan,(SELECT plan.startingadte FROM plan WHERE plan.companyid = companymaster.id ORDER BY plan.id DESC LIMIT 1) as startingadte,(SELECT plan.validity FROM plan WHERE plan.companyid = companymaster.id ORDER BY plan.id DESC LIMIT 1) as validity,(SELECT plan.amount FROM plan WHERE plan.companyid = companymaster.id ORDER BY plan.id DESC LIMIT 1) as amount  FROM `companymaster` ORDER BY companymaster.id DESC'
				}
				else
				{
				var sql = 'SELECT `id`,`name`,`owner`,(SELECT plan.plan FROM plan WHERE plan.companyid = companymaster.id ORDER BY plan.id DESC LIMIT 1) as plan,(SELECT plan.startingadte FROM plan WHERE plan.companyid = companymaster.id ORDER BY plan.id DESC LIMIT 1) as startingadte,(SELECT plan.validity FROM plan WHERE plan.companyid = companymaster.id ORDER BY plan.id DESC LIMIT 1) as validity,(SELECT plan.amount FROM plan WHERE plan.companyid = companymaster.id ORDER BY plan.id DESC LIMIT 1) as amount  FROM `companymaster` WHERE id = '+companyid+' ORDER BY companymaster.id DESC'
				}
			
            con.query(sql, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.GetCompanyPlans = function (companyid, res) {
        connection.acquire(function (err, con) {
			
				
			
            con.query('SELECT id,`plan`,`startingadte`,`validity`,`amount`,`reneweddate`,(CASE WHEN plan.amtpaid = 1 THEN "Yes" WHEN plan.amtpaid = 0 THEN "No" END) as amtpaists,plan.amtpaid,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = plan.companyid) as name,(SELECT companymaster.owner FROM companymaster WHERE companymaster.id = plan.companyid) as owner FROM `plan` WHERE `companyid` = '+companyid+' ORDER BY id DESC', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	
	this.ChangePaymentSts = function (planid,amtpaidsts, res) {
         connection.acquire(function (err, con) {
            con.query('UPDATE plan SET `amtpaid` = ? WHERE `id` = ?',[planid,amtpaidsts], function (err, result) {
                
                if (err) {
					 con.release();
                     res.send({
                        status: 1,
                        message: 'Something went wrong, please try again'
                    });
                } else {
					 con.release();
                     res.send({
                        status: 0,
                        message: 'paid ststus change Succesfully'
                    });

                }
            });
        }); 
    };
	
	
	this.RenewCompanyPlan = function (newplandetails, res) {
		console.log(newplandetails);
         connection.acquire(function (err, con) {
            con.query('INSERT INTO `plan`(`companyid`, `plan`, `startingadte`, `validity`, `amount`,`reneweddate`,`amtpaid`) VALUES (?,?,?,?,?,NOW(),?)',[newplandetails[0].id,newplandetails[0].plan,newplandetails[0].startingadte,newplandetails[0].validity,newplandetails[0].amount,newplandetails[0].amtpaid], function (err, result) {
               
                if (err) {
					 con.release();
                     res.send({
                        status: 1,
                        message: 'Something went wrong, please try again'
                    });
                } else {
					 con.release();
                     res.send({
                        status: 0,
                        message: 'Plan Renewed Succesfully'
                    });

                }
            });
        }); 
    };
	
	this.UpdateCompanyprofile = function (conpprofile, res) {
        connection.acquire(function (err, con) {
			if(conpprofile[0].type == 'company')
			{
				delete conpprofile[0].type;
				delete conpprofile[0].plan;
				delete conpprofile[0].validity;
				 con.query('UPDATE `companymaster` SET ? WHERE id = ?',[conpprofile[0],conpprofile[0].id], function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Something went wrong, please try again'
                    });
                } else {
                     res.send({
                        status: 0,
                        message: 'Profile Updated Succesfully'
                    });

                }
            });
			}
			else
			{
				delete conpprofile[0].type;
				 con.query('UPDATE `customer` SET ? WHERE id = ?',[conpprofile[0],conpprofile[0].id], function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Something went wrong, please try again'
                    });
                } else {
                     res.send({
                        status: 0,
                        message: 'Profile Updated Succesfully'
                    });

                }
            });
			}
           
        });
    };
	
	this.DeleteType = function (typeid, res) {
        connection.acquire(function (err, con) {
            con.query('DELETE FROM `vegtype` WHERE `id` = '+typeid, function (err, result) {
                con.release();
                 if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to delete record'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'Record deleted Successfully'
                    });

                }
            });
        });
    };
	
	
	this.DeleteCustomer = function (custid, res) {
        connection.acquire(function (err, con) {
            con.query('DELETE FROM `customer` WHERE `id` = '+custid, function (err, result) {
                con.release();
                 if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to delete record'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'Record deleted Successfully'
                    });

                }
            });
        });
    };
	
	this.DeleteProduct = function (prdid, res) {
        connection.acquire(function (err, con) {
            con.query('DELETE FROM `vegs` WHERE `id` = '+prdid, function (err, result) {
                con.release();
                 if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to delete record'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'Record deleted Successfully'
                    });

                }
            });
        });
    };
	

	this.SaveType = function (prdtypes, res) {
		
		console.log(prdtypes);
        connection.acquire(function (err, con) {
			if(prdtypes[0].id)
			{
				 con.query('UPDATE `vegtype` SET ? WHERE id = ?',[prdtypes[0],prdtypes[0].id], function (err, result) {
                con.release();
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to update record'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'Record updated Successfully'
                    });

                }
            });
			}
			else
			{
				 con.query('SELECT * FROM `vegtype` WHERE `type` = ? AND `companyid` = ?',[prdtypes[0].type,prdtypes[0].companyid], function (err, result) {
					 console.log(err);
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
					if(result.length > 0)
					{
						res.send({
                        status: 2,
                        message: 'type already exist in system'
                    });
					}
					else
					{
					con.query('INSERT INTO `vegtype` set ?',[prdtypes[0]], function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
                     res.send({
                        status: 0,
                        message: 'Record insertd Successfully'
                    });

                }
            });
				}
				 }
				 });
			}
           
        });
    };
	
	
	
	this.SaveUser = function (prdtypes, res) {
        connection.acquire(function (err, con) {
			if(prdtypes[0].id)
			{
				
				delete prdtypes[0].custname;
				
				 con.query('UPDATE `user` SET ? WHERE id = ?',[prdtypes[0],prdtypes[0].id], function (err, result) {
                con.release();
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to update record'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'Record updated Successfully'
                    });

                }
            });
			}
			else
			{
				 con.query('SELECT * FROM `user` WHERE `username` = ? AND `password` = ?',[prdtypes[0].username,prdtypes[0].password], function (err, result) {
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
					
					if(result.length > 0)
					{
						res.send({
                        status: 2,
                        message: 'User already exist in system'
                    });
					}
					else
					{
					con.query('INSERT INTO `user` set ?',[prdtypes[0]], function (err, result) {
                con.release();
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
                     res.send({
                        status: 0,
                        message: 'Record insertd Successfully'
                    });

                }
            });
					}
				}
				 });
			}
           
        });
    };
	
	
	this.SaveProduct = function (prdtypes, res) {
        connection.acquire(function (err, con) {
			if(prdtypes[0].id)
			{
				delete prdtypes[0].type;
				if(!prdtypes[0].rate)
				{
					prdtypes[0].rate = null;
				}
				con.query('UPDATE `vegs` SET ? WHERE id = ?',[prdtypes[0],prdtypes[0].id], function (err, result) {
                con.release();
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to update record'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'Product updated Successfully'
                    });

                }
            });
			}
			else
			{
				con.query('SELECT * FROM `vegs` WHERE `typeid` = '+prdtypes[0].typeid+' AND `name` = "'+prdtypes[0].name+'" AND `companyid` = '+prdtypes[0].companyid+'', function (err, result) {
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
					if(result.length > 0)
					{
						
                     res.send({
                        status: 2,
                        message: 'Product Already Exist in system'
                    });
					}
					else
					{
				 con.query('INSERT INTO `vegs` set ?',[prdtypes[0]], function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
                     res.send({
                        status: 0,
                        message: 'Product insertd Successfully'
                    });

                }
            });
					}
				}
				});
			}
           
        });
    };
	
	
	this.SaveCustomers = function (prdtypes, res) {
        connection.acquire(function (err, con) {
			if(prdtypes[0].id)
			{
				 con.query('UPDATE `customer` SET ? WHERE id = ?',[prdtypes[0],prdtypes[0].id], function (err, result) {
                con.release();
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to update record'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'Record updated Successfully'
                    });

                }
            });
			}
			else
			{
				 con.query('SELECT * FROM `customer` WHERE `name` = ? AND `owner` = ? AND `mobile1` = ? AND `companyid` = ?',[prdtypes[0].name,prdtypes[0].owner,prdtypes[0].mobile1,prdtypes[0].companyid], function (err, result) {
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
					if(result.length > 0)
					{
						res.send({
                        status: 2,
                        message: 'Customer already exist in system'
                    });
					}
				else
				{
					con.query('INSERT INTO `customer` set ?',[prdtypes[0]], function (err, result) {
                con.release();
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
                     res.send({
                        status: 0,
                        message: 'Record insertd Successfully'
                    });

                }
				});
				}
				}
				 });
			}
           
        });
    };
	
	
	
	this.SaveVendor = function (prdtypes, res) {
        connection.acquire(function (err, con) {
			console.log(prdtypes);
			var plandetails = [];
			
			if(prdtypes[0].id)
			{
				plandetails.push({'companyid':prdtypes[0].id,'plan':prdtypes[0].plan,'startingadte':prdtypes[0].startingadte,'validity':prdtypes[0].validity,'amount':prdtypes[0].amount});
				delete prdtypes[0].type;
				delete prdtypes[0].plan;
				delete prdtypes[0].amount;
				delete prdtypes[0].startingadte;
				delete prdtypes[0].validity;
				 con.query('UPDATE `companymaster` SET ? WHERE id = ?',[prdtypes[0],prdtypes[0].id], function (err, result) {
                
				console.log(err);
                if (err) {
					con.release();
                     res.send({
                        status: 1,
                        message: 'Failed to update record'
                    });
                } else {
					con.release();
                     res.send({
                        status: 1,
                        message: 'Company updated Successfully'
                    });

                }
            });
			}
			else
			{
				 con.query('SELECT * FROM `companymaster` WHERE `name` = ? AND `owner` = ? AND `mobile1` = ?',[prdtypes[0].name,prdtypes[0].owner,prdtypes[0].mobile1], function (err, result) {
                if (err) {
					con.release();
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
					if(result.length > 0)
					{
						con.release();
						res.send({
                        status: 2,
                        message: 'Company already exist in system'
                    });
					}
				else
				{
					
					plandetails.push({'plan':prdtypes[0].plan,'startingadte':prdtypes[0].startingadte,'validity':prdtypes[0].validity,'amount':prdtypes[0].amount});
						delete prdtypes[0].type;
						delete prdtypes[0].plan;
						delete prdtypes[0].amount;
						delete prdtypes[0].startingadte;
						delete prdtypes[0].validity;
					con.query('INSERT INTO `companymaster` set ?',[prdtypes[0]], function (err, result) {
						console.log(err);
               
                if (err) {
					 con.release();
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
					
					
							plandetails[0].companyid = result.insertId;
                     con.query('INSERT INTO `plan` set ?',[plandetails[0]], function (err, result) {
							console.log('-----------');
							console.log(err);
                if (err) {
					con.release();
                     res.send({
                        status: 1,
                        message: 'Failed to insert record'
                    });
                } else {
					con.release();
                     res.send({
                        status: 0,
                        message: 'Record insertd Successfully'
                    });

                }
				});

                }
				});
				}
				}
				 });
			}
           
        });
    };
	
	this.ListVendors = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM `companymaster`', function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.DeleteVendor = function (vendorid, res) {
        connection.acquire(function (err, con) {
            con.query('DELETE FROM `vegtype` WHERE `companyid` = '+vendorid+'; DELETE FROM `vegs` WHERE `companyid` = '+vendorid+'; DELETE FROM `user` WHERE `companyid` = '+vendorid+'; DELETE FROM `plan` WHERE `companyid` = '+vendorid+'; DELETE FROM `orderdetails` WHERE `orderid` IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.companyid = '+vendorid+'); DELETE FROM ordermaster WHERE ordermaster.companyid = '+vendorid+'; DELETE FROM `customer` WHERE `companyid` = '+vendorid+' ;DELETE FROM `companymaster` WHERE `id` = '+vendorid+' ;', function (err, result) {
				console.log(err);
                 if (err) {
					con.release();
                     res.send({
                        status: 1,
                        message: 'Failed to delete record'
                    });
                } else {
					con.release();
                     res.send({
                        status: 0,
                        message: 'Record deleted Successfully'
                    });

                }
            });
        });
    };
	
	this.ListUsers = function (companyid,userlevel,userid,restruarantid, res) {
        connection.acquire(function (err, con) {
			if(userlevel == 'SuperAdmin')
			{
				var sql = 'SELECT *,(SELECT customer.name FROM customer where customer.id = user.custid) as custname FROM `user`';
			}
			
			if(userlevel == 'Admin')
			{
				var sql = 'SELECT *,(SELECT customer.name FROM customer where customer.id = user.custid) as custname FROM `user` WHERE `companyid` = '+companyid;
			}
			if(userlevel == "Customer")
			{
				var sql = 'SELECT *,(SELECT customer.name FROM customer where customer.id = user.custid) as custname FROM `user` WHERE `custid` = '+restruarantid;
			}
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.ListOrders = function (companyid,userlevel,userid,restruarantid, res) {
        connection.acquire(function (err, con) {
			if(userlevel == 'Admin')
			{
				var sql = 'SELECT `id`,`orderdate`,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus FROM `ordermaster` WHERE `companyid` =  '+companyid;
			}
			if(userlevel == "Customer")
			{
				var sql = 'SELECT `id`,`orderdate`,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus FROM `ordermaster` WHERE `restraurant` =  '+restruarantid;
			}
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.OrderListonMonth = function (companyid,userlevel,userid,restruarantid,month, res) {
        connection.acquire(function (err, con) {
			if(userlevel == 'Admin')
			{
				var sql = 'SELECT `id`,`orderdate`,paymentsts,amount,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus FROM `ordermaster` WHERE `companyid` =  '+companyid+' AND MONTH(ordermaster.orderdate) = "'+month+'"';
			}
			if(userlevel == "Customer")
			{
				var sql = 'SELECT `id`,`orderdate`,paymentsts,amount,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus FROM `ordermaster` WHERE `restraurant` =  '+restruarantid+' AND MONTH(ordermaster.orderdate) = "'+month+'"';
			}
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.OrderPaymentListonMonth = function (companyid,userlevel,userid,restruarantid,month, res) {
        connection.acquire(function (err, con) {
			if(userlevel == 'Admin')
			{
				var sql = 'SELECT `id`,`orderdate`,paymentsts,amount,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus ,(CASE WHEN paymentsts = 0 THEN "Pending" WHEN paymentsts = 1 THEN "Paid" END) AS paysts FROM `ordermaster` WHERE `companyid` =  '+companyid+' AND MONTH(ordermaster.orderdate) = "'+month+'" and paymentsts IS NOT NULL';
			}
			if(userlevel == "Customer")
			{
				var sql = 'SELECT `id`,`orderdate`,paymentsts,amount,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus ,(CASE WHEN paymentsts = 0 THEN "Pending" WHEN paymentsts = 1 THEN "Paid" END) AS paysts FROM `ordermaster` WHERE `restraurant` =  '+restruarantid+' AND MONTH(ordermaster.orderdate) = "'+month+'" and paymentsts IS NOT NULL';
			}
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.OrderListonDate = function (companyid,userlevel,userid,restruarantid,orderdate, res) {
        connection.acquire(function (err, con) {
			if(userlevel == 'Admin')
			{
				var sql = 'SELECT `id`,`orderdate`,paymentsts,amount,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus FROM `ordermaster` WHERE `companyid` =  '+companyid+' AND ordermaster.orderdate = "'+orderdate+'"';
			}
			if(userlevel == "Customer")
			{
				var sql = 'SELECT `id`,`orderdate`,paymentsts,amount,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus FROM `ordermaster` WHERE `restraurant` =  '+restruarantid+' AND ordermaster.orderdate = "'+orderdate+'"';
			}
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.OrderPaymentListonDate = function (companyid,userlevel,userid,restruarantid,orderdate, res) {
        connection.acquire(function (err, con) {
			if(userlevel == 'Admin')
			{
				var sql = 'SELECT `id`,`orderdate`,paymentsts,amount,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus ,(CASE WHEN paymentsts = 0 THEN "Pending" WHEN paymentsts = 1 THEN "Paid" END) AS paysts FROM `ordermaster` WHERE `companyid` =  '+companyid+' AND ordermaster.orderdate = "'+orderdate+'"  and paymentsts IS NOT NULL';
			}
			if(userlevel == "Customer")
			{
				var sql = 'SELECT `id`,`orderdate`,paymentsts,amount,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,(SELECT user.username FROM user WHERE user.id = ordermaster.createdby) as username,(SELECT COUNT(*) FROM orderdetails WHERE orderdetails.orderid = ordermaster.id) as noskus,(CASE WHEN paymentsts = 0 THEN "Pending" WHEN paymentsts = 1 THEN "Paid" END) AS paysts  FROM `ordermaster` WHERE `restraurant` =  '+restruarantid+' AND ordermaster.orderdate = "'+orderdate+'"  and paymentsts IS NOT NULL';
			}
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.getSrsDetails = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT `id`,`username`,(SELECT a.username FROM user a WHERE a.id = user.supervisor) as supervisorname,IFNULL(0,(SELECT SUM(ordermaster.netamount) FROM ordermaster WHERE ordermaster.createdby = user.id)) as netamount FROM `user` WHERE userlevel != "HO"', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	
	this.DeleteUser = function (userid, res) {
        connection.acquire(function (err, con) {
            con.query('delete FROM `user` where id = '+userid, function (err, result) {
                con.release();
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to delete user'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'Record Deleted Successfully'
                    });

                }
            });
        });
    };
	
	
	
	this.GetOrderDetails = function (orderid,companyid, res) {
        connection.acquire(function (err, con) {
			var sql = 'SELECT *,(SELECT vegtype.type FROM vegtype WHERE vegtype.id = vegs.typeid LIMIT 1) as type,(SELECT orderdetails.qty FROM orderdetails WHERE orderdetails.productid = vegs.id AND orderdetails.orderid = '+orderid+' LIMIT 1) as qty,'+orderid+' as orderid,(SELECT orderdetails.id FROM orderdetails WHERE orderdetails.orderid = '+orderid+' AND orderdetails.productid= vegs.id LIMIT 1) as detailsid,(SELECT ordermaster.orderdate FROM ordermaster WHERE ordermaster.id = '+orderid+' LIMIT 1) as orderdate,(CASE WHEN (SELECT orderdetails.productid FROM orderdetails WHERE orderdetails.orderid = '+orderid+' LIMIT 1) = vegs.id THEN (SELECT orderdetails.rate FROM orderdetails WHERE orderdetails.orderid = '+orderid+' AND orderdetails.productid = vegs.id limit 1) ELSE vegs.rate END) as salerate FROM `vegs` WHERE `companyid` =  '+companyid;
            con.query(sql, function (err, result) {
                con.release();
				
                 if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.DeleteOrderDetails = function (orderid, res) {
        connection.acquire(function (err, con) {
			var sql = 'DELETE FROM `orderdetails` WHERE `orderid` = '+orderid+';DELETE FROM `ordermaster` WHERE `id` ='+orderid;
            con.query(sql, function (err, result) {
                con.release();
				if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to delete order'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'Order deleted successfully'
                    });

                }
            });
        });
    };
	/* CONCAT(orderdetails.rate,"| ",orderdetails.rate,"*",orderdetails.qty,"= ",orderdetails.rate * orderdetails.qty) as rate, */
	
	this.GetOrderDetailsForPayment = function (orderid,companyid, res) {
        connection.acquire(function (err, con) {
			var sql = 'SELECT ordermaster.`id`,ordermaster.paymentsts,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,ordermaster.`orderdate`,ordermaster.`amount`,(SELECT vegs.name FROM vegs WHERE vegs.id = orderdetails.productid) as productname,(SELECT vegs.unit FROM vegs WHERE vegs.id = orderdetails.productid) as unit,(SELECT vegs.marathiname FROM vegs WHERE vegs.id = orderdetails.productid) as marathiname,orderdetails.qty,orderdetails.rate FROM `ordermaster` INNER JOIN orderdetails ON ordermaster.id = orderdetails.orderid WHERE ordermaster.id = '+orderid;
            con.query(sql, function (err, result) {
                con.release();
                 if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.GenerateInvoice = function (orderid,companyid, res) {
        connection.acquire(function (err, con) {
			var sql = 'UPDATE `ordermaster` SET `paymentsts`=0 WHERE id ='+orderid;
            con.query(sql, function (err, result) {
                
                 if (err) {
					 con.release();
                     res.send({
                        status: 1,
                        message: 'Failed to Generate Invoice'
                    });
                } else {
					
					con.query('SELECT user.id,user.username,user.regid,(SELECT ordermaster.amount FROM `ordermaster` WHERE id = '+orderid+' LIMIT 1) as amount,(SELECT customer.name FROM customer WHERE customer.id = (SELECT ordermaster.restraurant FROM `ordermaster` WHERE id = '+orderid+' LIMIT 1)) as custname FROM user WHERE user.id IN (SELECT user.id FROM user WHERE user.custid = (SELECT ordermaster.restraurant FROM `ordermaster` WHERE id = '+orderid+' LIMIT 1)) AND user.companyid = '+companyid+' OR (user.userlevel = "Admin" AND user.companyid = '+companyid+')', function (err, pushresult) {
							
							if (err) {
								
								 
							} else {
								
								 var devicetokens = [];
												for(var i = 0 ; i < pushresult.length;i++)
												{
													if(pushresult[i].regid != null)
													{
														devicetokens.push(pushresult[i].regid);
													}
												}
							
									var msg = 'Invoice Generated for Customer: '+pushresult[0].custname+',Amount: '+pushresult[0].amount+'.00/-';
											message.addData({
											title: "",
											icon: "",
											body: msg,
										  otherProperty: true,
										});
										sender.send(message,devicetokens, (err,response) => {
										  if (err) {
											console.error(err);
										  }
										  else {
											con.release();
												 res.send({
													status: 0,
													message: 'Invoice Generated Successfully'
												});
										  }
										});
								
								
								
							}
						});

							}
					
            });
        });
    };
	
	this.PaidAmountCheck = function (orderid,paymentdate,companyid, res) {
        connection.acquire(function (err, con) {
			var sql = 'UPDATE `ordermaster` SET `paymentsts`= 1,paymentdate = "'+paymentdate+'" WHERE id ='+orderid;
            con.query(sql, function (err, result) {
             
                 if (err) {
					 con.release();
                     res.send({
                        status: 1,
                        message: 'Failed to Save Record'
                    });
                } else {
								
								con.query('SELECT user.id,user.username,user.regid,(SELECT ordermaster.amount FROM `ordermaster` WHERE id = '+orderid+' LIMIT 1) as amount,(SELECT customer.name FROM customer WHERE customer.id = (SELECT ordermaster.restraurant FROM `ordermaster` WHERE id = '+orderid+' LIMIT 1)) as custname FROM user WHERE user.id IN (SELECT user.id FROM user WHERE user.custid = (SELECT ordermaster.restraurant FROM `ordermaster` WHERE id = '+orderid+' LIMIT 1)) AND user.companyid = '+companyid+' OR (user.userlevel = "Admin" AND user.companyid = '+companyid+')', function (err, pushresult) {
							
							if (err) {
								
								 
							} else {
								
								 var devicetokens = [];
												for(var i = 0 ; i < pushresult.length;i++)
												{
													if(pushresult[i].regid != null)
													{
														devicetokens.push(pushresult[i].regid);
													}
												}
							
									var msg = 'Payment recived from Customer: '+pushresult[0].custname+',Amount: '+pushresult[0].amount+'.00/-';
											message.addData({
											title: "",
											icon: "",
											body: msg,
										  otherProperty: true,
										});
							
										sender.send(message,devicetokens, (err,response) => {
										  if (err) {
											console.error(err);
										  }
										  else {
											con.release();
												 res.send({
													status: 0,
													message: 'Record Saved Successfully'
												});
										  }
										});
								
								
								
							}
						});

							}
					
            });
        });
    };
	
	
	this.getDashboardCount = function (inteval,yearinteval,intervaltype,userlevel,companyid,custid, res) {
        connection.acquire(function (err, con) {
			
			if(userlevel == "SuperAdmin")
			{
				if(intervaltype == 'day')
				{
				var sql = 'SELECT (SELECT COUNT(*) FROM user) as totalusers,(SELECT COUNT(*) FROM ordermaster WHERE  ordermaster.orderdate = "'+inteval+'") as totalorders,IFNULL((SELECT SUM(ordermaster.amount) FROM ordermaster WHERE ordermaster.paymentsts = 1 AND ordermaster.paymentdate = "'+inteval+'" ),0) as totalamount,(((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE  ordermaster.orderdate = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Kg")),0)) + (IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE  ordermaster.orderdate = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Gm")),0) / 1000))) as totalqtyinkg,IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.orderdate = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "pieces")),0) as totalqtyinpc  FROM `user` a  LIMIT 1';
				}
				
				if(intervaltype == 'month')
				{
					
				 var sql = 'SELECT (SELECT COUNT(*) FROM user) as totalusers,(SELECT COUNT(*) FROM ordermaster WHERE  MONTH(ordermaster.orderdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'") as totalorders,IFNULL((SELECT SUM(ordermaster.amount) FROM ordermaster WHERE ordermaster.paymentsts = 1 AND MONTH(ordermaster.paymentdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'"),0) as totalamount,((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE MONTH(ordermaster.orderdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Kg")),0)) + ((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE MONTH(ordermaster.orderdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Gm")),0))/1000)) as totalqtyinkg,IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE MONTH(ordermaster.orderdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "pieces")),0) as totalqtyinpc  FROM `user` a  LIMIT 1'; 
				 
				}
			}
			
			if(userlevel == "Admin")
			{
				if(intervaltype == 'day')
				{
				var sql = 'SELECT (SELECT COUNT(*) FROM user WHERE user.companyid = a.companyid) as totalusers,(SELECT COUNT(*) FROM ordermaster WHERE ordermaster.companyid = a.companyid AND ordermaster.orderdate = "'+inteval+'") as totalorders,IFNULL((SELECT SUM(ordermaster.amount) FROM ordermaster WHERE ordermaster.paymentsts = 1 AND ordermaster.paymentdate = "'+inteval+'" AND ordermaster.companyid = '+companyid+'),0) as totalamount,(((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.companyid = '+companyid+' AND ordermaster.orderdate = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Kg")),0)) + (IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.companyid = '+companyid+' AND ordermaster.orderdate = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Gm")),0) / 1000))) as totalqtyinkg,IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.companyid = '+companyid+' AND ordermaster.orderdate = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "pieces")),0) as totalqtyinpc  FROM `user` a WHERE a.companyid = '+companyid+' LIMIT 1';
				}
				
				if(intervaltype == 'month')
				{
					
				 var sql = 'SELECT (SELECT COUNT(*) FROM user WHERE user.companyid = a.companyid) as totalusers,(SELECT COUNT(*) FROM ordermaster WHERE ordermaster.companyid = a.companyid AND MONTH(ordermaster.orderdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'") as totalorders,IFNULL((SELECT SUM(ordermaster.amount) FROM ordermaster WHERE ordermaster.paymentsts = 1 AND MONTH(ordermaster.paymentdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'" AND ordermaster.companyid = '+companyid+'),0) as totalamount,((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.companyid = '+companyid+' AND MONTH(ordermaster.orderdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Kg")),0)) + ((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.companyid = '+companyid+' AND MONTH(ordermaster.orderdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Gm")),0))/1000)) as totalqtyinkg,IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.companyid = '+companyid+' AND MONTH(ordermaster.orderdate) = "'+inteval+'" AND YEAR(ordermaster.orderdate) = "'+yearinteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "pieces")),0) as totalqtyinpc  FROM `user` a WHERE a.companyid = '+companyid+' LIMIT 1'; 
				 
				}
			}
			if(userlevel == "Customer")
			{
				if(intervaltype == 'day')
				{
				var sql = 'SELECT (SELECT COUNT(*) FROM user WHERE user.custid = '+custid+') as totalusers,(SELECT COUNT(*) FROM ordermaster WHERE ordermaster.restraurant = '+custid+' AND ordermaster.orderdate = "'+inteval+'") as totalorders,IFNULL((SELECT SUM(ordermaster.amount) FROM ordermaster WHERE ordermaster.paymentsts = 1 AND ordermaster.paymentdate = "'+inteval+'" AND ordermaster.restraurant = '+custid+'),0) as totalamount,((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.restraurant = '+custid+' AND ordermaster.orderdate = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Kg")),0)) + ((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.restraurant = '+custid+' AND ordermaster.orderdate = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Gm")),0)) / 1000)) as totalqtyinkg,IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.restraurant = '+custid+' AND ordermaster.orderdate = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "pieces")),0) as totalqtyinpc FROM user WHERE user.custid = '+custid;
				}
				
				if(intervaltype == 'month')
				{
				var sql =  'SELECT (SELECT COUNT(*) FROM user WHERE user.custid = '+custid+') as totalusers,(SELECT COUNT(*) FROM ordermaster WHERE ordermaster.restraurant = '+custid+' AND MONTH(ordermaster.orderdate) = "'+inteval+'") as totalorders,IFNULL((SELECT SUM(ordermaster.amount) FROM ordermaster WHERE ordermaster.paymentsts = 1 AND MONTH(ordermaster.paymentdate) = "'+inteval+'" AND ordermaster.restraurant = '+custid+'),0) as totalamount,((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.restraurant = '+custid+' AND MONTH(ordermaster.orderdate) = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Kg")),0)) + ((IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.restraurant = '+custid+' AND MONTH(ordermaster.orderdate) = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "Gm")),0)) / 1000)) as totalqtyinkg,,IFNULL((SELECT SUM(orderdetails.qty) FROM orderdetails WHERE orderdetails.orderid IN (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.restraurant = '+custid+' AND MONTH(ordermaster.orderdate) = "'+inteval+'") AND orderdetails.productid IN (SELECT vegs.id FROM vegs WHERE vegs.unit = "pieces")),0) as totalqtyinpc FROM user WHERE user.custid = '+custid;
				}
			}
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                 if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.UpdateOrder = function (orderdetails, res) {
		var ss = '';
		var totalamount = 0;
		for(var i = 0 ; i < orderdetails.length;i++)
		{
			totalamount = totalamount+ parseFloat((orderdetails[i].qty) * (orderdetails[i].salerate));
		}
			for(var i = 0 ; i < orderdetails.length;i++)
		{
			if(orderdetails[i].detailsid == null)
			{
				ss = ss+'INSERT INTO `orderdetails`(`orderid`, `productid`, `qty`, `rate`) VALUES ('+orderdetails[i].orderid+','+orderdetails[i].id+','+orderdetails[i].qty+','+orderdetails[i].salerate+');'
			}
			else
			{
				ss = ss+'UPDATE `orderdetails` SET `qty` = '+orderdetails[i].qty+',`rate` = '+orderdetails[i].salerate+' WHERE `id` = '+orderdetails[i].detailsid+';'
			}
		}
		ss = ss+'UPDATE `ordermaster` SET `orderdate`= "'+orderdetails[0].orderdate+'",`amount`= '+totalamount+' WHERE `id` = '+orderdetails[0].orderid+';';
         connection.acquire(function (err, con) {
			 
            con.query(ss, function (err, result) {
				console.log(err);
			 
                con.release();
                  if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to Update Order'
                    });
                } else {
								 res.send({
									status: 0,
									message: 'Order Updted Successfully'
								});

							}
					
            });
        }); 
    };
	
	/* Order Master */
	
	

	
	this.SaveNewOrder = function (orderdetails, res) {
		var ss ='';
		
		var totalamount = 0;
		for(var i = 0 ; i < orderdetails.length;i++)
		{
			totalamount = totalamount+ parseFloat((orderdetails[i].qty) * (orderdetails[i].rate));
		}
		
        connection.acquire(function (err, con) {
            con.query('INSERT INTO `ordermaster`(`restraurant`, `orderdate`, `amount`, `createdby`,`companyid`) VALUES (?,?,?,?,?)',[orderdetails[0].restraurant,orderdetails[0].orderdate,totalamount,orderdetails[0].createdby,orderdetails[0].companyid], function (err, masterresult) {
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to Create Order'
                    });
                } else {
					
					
					for(var i = 0 ; i < orderdetails.length;i++)
					{
						ss= ss+'('+masterresult.insertId+','+orderdetails[i].id+','+orderdetails[i].qty+','+orderdetails[i].rate+'),';
					}
					ss = ss.substr(0, ss.length - 1);
					 con.query('INSERT INTO `orderdetails`(`orderid`, `productid`, `qty`, `rate`) VALUES'+ss, function (err, result) {
							
							if (err) {
								
								con.query('DELETE FROM `ordermaster` WHERE `id` = '+masterresult.insertId, function (err, result) {
							
							if (err) {
								
								 
							} else {
								
								con.release();
								 res.send({
									status: 0,
									message: 'Order Created Successfully'
								});

							}
						});
							} else {
	
								con.query('SELECT user.id,user.username,user.regid,(SELECT customer.name FROM customer WHERE customer.id = '+orderdetails[0].restraurant+') as custname,(SELECT a.username FROM user a WHERE a.id = '+orderdetails[0].createdby+') as createduser FROM user WHERE user.id IN (SELECT user.id FROM user WHERE user.custid = '+orderdetails[0].restraurant+') AND user.companyid = '+orderdetails[0].companyid+' OR (user.userlevel = "Admin" AND user.companyid = '+orderdetails[0].companyid+')', function (err, pushresult) {
							
							if (err) {
								
								 
							} else {
								
								 var devicetokens = [];
												for(var i = 0 ; i < pushresult.length;i++)
												{
													if(pushresult[i].regid != null)
													{
														devicetokens.push(pushresult[i].regid);
													}
												}
							
									var msg = 'New Order Recive from Customer: '+pushresult[0].custname+',Total Products: '+orderdetails.length+',Created By: '+pushresult[0].createduser;
											message.addData({
											title: "",
											icon: "",
											body: msg,
										  otherProperty: true,
										});
							
										sender.send(message,devicetokens, (err,response) => {
										  if (err) {
											console.error(err);
										  }
										  else {
											con.release();
												 res.send({
													status: 0,
													message: 'Order Created Successfully'
												});
										  }
										});
								
								
								
							}
						});
								
							}
						});
                }
            });
			
        }); 
    };
	
	
	
	
	
	

	
    this.GetValidityOnPlan = function (plan,res) {
		var planname = plan.replace("%20", " ");
		if(planname == 'Yearly')
		{
			var sql ='SELECT Date_add((Now() - INTERVAL + 1 day),interval + 12 month) as expdate,NOW() as startdate,55000 as amount';
		}
		
		if(planname == 'Half Year')
		{
			var sql ='SELECT Date_add((Now() - INTERVAL + 1 day),interval + 6 month) as expdate,NOW() as startdate, 28000 as amount';
		}
		
		if(planname == 'Monthly')
		{
			var sql ='SELECT Date_add((Now() - INTERVAL + 1 day),interval + 1 month) as expdate,NOW() as startdate ,5000 as amount';
		}
		
		if(planname == 'Demo')
		{
			var sql ='SELECT Date_add((Now() - INTERVAL + 1 day),INTERVAL 15 DAY) as expdate,NOW() as startdate, 000 as amount';
		}
		
		if(planname == 'Free')
		{
			var sql ='SELECT Date_add((Now() - INTERVAL + 1 day),INTERVAL 100 YEAR) as expdate,NOW() as startdate ,000 as amount';
		}
		
		connection.acquire(function (err, con) {
            con.query(sql, function (err, result) {
                
                 if (err) {
					 con.release();
                     res.send({
                        status: 1,
                        message: 'No data found'
                    });
                } else {
					res.send(result);
				}
			});
			});
		
	};
    this.CheckPlanValidity = function (companyid,res) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,DATE_FORMAT(CURDATE(),"%Y-%m-%d") as curdt,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = user.companyid) as companyname,(SELECT DATE_FORMAT(plan.validity,"%Y-%m-%d") FROM plan WHERE plan.companyid = user.companyid ORDER BY plan.id DESC LIMIT 1) as validity FROM user WHERE companyid = ? limit 1', [companyid], function (err, result) {
             console.log(result)
                if (err) {
                    res.send('Error');
                } else {
						
						if(result.length)
						{
							if(result[0].validity < result[0].curdt)
							{
								res.send({
								status: 1,
								message: 'Sorry! This plan has been expire. Please contact to your vendor for renew it.'
							});
							}
							else
							{
								res.send({
								status: 0,
								message: 'OK'
							});
							}
						}
				}
			});
			});
	}


				this.authuser = function (userdetails,res) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,DATE_FORMAT(CURDATE(),"%Y-%m-%d") as curdt,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = user.companyid) as companyname,(SELECT DATE_FORMAT(plan.validity,"%Y-%m-%d") FROM plan WHERE plan.companyid = user.companyid ORDER BY plan.id DESC LIMIT 1) as validity FROM user WHERE username = ? AND password = ?', [userdetails.username,userdetails.password], function (err, result) {
             console.log(err)
                if (err) {
                    res.end('Error querying:' + err + '\n');
                } else {
                    if (result.length < 1) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. User not found.'
                        });
                    } else {
						if(result[0].validity < result[0].curdt)
						{
							res.json({
                            success: false,
                            message: 'Sorry! This plan has been expire. Please contact to your vendor for renew it.'
                        });
						}
						else
						{
								console.log('Authenticating User found.');
								 var token = jwt.sign(userdetails.username, 'secr3t');
								console.log('Authenticated.');
												res.json({
														success: true,
														message: 'Enjoy your token!',
														username: result['0'].username,
														Userlevel: result['0'].userlevel,
														custid: result['0'].custid,
														companyid: result['0'].companyid,
														companyname: result['0'].companyname,
														userId: result['0'].id,
														token: token
												});
						}
                }
				}
            });
        });
    };



	
	this.GeneratePDFOfInvoice = function (orderid,companyid, res) {
        connection.acquire(function (err, con) {
			var sql = 'SELECT 0 as gst,"" as website,"" as email,companymaster.name as companyname,"vegetables.png" as logo,companymaster.address as companyaddress,CONCAT(companymaster.mobile1,(CASE WHEN companymaster.mobile2 != 0 THEN CONCAT("/ ",companymaster.mobile2)  ELSE "" END)) as companycontacts,companymaster.gstin,ordermaster.`id` as masterid,ordermaster.paymentsts,(SELECT customer.name FROM customer WHERE customer.id = ordermaster.restraurant) as custname,DATE_FORMAT(ordermaster.`orderdate`,"%d/%m/%Y") as orderdate,ordermaster.`amount`,(SELECT vegs.name FROM vegs WHERE vegs.id = orderdetails.productid) as productname,(SELECT vegs.unit FROM vegs WHERE vegs.id = orderdetails.productid) as unit,(SELECT vegs.marathiname FROM vegs WHERE vegs.id = orderdetails.productid) as marathiname,orderdetails.qty,orderdetails.rate FROM `ordermaster` INNER JOIN orderdetails ON ordermaster.id = orderdetails.orderid INNER JOIN companymaster ON companymaster.id = ordermaster.companyid WHERE ordermaster.id = '+orderid;
            con.query(sql, function (err, result) {
                 if (err) {
                    res.send('No data Found');
                } else {
                    if(result.length > 0)
					{
						var filewriteerror = 0;
					var template = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"><link rel="stylesheet" href="http://103.252.7.5:8086/css/marathifont.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script> </head><body><div class="container mt-4 mb-4"><div style="width:784px;height:980px;padding: 10px;"><div class=" row text-center" id="pageHeader" style="margin:auto;position:relative;right:8%;"><div style="position:absolute;top:-30px;left:100px;"><img src="http://103.252.7.5:8086/uploads/'+result[0].logo+'" class="img-responsive" style="height:150px;width:150px;"/></div><div class="col-md-12 col-12 text-center"><h3 style="position:relative;top:-6px">'+result[0].companyname+'</h3><div class="row"  style="position:relative;right:-210px;width:570px;top:-20px"><p>'+result[0].companyaddress+'</p> </div> <div class="row"><span style="position:relative;right:200px;top:-35px"><b>Bill No.: '+result[0].masterid+'</b></span> <span style="position:relative;right:-140px;top:-35px"><b>GSTIN: '+result[0].gstin+'</b></span></div> </div> </div><div class="col-md-12"><table class="table table-bordered"><tr><td colspan="3"><div class="row"><div class="col-md-12 text-left"><b>Order From: '+result[0].custname+'</b></div></div></td><td colspan="2"><div class="row"><div class="col-md-6 text-right"><b>Invoice Date: '+result[0].orderdate+'</b></div></div></td></tr><tr><th>Sr.No.</th><th>Item</th><th>Qty.</th><th>Unit Price</th><th>Net Price</th></tr><tbody>';
					
					result.forEach(function(item,index){
					  template += '<tr> <td>'+(index +1)+'</td><td>'+item.productname+'-<span class="marathiname">'+item.marathiname+'</span></td><td>'+item.qty+' '+item.unit+'</td><td class="text-right">'+item.rate+'</td><td class="text-right">'+(item.rate * item.qty).toFixed(2)+'</td></tr>';
					});
					
					
					template += '<tr class="mt-2"><td colspan="3"><div class="col-12 col-md-12"><b>Gross Amount:</b></div></td><td colspan="2"><div class="col-12 col-md-12 text-right"><b>'+result[0].amount.toFixed(2)+'</b></div></td></tr><tr><td colspan="3"><div class="col-12 col-md-12"><b>GST:</b></div><div class="col-12 col-md-12"><p>cgst('+result[0].gst / 2+'%): '+(result[0].amount * ((result[0].gst / 2)/100)).toFixed(2)+' &nbsp;&nbsp; sgst('+result[0].gst / 2+'%): '+(result[0].amount * ((result[0].gst / 2)/100)).toFixed(2)+'</p></div></td><td colspan="2"><div class="col-12 col-md-12 text-right"><b>'+(result[0].amount * (result[0].gst/100)).toFixed(2)+'</b></div></td></tr><tr><td colspan="3"><div class="col-12 col-md-12"><b>Net Amount:</b><div class="col-12 col-md-12"><p>Gross Amount + GST</p></div></div></td><td colspan="2"><div class="col-12 col-md-12 text-right"><b>'+(parseFloat(result[0].amount) + parseFloat(result[0].amount * (result[0].gst/100))).toFixed(2)+'</b></div></td></tr><tr><td colspan="3"><div class="col-12 col-md-12 text-center"><b>Received By</b></div><div class="col-12 col-md-12 text-center mt-4 pt-4 pb-4"></div></td><td colspan="2" rowspan="2"><div class="col-12 col-md-12 text-center"><b>Authorise Signature</b></div><div class="col-12 col-md-12 text-center mt-4 pt-4 pb-4"></div></td></tr></tbody></table></div></div></div><div id="pageFooter"><div class="row"  style="position:relative;top:20px;right:-250px;"><span>'+result[0].companycontacts+'</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+result[0].email+'</span><br><span style="position:relative;top:2px;right:-100px;">'+result[0].website+'</span></div> </div></body></html>'
					
					fs.writeFile('./Templtes/invoice.html', template, function(err, data){
						if (err){
							 filewriteerror = 1
						}
						else
						{
							var html = fs.readFileSync('./Templtes/invoice.html', 'utf8');
								var options = { format: 'Letter'};
								pdf.create(html, options).toFile('./www/pdf/Invoivce_for_order_'+result[0].masterid+'.pdf', function(err, res) {
								  if (err){
									 filewriteerror = 1;
								  }
										else
										{
											console.log(res); // { filename: '/app/businesscard.pdf' }
											
											
										}
								});	
						}
					});

											
											if(filewriteerror == 1)
											{
												res.send({
											status: 1,
											type: "error",
											title: "Oops!",
											message: 'Somthing went wrong, Please try again.'
										});
										con.release();
											}
										else
										{
											 res.send({
													status: 0,
													type: "success",
													title: "Done!",
													message: 'Invoice copy generated successfully',
													filename:'Invoivce_for_order_'+result[0].masterid+'.pdf'
												}); 
												con.release();
											
											
										}
											
						
					}
					else
					{
						
					}

                }
            });
        });
    };
	
	
	 
/* 	 const gcm = require('node-gcm');
		const gcmKey = 'AIzaSyAV7AGHHXiaARWtvOtbGNHt3wUIUCgzrG8'; // Your gcm key in quotes
		const deviceToken = 'APA91bGXcYTi_EZOJPS_bzbx6rqhFQGWkvfZJArKOA9pM6L9jLniWc_Hj-8CijukUzxHFvGQhmaUe2B-h6tBB6zgXwtqteCuqbEfUdJtxVA_9orVhx79MbIXQmYsE-E_zUZjF4Y0CxEs'; // Receiver device token
		const sender = new gcm.Sender(gcmKey);
console.log(sender);
		var message = new gcm.Message(); */

			/* message.addData({
				title: "Veg Suppliers",
				body: "This is a notification that will be displayed if your app is in the background.",
			  otherProperty: true,
			});
		this.SendNotification = function(req,res) {
			sender.send(message,deviceToken, (err,response) => {
			  if (err) {
				console.error(err);
			  }
			  else {
				  console.log(response);
				console.log('Sent');
			  }
			});
		} */
}
module.exports = new user();