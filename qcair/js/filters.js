angular.module('qcair.filters', [])

.filter('toStars', function(){

	return function(text){

		return  text.substr(0, 2) + "*****";

	}

});