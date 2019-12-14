var user = require('./models/user');
var products = require('./models/products');
module.exports = {
    configure: function (app) {
		
		/* APP LOGIN */
		
        app.post('/api/user/auth/', function (req, res) {
            user.authuser(req.body, res);
        });
		
		app.post('/api/SetRgIdForPush/', function (req, res) {
            user.SetRgIdForPush(req.body, res);
        });
		
		app.post('/api/SaveType/', function (req, res) {
            user.SaveType(req.body, res);
        });
		
		app.post('/api/SaveProduct/', function (req, res) {
            user.SaveProduct(req.body, res);
        });
		
		app.post('/api/SaveCustomers/', function (req, res) {
            user.SaveCustomers(req.body, res);
        });
		
		app.post('/api/SaveUser/', function (req, res) {
            user.SaveUser(req.body, res);
        });
		
		app.post('/api/SaveNewOrder/', function (req, res) {
            user.SaveNewOrder(req.body, res);
        });
		
		app.post('/api/UpdateOrder/', function (req, res) {
            user.UpdateOrder(req.body, res);
        });
		
		app.post('/api/UpdateCompanyprofile/', function (req, res) {
            user.UpdateCompanyprofile(req.body, res);
        });
		
		app.post('/api/user/forgetpwd/', function (req, res) {
            user.forgetpwd(req.body, res);
        });
		
		

        app.get('/api/userduplicatecheck/:username', function (req, res) {
            user.userduplicatecheck(req.params.username, res);
        })

		app.get('/api/GetCustomerDetails/:custid/:userlevel/:companyid', function (req, res) {
            user.GetCustomerDetails(req.params.custid,req.params.userlevel,req.params.companyid, res);
        })

		app.get('/api/ProductList/:companyid', function (req, res) {
            user.ProductList(req.params.companyid, res);
        })

		app.get('/api/getDashboardCount/:interval/:yearinteval/:intervaltype/:userlevel/:companyid/:restraurantid', function (req, res) {
            user.getDashboardCount(req.params.interval,req.params.yearinteval,req.params.intervaltype,req.params.userlevel,req.params.companyid,req.params.restraurantid, res);
        })
		
		
		app.get('/api/ListUsers/:companyid/:userlevel/:userid/:restraurantid', function (req, res) {
            user.ListUsers(req.params.companyid,req.params.userlevel,req.params.userid,req.params.restraurantid, res);
        })
		
		app.get('/api/ListOrders/:companyid/:userlevel/:userid/:restraurantid', function (req, res) {
            user.ListOrders(req.params.companyid,req.params.userlevel,req.params.userid,req.params.restraurantid, res);
        })

		
		app.get('/api/OrderListonMonth/:companyid/:userlevel/:userid/:restraurantid/:month', function (req, res) {
            user.OrderListonMonth(req.params.companyid,req.params.userlevel,req.params.userid,req.params.restraurantid,req.params.month, res);
        })

		app.get('/api/OrderListonDate/:companyid/:userlevel/:userid/:restraurantid/:orderdate', function (req, res) {
            user.OrderListonDate(req.params.companyid,req.params.userlevel,req.params.userid,req.params.restraurantid,req.params.orderdate, res);
        })
		
		app.get('/api/OrderPaymentListonMonth/:companyid/:userlevel/:userid/:restraurantid/:month', function (req, res) {
            user.OrderPaymentListonMonth(req.params.companyid,req.params.userlevel,req.params.userid,req.params.restraurantid,req.params.month, res);
        })

		app.get('/api/OrderPaymentListonDate/:companyid/:userlevel/:userid/:restraurantid/:orderdate', function (req, res) {
            user.OrderPaymentListonDate(req.params.companyid,req.params.userlevel,req.params.userid,req.params.restraurantid,req.params.orderdate, res);
        })

		app.get('/api/GetOrderDetails/:orderid/:companyid', function (req, res) {
            user.GetOrderDetails(req.params.orderid,req.params.companyid, res);
        })

		
		app.get('/api/GetOrderDetailsForPayment/:orderid/:companyid', function (req, res) {
            user.GetOrderDetailsForPayment(req.params.orderid,req.params.companyid, res);
        })
		
		app.get('/api/GeneratePDFOfInvoice/:orderid/:companyid', function (req, res) {
            user.GeneratePDFOfInvoice(req.params.orderid,req.params.companyid, res);
        })
		
		app.get('/api/GenerateInvoice/:orderid/:companyid', function (req, res) {
            user.GenerateInvoice(req.params.orderid,req.params.companyid, res);
        })
		
		app.get('/api/PaidAmountCheck/:orderid/:paymentdate/:companyid', function (req, res) {
            user.PaidAmountCheck(req.params.orderid,req.params.paymentdate,req.params.companyid, res);
        })

		app.get('/api/ListCustomersdata/:companyid', function (req, res) {
            user.ListCustomersdata(req.params.companyid, res);
        })

		app.get('/api/ListProductsType/:companyid', function (req, res) {
            user.ListProductsType(req.params.companyid, res);
        })
		
		app.delete('/api/DeleteType/:typeid', function (req, res) {
            user.DeleteType(req.params.typeid, res);
        })
		
		app.delete('/api/DeleteProduct/:prdid', function (req, res) {
            user.DeleteProduct(req.params.prdid, res);
        })
		
		app.delete('/api/DeleteCustomer/:custid', function (req, res) {
            user.DeleteCustomer(req.params.custid, res);
        })
		
		app.delete('/api/DeleteUser/:userid', function (req, res) {
            user.DeleteUser(req.params.userid, res);
        })
		
		app.delete('/api/DeleteOrderDetails/:orderid', function (req, res) {
            user.DeleteOrderDetails(req.params.orderid, res);
        })
		
		app.get('/api/SendNotification/', function (req, res) {
            user.SendNotification(req, res);
        });
		
		app.get('/api/GetVendorDetails/:vendorid', function (req, res) {
            user.GetVendorDetails(req.params.vendorid, res);
        });

		app.delete('/api/DeleteVendor/:vendorid', function (req, res) {
            user.DeleteVendor(req.params.vendorid, res);
        });

		
		app.get('/api/ListVendors/', function (req, res) {
            user.ListVendors(req, res);
        });

		
		app.get('/api/ListCompanyPlan/:userlevel/:companyid', function (req, res) {
            user.ListCompanyPlan(req.params.userlevel,req.params.companyid, res);
        });

		
		app.get('/api/GetCompanyPlans/:companyid', function (req, res) {
            user.GetCompanyPlans(req.params.companyid, res);
        });

		
		app.get('/api/CheckPlanValidity/:companyid', function (req, res) {
            user.CheckPlanValidity(req.params.companyid, res);
        });

		
		app.get('/api/GetValidityOnPlan/:plan', function (req, res) {
            user.GetValidityOnPlan(req.params.plan, res);
        });
		
		app.get('/api/ChangePaymentSts/:planid/:amtpaidsts', function (req, res) {
            user.ChangePaymentSts(req.params.planid,req.params.amtpaidsts, res);
        });

		
		app.post('/api/RenewCompanyPlan/', function (req, res) {
            user.RenewCompanyPlan(req.body, res);
        });
		
		app.post('/api/SaveVendor/', function (req, res) {
            user.SaveVendor(req.body, res);
        });

		

		
		
	
    }
};