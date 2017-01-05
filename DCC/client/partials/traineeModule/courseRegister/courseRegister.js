'use strict';

angular.module('courseRegister', ['chart.js']);

//Routers
myApp.config(function($stateProvider) {
  $stateProvider.state('courseRegister', {
	url: '/courseRegister',
    templateUrl: 'partials/traineeModule/courseRegister/courseRegister.html',
	data:{
		auth:true
	}
  });

});

//Factories
myApp.factory('courseRegisterServices', ['$http', function($http) {

    var factoryDefinitions = {
      getCustomersReports: function() {
        return $http.get('').success(function(data) { return data; });
      },
	}
    return factoryDefinitions;
  }
]);

//Controllers
myApp.controller('courseRegisterCtrl', ['$scope', 'reportsServices', function($scope, reportsServices) {
	reportsServices.getCustomersReports().then(function(result){
		$scope.data = result.data;
	});
}]);

// myApp.controller('courseRegisterCtrl', ['$scope', 'reportsServices', function($scope, reportsServices) {
// 	reportsServices.getOrdersReports().then(function(result){
// 		$scope.data = result.data;
// 	});
// }]);
