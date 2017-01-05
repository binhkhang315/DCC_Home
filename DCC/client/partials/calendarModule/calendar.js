'use strict';
angular.module('calendarModule', ['ui.calendar']);

//Routers
myApp.config(function($stateProvider) {

  //calendar
  $stateProvider.state('calendar', {
	url: "/calendar",
    templateUrl: 'partials/calendarModule/calendar.html',
	controller: 'calendarController'
  });
});

//Factories
myApp.factory('calendarServices', ['$http', function($http) {

    var factoryDefinitions = {
      getEvents: function() {
        return $http.get('/getEvents').success(function(data) { return data; });
      },

	}

    return factoryDefinitions;
  }
]);

//Controllers
myApp.controller('calendarController', ['$scope', 'calendarServices', '$location', '$rootScope', function($scope, calendarServices, $location, $rootScope) {

    $scope.eventSources = [];

}]);
