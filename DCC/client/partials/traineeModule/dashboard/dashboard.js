'use strict';

angular.module('dashboard', []);

//Routers
myApp.config(function($stateProvider) {
  $stateProvider.state('dashboard', {
	url: '/dashboard',
    templateUrl: 'partials/traineeModule/dashboard/dashboard.html',
	data:{
		auth:true
	}
  });

});

//Factories
myApp.factory('dashboardServices', ['$http', function($http) {

    var factoryDefinitions = {
      getMyTraingPrograms: function() {
        return $http.get('partials/traineeModule/dashboard/mock/myTrainingprogram.json').success(function(data) { return data; });
      },
	}

    return factoryDefinitions;
  }
]);

//Controllers
myApp.controller('MyCoursesCtrl', ['$scope', 'dashboardServices', function($scope, dashboardServices) {
	dashboardServices.getMyTraingPrograms().then(function(result){
        result.data.forEach(traningProgram => {
            traningProgram.myCourseList.forEach(course => {
                if (course.status == 'Enrolled') {course.backgroundColor = '#4FC3F7'}
                else if (course.status == 'Learning') {course.backgroundColor = '#e57300'}
                else if (course.status == 'Not test') {course.backgroundColor = '#F44336'}
                else if (course.status == 'Learned') {course.backgroundColor = '#8BC34A'}
                else {course.backgroundColor = '#4FC3F7'}
            });
        });
		$scope.myTrainingProgramList = result.data;
        
	});
}]);
