angular.module('qcControllers', [])

.controller('mailCtrl', ($scope)=>{


	$scope.submit = function(){
	   	var expression = /\S/g;
	   	console.log(expression.test($scope.mail.name));

	    if(expression.test($scope.mail.name) === false || $scope.mail.name === undefined || expression.test($scope.mail.phone) === false || $scope.mail.phone === undefined || expression.test($scope.mail.email) === false || $scope.mail.email === undefined || $scope.mail.subject === undefined || expression.test($scope.mail.subject) === false){
	   		console.log('Some fields are empty');
	   } else{
		   $http.post('/mail', $scope.mail)
		   	.success(function(data){
		   		$scope.response = "Your Message has been sent! We thank you!";
		   		$scope.mail = '';
		   	})
		   	.error(function(data){
		   		$scope.response = "I'm sorry, there was a problem while sending your message, please try again!";
		   	});
	   }
	}


})

.controller('loginCtrl', ($scope)=>{

	$scope.submitAdmin = function(){
		$http.put('/login', $scope.admin)
		.success(function(response){
			console.log(response);
			if(response === true){
			
				$rootScope.loggedIn = true;
				$location.path('/adminAccess');

			} else if(response === "president"){
			
				$rootScope.pres = true;
				$location.path('/predAccess');
				console.log('Im still listening');
			} else{
				$scope.wrong = "Wrong Password or Username";
			}
		})
		.error(function(err){
			console.log(err);
		});
	}



})
.controller('presCtrl', ($scope, $http)=>{


	function refresh(){
			$http.get('/pres')
				.success(function(response){
					$scope.current = response;
					
				})
				.error(function(err){
					console.log(err);
				});
		};
		
		refresh();


	$scope.rewrite = function(id){
		$http.get('/pres/', id)
			.success(function(response){
				console.log(response);
			});
			var expression = /\S/g;

	if($scope.presi.username === undefined || expression.test($scope.presi.username) === false || $scope.presi.password === undefined || expression.test($scope.presi.password) === false){
		 window.alert('Both fields need to have a value');
		} else {
			console.log(id);

			if($scope.presi.username !== $scope.pre.ucon){
				window.alert('Usernames do not match');
				console.log('Usernames do not match');
			} else if($scope.presi.password !== $scope.pre.pcon){
				window.alert('Passwords do not match');
			} else{
				console.log(id);
				
				$http.put('/pres/' + id, $scope.presi)
				.success(function(){
					console.log("The presidents Credential have changed");
					refresh();
					window.alert('Write Down the Password');
				})
				.error(function(response){
					console.log("the presidents credentials were not changed");
					console.log("Error occured at: " + response);
				});
			}
		}
	};

	function refresh(){
		$http.get('/admin')
			.success(function(response){
				$scope.admins = response;
				console.log('successfully displayed users');
			})
			.error(function(err){
				console.log('error at  :' + err);
			});
	};
		refresh();
		
		$scope.addAdmin = function(){
			$http.post('/admin', $scope.admin).
				success(function(response){
					$scope.admin = '';
					console.log('The database was added too');
					refresh();
				});
		};

		$scope.removeAdmin = function(id){
			console.log(id);
			$http.delete('/admin/' + id)
				.success(function(){
					console.log('Admin has been removed');
						refresh();
				})
				.error(function(err){
					console.log(err);
				});
		}

		$scope.editAdmin = function(id){
			console.log(id);
			$http.get('/admin/' + id)
				.success(function(response){
					$scope.admin = response;
				});
		}

		$scope.updateAdmin = function(){
			console.log($scope.admin._id);
			var id = $scope.admin._id;
			$http.put('/admin/' + id, $scope.admin)
				.success(function(response){
						console.log(response);
						$scope.admin = '';
						console.log("Admin has been updated");
						refresh();
					});
		}

		

		function reload(){
			$http.get('/contact')
			.success(function(response){
				console.log(response);
				$scope.contacts = response;
			})
			.error(function(err){
				console.log(err);
			});
		}

		reload();

		$scope.addContact = function(){
			$http.post('/contact', $scope.contact)
				.success(function(response){
					console.log(response);
					$scope.contact = '';
					reload();
				})
				.error(function(err){
					console.log(err);
				});
		}

		$scope.removeContact = function(id){
			console.log(id);
			$http.delete('/contact/' + id)
			.success(function(response){
				console.log('Contact has been removed');
				reload();
			});
		}

		$scope.editContact = function(id){
			console.log(id);
			$http.get('/contact/' + id)
			.success(function(response){
				$scope.contact = response;
			});
		}

		$scope.updateContact = function(){
			console.log($scope.contact.name);
			var id = $scope.contact._id;
			$http.put('/contact/' + id, $scope.contact)
			.success(function(response){
				console.log(response);
				console.log('Contact has been edited successfully');
				$scope.contact = '';
				reload();
			});
		}

		
	function loaded(){
		$http.get('/events').success(function(response){
			console.log(response);
			$scope.events = response;
		});
	}
		loaded();
		$scope.addEvent = function(){
			$http.post('/events', $scope.event).success(function(response){
				console.log(response);
				console.log("Your event has been added");
				$scope.event = '';
				loaded();
			});
		}

		$scope.removeEvent = function(id){
			$http.delete('/events/' + id).success(function(res){
				console.log('event has been removed');
				loaded();
			});
		}

		$scope.editEvent = function(id){
			console.log(id);
			$http.get('/events/' + id).success(function(res){
				$scope.event = res;
				console.log(res);
			});
		}

		$scope.updateEvent = function(){
			var id = $scope.event._id;
			$http.put('/events/' + id, $scope.event).success(function(res){
				console.log('Your event has been updated');
				$scope.event = '';
				loaded();
			});
		}



})
.controller('paymentCtrl', ($scope)=>{


})
.controller('adminCtrl', ($scope)=>{
	
});