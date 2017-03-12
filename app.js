//Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//routes
weatherApp.config(function ($routeProvider, $locationProvider) {

	$locationProvider.hashPrefix('');

	$routeProvider

	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})

	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})


})

//services
weatherApp.service('cityService', function() {

})

//controllers
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {

	$scope.city = cityService.city || 'Moscow';

	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});

	$scope.submit = function() {
		$location.path("/forecast");
	};

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$http', '$sce', 'cityService', function($scope, $resource, $http, $sce, cityService) {

	$scope.city = cityService.city || 'Moscow';

	var url = 'http://api.openweathermap.org/data/2.5/weather?q='+$scope.city+'&APPID=ffb4ddc71a84c3e539fae4e5afcb5d4d';

	$sce.trustAsResourceUrl(url);

	//$scope.weatherResult = '';

        $http.get(url, 'content.json')
            .then(function(response){
    			console.log('success');
    			$scope.weatherResult = response.data;
    			//console.log($scope.weatherResult);
    		},function(error){
    			console.log('fail');
			});   

    $scope.convertToCelsius = function(degK) {

    	return Math.round(degK - 273.15);

    }

    $scope.convertToDate = function(dt) {

    	//var date = new Date(dt * 1000);

  //   	var options = {
		//   year: 'numeric',
		//   month: 'long',
		//   day: 'numeric',
		//   weekday: 'long',
		//   timezone: 'UTC',
		//   hour: 'numeric',
		//   minute: 'numeric',
		//   second: 'numeric'
		// };

		//console.log(date.toLocaleString('ru'));
    	//return date.toLocaleString("ru", options);
    	return Date(dt);
    
    }
	// $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

	// $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, APPID: 'ffb4ddc71a84c3e539fae4e5afcb5d4d' });


}]);

//directives
weatherApp.directive("weatherReport", function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/weatherReport.html',
		replace: true,
		scope: {
			weather: '=',
			convertToStandart: '&',
			convertToDate: '&'
		}
	}
});
