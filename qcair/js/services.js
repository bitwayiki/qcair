angular.module('qcair.services', ['qcair.controllers'])

.service('$mailService', function($rootScope, $http, $q){
	
	this.sendMessage = function(message){
		
		$rootScope.loading = true;
		
		return $q(function(resolve, reject){
			//Techinically Depecrated Change If I have time
		   $http.post('/mail', message)
			   	.success(function(){
			   		resolve([{}, "Your Message has been sent! We thank you!" ])
			   	})
			   	.error(function(){
			   		resolve("I'm sorry, there was a problem while sending your message, please try again!");
			   	});

		});
	
	}

	


})
.service('$loginService', function($rootScope, $location, $http, $q){

	this.authenticate = function(credentials){
		
		$rootScope.loading = true;

		return $q(function(resolve, reject){

			$http.put('/login', credentials)
				//Success Error are deprecated, technically, switch to promise if I have time
				.success(function(response){
					
					if(response){
						//If the credential were correct it will reply either 'president' or just true
						var route = '/adminAccess';

						if(response === 'president'){ 
							$rootScope.pres = true;
							route = '/predAccess';
						} else {
							$rootScope.loggedIn = true;
						}
						$rootScope.loading = false;
						$location.path(route);
						resolve(true);
					}

					resolve("Wrong Password or Username");
				
				})
				.error(function(err){
					console.log(err);
					//Let User Know there is a problem with connection
					resolve("I'm sorry there was an error while attempting to authenticate");
				});


		});

	}
	//End Authenticate


})
.service('$dashboardService', function($q, $http){

	this.add = function(route, object){

		return $q(function(resolve, reject){

			$http.post(route, object)
				.success(function(response){
					resolve(true);
				})
				.error(function(err){
					resolve(err);
				});

		});
	}

	this.delete = function(route){

		return $q(function(route){

			$http.delete(route).success(function(){
				resolve('Has been removed');
			});

		});

	}

	
	this.grab = function(route){
		//grab single value
		return $q(function(resolve, reject){

			$http.get(route)
				  .success(function(response){
					resolve(response);
			});

		});

	}

	this.update = function(route, object){

		return $q(function(resolve, reject){
		
			$http.put(route, object)
				.success(function(){
					console.log('edited successfully');
					resolve(true);
				})
				.error(function(){
					resolve(false);
				});


		});
		
	}

});








