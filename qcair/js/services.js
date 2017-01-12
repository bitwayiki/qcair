angular.module('qcair.services', ['qcair.controllers'])

.service('presidentService', function($scope){
	this.test = "test";
})
.service('$loginService', function($rootScope, $location, $http, $q){

	this.authenticate = function(credentials){

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

								$location.path(route);
								resolve(true);
							}

							resolve("Wrong Password or Username");
						
						})
						.error(function(err){
							console.log(err);
							resolve("I'm sorry there was an error while attempting to authenticate");
						});


		});

	}
	//End Authenticate


});