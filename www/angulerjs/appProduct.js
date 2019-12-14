  var ProductApp = angular.module('ProductApp', ['ui.bootstrap','ngTouch']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
       if(input!=undefined)
        {return input.slice(start);}
    }
}); 
  ProductApp.controller('productController', function($scope,$http,$window,$rootScope) {
	  
	  var socket = io();
	  $scope.userddetils = {};
	  
					document.addEventListener("deviceready",onDeviceReady,false);
						function onDeviceReady(){
											
						 var push = PushNotification.init({ "android": {"senderID": "699238865608"}});
					 push.on('registration', function(data) {
						 $scope.userddetils = data;
						 $scope.userddetils.userid =  $window.localStorage["userid"];
						
						  $http({
								 method  : 'POST',
								 url     : 'http://103.252.7.5:8086/api/SetRgIdForPush',
								 data    : $scope.userddetils,
								 headers : {'Content-Type': 'application/json'} 
										})
										.success(function(data) {
							
										});
										
										push.on('notification', function(data) {
										 alert(data.title+" Message: " +data.message);
										 });
 
										 push.on('error', function(e) {
										 alert(e);
										 });
											
						});
					}
				var url = window.location.href;
			  var qparts = url.split("?");
			  $scope.valuepassed = qparts[1];
							
			$scope.companyname = $window.localStorage["companyname"];
			$scope.companyname=$scope.companyname.replace(/\"/g,"");
			$scope.username = $window.sessionStorage["username"];
			$scope.username=$scope.username.replace(/\"/g,""); 
			$scope.userid = $window.sessionStorage["userid"].replace(/\"/g,"");
			$scope.userlevel = $window.sessionStorage["Userlevel"];
			$scope.userlevel = $scope.userlevel.replace(/\"/g,""); 
			$scope.supervisor = $window.sessionStorage["supervisor"];
			$scope.entityid = $window.sessionStorage["entityid"];
			$scope.cartlength = 0;
			$scope.notificationcount = 0;
			
			$scope.getDashboardValues = function()
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/getDashboardValues/'+$scope.userlevel+'/'+$scope.userid
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.getDashboardValuescounts = response.data;
			  console.log($scope.getDashboardValuescounts);
		  });
			};
			
			

	
			$scope.ListProducts = function()
			{
				$scope.product = [];
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/ProductList/'+localStorage["companyid"]
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.ProductList = response.data;
			  
			  $scope.GetProductsDetails = function(index)
			  {
				 $scope.product.push($scope.ProductList[index]);
			  }
			});
			};
			

			$scope.ListCustomersdata = function()
			{
				$scope.Customerdetails = [];
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/ListCustomersdata/'+localStorage["companyid"]
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.CustomersList = response.data;
			  
			  $scope.GetCustomersDetails = function(index)
			  {
				 $scope.Customerdetails.push($scope.CustomersList[index]);
			  }
			});
			};
			
			
			$scope.GetCustomerDetails = function()
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/GetCustomerDetails/'+localStorage["custid"]+'/'+$scope.userlevel+'/'+localStorage["companyid"]
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.Customerdetails = response.data;
			  if($scope.Customerdetails[0].validity == null)
			  {
				  $scope.Customerdetails[0].validity = "Unlimited";
			  }
			});
			};
			
			
			$scope.ListProductsType = function()
			{
				$scope.prdtype = []
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/ListProductsType/'+localStorage["companyid"]
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.ProductsTypeList = response.data;
              $scope.GetTypesDetails = function(index)
			  {
				 $scope.prdtype.push($scope.ProductsTypeList[index]);
			  }

			  
			  
			});
			};
			
			
			$scope.ListUsers = function()
			{
				$scope.userdetails = []
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/ListUsers/'+localStorage["companyid"]+'/'+$scope.userlevel+'/'+$scope.userid+'/'+sessionStorage["custid"]
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.UsersList = response.data;
              $scope.GetUsersDetails = function(index)
			  {
				 $scope.userdetails.push($scope.UsersList[index]);
			  }

			  
			  
			});
			};
			
			$scope.DeleteType = function(typeid)
			{
				var yes = confirm('With this action record will paramanantly deleted from system, Want to dele it?');
				if(yes)
				{
				$http({
              method: 'DELETE'
              , url: 'http://103.252.7.5:8086/api/DeleteType/'+typeid
              , dataType: 'jsonp'
			}).then(function (response) {
						alert(response.data.message);
						$scope.ListProductsType();
			});
				}
			};
			
			
			$scope.DeleteProduct = function(prdid)
			{
				var yes = confirm('With this action record will paramanantly deleted from system, Want to dele it?');
				if(yes)
				{
				$http({
              method: 'DELETE'
              , url: 'http://103.252.7.5:8086/api/DeleteProduct/'+prdid
              , dataType: 'jsonp'
			}).then(function (response) {
						alert(response.data.message);
						$scope.ListProducts();
			});
				}
			};
			
			
			$scope.DeleteCustomer = function(custid)
			{
				var yes = confirm('With this action record will paramanantly deleted from system, Want to dele it?');
				if(yes)
				{
				$http({
              method: 'DELETE'
              , url: 'http://103.252.7.5:8086/api/DeleteCustomer/'+custid
              , dataType: 'jsonp'
			}).then(function (response) {
						alert(response.data.message);
						$scope.ListCustomersdata();
			});
				}
			};
			
			$scope.DeleteUser = function(userid)
			{
				var yes = confirm('With this action record will paramanantly deleted from system, Want to dele it?');
				if(yes)
				{
				$http({
              method: 'DELETE'
              , url: 'http://103.252.7.5:8086/api/DeleteUser/'+userid
              , dataType: 'jsonp'
			}).then(function (response) {
						alert(response.data.message);
						$scope.ListUsers();
			});
				}
			};
			
			 $scope.UpdateCompanyprofile= function() {
					$http({
							    method  : 'POST',
								url     : 'http://103.252.7.5:8086/api/UpdateCompanyprofile/',
								data    : $scope.Customerdetails,
								headers : {'Content-Type': 'application/json'} 
					})
					.success(function(data) {
						alert(data.message);
						location.reload();
					});
				};
				
				
			 $scope.SaveType= function() {
				 $scope.prdtype[0].companyid = localStorage["companyid"];
					$http({
							    method  : 'POST',
								url     : 'http://103.252.7.5:8086/api/SaveType/',
								data    : $scope.prdtype,
								headers : {'Content-Type': 'application/json'} 
					})
					.success(function(data) {
						alert(data.message);
						$scope.prdtype = null;
						$scope.ListProductsType();
					});
				};
			

			$scope.SaveUser= function() {
				 $scope.userdetails[0].companyid = localStorage["companyid"];
					$http({
							    method  : 'POST',
								url     : 'http://103.252.7.5:8086/api/SaveUser/',
								data    : $scope.userdetails,
								headers : {'Content-Type': 'application/json'} 
					})
					.success(function(data) {
						alert(data.message);
						$scope.userdetails = null;
						$scope.ListProductsType();
					});
				};
			
			
			
			
			
				socket.emit('Userdetails',{'userid':$scope.userid,'username':$scope.username});
				
				socket.on('serverEventLiveUpdate', function(data){
					
							console.log(data);
								
								for(var i = 0 ; i < $scope.SrsDetails.length;i++)
								{
									for(var j = 0 ; j < data.length;j++)
									{
										if($scope.SrsDetails[i].id == data[j].userid)
											$scope.SrsDetails[i].livestatus = "in";
									}
								}
								$scope.Livestatus($scope.SrsDetails);
								
						
					});
			
			
			socket.on('checkLiveusers', function(data){
							console.log(data)
							socket.emit('Userdetailsondisconnect',{'userid':$scope.userid,'username':$scope.username,"status":'out'});
						
					});
			

				$scope.SaveProduct= function() {
					$scope.product[0].companyid = localStorage["companyid"];
					$http({
							    method  : 'POST',
								url     : 'http://103.252.7.5:8086/api/SaveProduct/',
								data    : $scope.product,
								headers : {'Content-Type': 'application/json'} 
					})
					.success(function(data) {
						alert(data.message);
						$scope.product = null;
						$scope.ListProducts();
					});
				};
				
				
				$scope.SaveCustomers= function() {
					$scope.Customerdetails[0].companyid = localStorage["companyid"];
					$scope.Customerdetails[0].createdby = localStorage["userid"];
					$http({
							    method  : 'POST',
								url     : 'http://103.252.7.5:8086/api/SaveCustomers/',
								data    : $scope.Customerdetails,
								headers : {'Content-Type': 'application/json'} 
					})
					.success(function(data) {
						alert(data.message);
						$scope.Customerdetails = null;
						$scope.ListCustomersdata();
					});
				};
				
				
				
				/* $scope.ListOrders = function()
			{
				$scope.userdetails = []
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/ListOrders/'+localStorage["companyid"]+'/'+$scope.userlevel+'/'+$scope.userid+'/'+sessionStorage["custid"]
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.OrderssList = response.data;
			});
			}; */
			
			
			$scope.OrderListonMonth = function(month)
			{
				$scope.userdetails = []
				var ordermonth = month.getMonth() + 1;
				if(ordermonth < 10)
					ordermonth = '0'+ordermonth;
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/OrderListonMonth/'+localStorage["companyid"]+'/'+$scope.userlevel+'/'+$scope.userid+'/'+sessionStorage["custid"]+'/'+ordermonth
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.OrderssList = response.data;
			});
			};
			
			
			$scope.OrderListonDate = function(passedorderdate)
			{
				$scope.userdetails = []
				if(passedorderdate == undefined)
				{
					var orderdate = new Date(); 
				}
				else
				{
					var orderdate = passedorderdate;
				}
				
				var dd = orderdate.getDate();
				if(dd < 10)
					dd = '0'+dd;
				var mm = orderdate.getMonth() + 1;
				if(mm < 10)
					mm = '0'+mm;
				var yy = orderdate.getFullYear();
				
				var ordrdate = yy+'-'+mm+'-'+dd;
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/OrderListonDate/'+localStorage["companyid"]+'/'+$scope.userlevel+'/'+$scope.userid+'/'+sessionStorage["custid"]+'/'+ordrdate
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.OrderssList = response.data;
			});
			};
			
			
			$scope.OrderPaymentListonMonth = function(month)
			{
				$scope.userdetails = []
				var ordermonth = month.getMonth() + 1;
				if(ordermonth < 10)
					ordermonth = '0'+ordermonth;
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/OrderPaymentListonMonth/'+localStorage["companyid"]+'/'+$scope.userlevel+'/'+$scope.userid+'/'+sessionStorage["custid"]+'/'+ordermonth
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.OrderssList = response.data;
			});
			};
			
			
			$scope.OrderPaymentListonDate = function(passedorderdate)
			{
				$scope.userdetails = []
				if(passedorderdate == undefined)
				{
					var orderdate = new Date(); 
				}
				else
				{
					var orderdate = passedorderdate;
				}
				
				var dd = orderdate.getDate();
				if(dd < 10)
					dd = '0'+dd;
				var mm = orderdate.getMonth() + 1;
				if(mm < 10)
					mm = '0'+mm;
				var yy = orderdate.getFullYear();
				
				var ordrdate = yy+'-'+mm+'-'+dd;
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/OrderPaymentListonDate/'+localStorage["companyid"]+'/'+$scope.userlevel+'/'+$scope.userid+'/'+sessionStorage["custid"]+'/'+ordrdate
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.OrderssList = response.data;
			});
			};
			
			$scope.RedirectForEdit = function(orderid)
			{
					location.href="EditOrder.html?"+orderid;
			};
				$scope.GetOrderDetails = function()
			{
				$scope.userdetails = []
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/GetOrderDetails/'+$scope.valuepassed+'/'+localStorage["companyid"]
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.ProductList = response.data;
			  
			  $scope.ProductList[0].orderdate = new Date($scope.ProductList[0].orderdate);
			});
			};
			
			
			$scope.GetOrderDetailsForPayment = function(orderid)
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/GetOrderDetailsForPayment/'+orderid+'/'+localStorage["companyid"]
              , dataType: 'jsonp'
			}).then(function (response) {
              $scope.OrderDetailsForPayment = response.data;
			  $scope.OrderDetailsForPayment[0].orderdate = new Date($scope.OrderDetailsForPayment[0].orderdate);
			});
			};

			$scope.SendNotification = function(orderid)
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/SendNotification/'
              , dataType: 'jsonp'
			}).then(function (response) {
        
			});
			};
			
			$scope.GenerateInvoice = function(orderid)
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/GenerateInvoice/'+orderid+'/'+localStorage["companyid"]
              , dataType: 'jsonp'
			}).then(function (response) {
             alert(response.data.message);
			 location.reload();
			});
			};
			
			$scope.PaidAmountCheck = function(orderid)
			{
				
				var sysdate = new Date();
				var dd = sysdate.getDate();
				if(dd < 10)
					dd = '0'+dd;
				var mm = sysdate.getMonth() +1;
				if(mm < 10)
					mm = '0'+mm
				var yy = sysdate.getFullYear();
				var paymentdate = yy+'-'+mm+'-'+dd;
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/PaidAmountCheck/'+orderid+'/'+paymentdate+'/'+localStorage["companyid"]
              , dataType: 'jsonp'
			}).then(function (response) {
             alert(response.data.message);
			 location.reload();
			});
			};
				
				
				$scope.SaveNewOrder= function() {
					$scope.orderdetails = [];
					for(var i = 0 ; i < $scope.ProductList.length;i++)
					{
						if($scope.ProductList[i].qty)
						{
							$scope.orderdetails.push($scope.ProductList[i]);
						}
					}
					$scope.orderdetails[0].companyid = localStorage["companyid"];
					$scope.orderdetails[0].restraurant = localStorage["custid"];
					$scope.orderdetails[0].createdby = localStorage["userid"];
					
					
					if($scope.orderdate == undefined)
					{
						
						alert("Please Enter Order Date");
						/* var sysdate = new Date();
						var dd = sysdate.getDate();
						if(dd <10)
							dd = '0'+dd;
						var mm = sysdate.getMonth() +1;
						if(mm < 10)
							mm = '0'+mm;
						yy = sysdate.getFullYear();
						$scope.orderdetails[0].orderdate = yy+'-'+mm+'-'+dd;
						
						
						$http({
							    method  : 'POST',
								url     : 'http://103.252.7.5:8086/api/SaveNewOrder/',
								data    : $scope.orderdetails,
								headers : {'Content-Type': 'application/json'} 
					})
					.success(function(data) {
						alert(data.message);
						location.reload();
					}); */
					}
					else
					{
						
						if($scope.orderdate < new Date())
						{
							alert('Sorry Please selected date properly');
						}
						else
						{
						var dd = $scope.orderdate.getDate();
						if(dd <10)
							dd = '0'+dd;
						var mm = $scope.orderdate.getMonth() +1;
						if(mm < 10)
							mm = '0'+mm;
						yy = $scope.orderdate.getFullYear();
						$scope.orderdetails[0].orderdate = yy+'-'+mm+'-'+dd;
						
						$http({
							    method  : 'POST',
								url     : 'http://103.252.7.5:8086/api/SaveNewOrder/',
								data    : $scope.orderdetails,
								headers : {'Content-Type': 'application/json'} 
								})
								.success(function(data) {
									alert(data.message);
									location.reload();
								});
						}
					}
					
					
				};
				
				
				$scope.UpdateOrder= function() {
					$scope.orderdetailsupdate = [];
					$scope.ProductList[0].amount = 0;
					for(var i = 0 ; i < $scope.ProductList.length;i++)
					{
						if($scope.ProductList[i].qty)
						{
							$scope.ProductList[0].amount = parseFloat($scope.ProductList[0].amount) + parseFloat($scope.ProductList[i].salerate)
							$scope.orderdetailsupdate.push($scope.ProductList[i]);
						}
					}		
					if($scope.ProductList[0].orderdate == undefined)
					{
						
						alert("Please Enter Order Date");
						/* var sysdate = new Date();
						var dd = sysdate.getDate();
						if(dd <10)
							dd = '0'+dd;
						var mm = sysdate.getMonth() +1;
						if(mm < 10)
							mm = '0'+mm;
						yy = sysdate.getFullYear();
						$scope.orderdetails[0].orderdate = yy+'-'+mm+'-'+dd;
						
						
						$http({
							    method  : 'POST',
								url     : 'http://103.252.7.5:8086/api/SaveNewOrder/',
								data    : $scope.orderdetails,
								headers : {'Content-Type': 'application/json'} 
					})
					.success(function(data) {
						alert(data.message);
						location.reload();
					}); */
					}
					else
					{
						
						if($scope.ProductList[0].orderdate < new Date())
						{
							alert('Sorry Please selected date properly');
						}
						else
						{
						var dd = $scope.ProductList[0].orderdate.getDate();
						if(dd <10)
							dd = '0'+dd;
						var mm = $scope.ProductList[0].orderdate.getMonth() +1;
						if(mm < 10)
							mm = '0'+mm;
						yy = $scope.ProductList[0].orderdate.getFullYear();
						$scope.orderdetailsupdate[0].orderdate = yy+'-'+mm+'-'+dd;
					
						
						$http({
							    method  : 'POST',
								url     : 'http://103.252.7.5:8086/api/UpdateOrder/',
								data    : $scope.orderdetailsupdate,
								headers : {'Content-Type': 'application/json'} 
								})
								.success(function(data) {
									alert(data.message);
									location.reload();
								});
						}
					}
					
				};
				
			
			
			
			/* -----------DASHBOARD-------- */
			
			$scope.setFiltervalue = function(setFiltervalue)
			{
				if(setFiltervalue == "All")
				{
					$scope.producttype = undefined;
				}
			};
			
			
			$scope.Curentdate = new Date();
			
				$scope.getDashboardCount = function(interval,valuepassed)
			{
				if(interval =='month')
				{
					var passinterval = valuepassed.getMonth() +1;
					if(passinterval < 10)
						passinterval = '0'+passinterval;
				}
				if(interval =='day')
				{
					var dd = valuepassed.getDate()
					if(dd < 10)
					{dd = '0'+dd}
						var mm = valuepassed.getMonth() +1;
						if(mm < 10)
							mm = '0'+mm;
						var yy = valuepassed.getFullYear();
						var passinterval = yy+'-'+mm+'-'+dd;
				}
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/getDashboardCount/'+passinterval+'/'+interval+'/'+$scope.userlevel+'/'+localStorage["companyid"]+'/'+sessionStorage["custid"]
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.DashboardCount = response.data;
		  });
			};
			
			
			
			
			
});