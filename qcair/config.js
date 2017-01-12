

angular.module('qcair', ['ngRoute', 'qcair.controllers', 'qcair.services'])


.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: './views/home.html'
		})
		.when('/meetus', {
			templateUrl: './views/meetus.html'
		})
		.when('/volunteer', {
			controller: 'paymentCtrl',
			templateUrl: './views/volunteer.html'
		})
		.when('/jobs', {
			templateUrl: './views/teams/jobs.html'
		})
		.when('/pip', {
			templateUrl: './views/teams/pip.html'
		})
		.when('/hd', {
			templateUrl: './views/teams/honors.html'
		})
		.when('/rg', {
			templateUrl: './views/teams/riseup.html'
		})
		.when('/mission', {
			templateUrl: './views/mission.html'
		})
		.when('/progress', {
			templateUrl: './views/progress.html'
		})
	    .when('/contact', {
	    	templateUrl: './views/contact.html',
	    	controller: 'mailCtrl'
	    })
	    .when('/login',{
			templateUrl: './views/login.html',
			controller: 'loginCtrl'
		})
		.when('/dashboard', {
			templateUrl: './views/dashboard.html'
	    })
	    .when('/presLogin', {
	    	templateUrl: 'views/backend/presLogin.html',
	    	controller: 'loginCtrl'
	    })
	    .when('/presAccess', {
	    	resolve: {
			"check": function($location, $rootScope){
				// if(!$rootScope.pres){
				// 	$location.path('/login');
				// }
			}
		},
	    	controller: 'presCtrl',
	    	templateUrl: 'views/backend/predAccess.html'
	    })
	    .when('/presChange', {
	    
	    	templateUrl: 'views/backend/presChange.html',
	    	controller: 'presCtrl'
	    })
	    .when('/adminAccess', {
	    	resolve: {
			"check": function($location, $rootScope){
				// if(!$rootScope.loggedIn){
				// 	$location.path('/login');
				// }
			}
		},
	    	controller: 'adminCtrl',
	    	templateUrl: 'views/backend/adminAccess.html'
	    })
	    .when('/processGreen', {
	    	templateUrl: './views/payment-outcomes/accepted.html'
	    })
	    .when('/processRed', {
	    	templateUrl: './views/payment-outcomes/declined.html'
	    })
	    .otherwise({
	    	redirectTo: '/'
	    });
});