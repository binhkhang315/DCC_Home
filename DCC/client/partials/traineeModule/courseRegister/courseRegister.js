'use strict';

angular.module('courseRegister', ['ui.toggle']);

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
        getTrainingProgram: function() {
            return $http.get('partials/traineeModule/courseRegister/mock/trainingprogram.json').success(function(data) { return data; });
        },
        getOpeningCourse: function() {
            return $http.get('partials/traineeModule/courseRegister/mock/openingCourse.json').success(function(data) { return data; });
        },
        getMyEnrolledCourse: function() {
            return $http.get('partials/traineeModule/courseRegister/mock/myEnroll.json').success(function(data) { return data; });
        },
    }
    return factoryDefinitions;
}
]);


//Controllers
myApp.controller('courseRegisterCtrl', ['$scope', 'courseRegisterServices', function($scope, courseRegisterServices) {
    //Clone Object function
    function clone(obj) {
        var copy;
        if (null == obj || "object" != typeof obj) return obj;
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    courseRegisterServices.getMyEnrolledCourse().then(function(result){
        $scope.myEnrolledCourse = result.data;
    });

    courseRegisterServices.getOpeningCourse().then(function(result){
        $scope.openingCourseList = result.data;
    });


    courseRegisterServices.getTrainingProgram().then(function(result){

        $scope.trainingProgramList = result.data;
    });

    $scope.findCourse = function(courseSearchKey){
        var key = $scope.courseSearchKey;
        var trainingProgram = clone($scope.trainingProgramList);
        var courseListSearch = [];
        for(var i=trainingProgram.length-1; i>=0; i--){
            for(var j=trainingProgram[i].myCourseList.length-1; j>=0; j--){
                if((trainingProgram[i].myCourseList[j].name.toUpperCase()).indexOf(key.toUpperCase())===-1){
                    trainingProgram[i].myCourseList.splice(j,1);
                }
            }
        }
        for (var i = 0; i < trainingProgram.length; i++) {
            for (var j = 0; j < trainingProgram[i].myCourseList.length; j++) {
                courseListSearch.push(trainingProgram[i].myCourseList[j]);
            }
        }
        $scope.courseListSearchResult = courseListSearch;
    }
}]);
