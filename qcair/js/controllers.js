angular.module('qcair.controllers', ['qcair.services', 'qcair.filters'])

.controller('mailCtrl', function($scope, $rootScope ,$mailService){


	$scope.submit = function(isValidForm){
		//isValidForm is not needed, added for safety case
		if (isValidForm){

		   $mailService.sendMessage($scope.mail).then(function(res){
		   		$rootScope.loading = false;

		   		//Expect String if Error, Array if successs
		   		if (typeof res == String){ 
		   			$scope.response = res;
		   			return; 
		   		}
		   		
		   		$scope.mail = res[0];
		   		$scope.response = res[1];
		   });
		}
	}
})

.controller('loginCtrl', function($scope, $loginService, $rootScope){
	
	$scope.submitAdmin = function(){

		$scope.response = "";	
		//authenicating user
		$loginService.authenticate($scope.admin).then(function(res){
			$rootScope.loading = false;
			$scope.response = res;
		});
	}

})

.controller('dashboardCtrl', function($scope, $rootScope, $http, $dashboardService){
	//PresAccess and AdminAccess Share this controller
	//This is because they do the same exact things but pesAccess does a little more

	function refresh(){
		//This needs to be put into a service and rewritten/modularized- Do when I have time
		//grab updates info
			$http.get('/pres')
				.success(function(response){
					$scope.current = response;
					
				})
				.error(function(err){
					console.log(err);
				});

			$http.get('/contact')
			.success(function(response){
				
				$scope.contacts = response;
			})
			.error(function(err){
				console.log(err);
			});

			$http.get('/event').success(function(response){
				
				$scope.events = response;
			});

			$http.get('/admin')
				.success(function(response){
					$scope.admins = response;
				})
				.error(function(err){
					console.log('error at  :' + err);
				});	
		}
	//refreshing everything	
	refresh();

	$scope.grab_to_edit = function(ref, object, id){
		//simply grabbing to fill in input value
		$rootScope.loading = true;
		$dashboardService.grab("/" + ref + "/" + id).then(function(res){
			$scope[ref] = res;
			$rootScope.loading = false;
		});
	}

		
	$scope.add = function(ref, object){
		$rootScope.loading = true;
		//post request on route specified
		$dashboardService.add( '/' + ref , object).then(function(res){
			if(res){
				$rootScope.loading = false;
				refresh();
				$scope[ref] = '';
				return;
			}
			$rootScope.loading = false;
			window.alert("There was a problem while attempt to add" + ref);
		});
	}

	$scope.remove = function(ref, id){
		$rootScope.loading = true;
		//Delete request on route specified
		$dashboardService.delete('/' + ref + "/" + id).then(function(){
			$rootScope.loading = false;
			refresh();
		});
	}

	$scope.update = function(ref, object ,id){
		 $rootScope.loading = true;
		 //put request to update
		 $dashboardService.update("/" + ref + "/" + id, object).then(function(){
			$rootScope.loading = false;
		 	$scope[ref] = "";
		 	refresh();
		 });
	}

	$scope.rewrite = function(id){
		//Reassing the president--sloppy, needs to be rewritten
		if ($scope.presi.username !== $scope.pre.ucon){
			window.alert('Usernames do not match');
		} else if ($scope.presi.password !== $scope.pre.pcon){
			window.alert('Passwords do not match');
		} else {	
			//Should be put in a service
			$http.put('/pres/' + id, $scope.presi)
			.success(function(){
				console.log("The presidents Credential have changed");
				refresh();
				window.alert('Write Down the Password');
			})
			.error(function(response){
				console.log("Error occured at: " + response);
			});
		
		}

	}

})
.controller('paymentCtrl', function($scope, $http){
	//Prolly need Braintree-Angular Module for simplier execution
	$http.get('/clientToken').success(function(token){
		setupBrainTree(token);
	});

});