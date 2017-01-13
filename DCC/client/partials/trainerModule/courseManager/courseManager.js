'use strict';

angular.module('courseManager', []);

//Routers
myApp.config(function($stateProvider) {
    $stateProvider.state('courseManager', {
        url: '/courseManager',
        templateUrl: 'partials/trainerModule/courseManager/courseManager.html',
        data:{
            auth:true
        },
        controller: 'courseManagerCtrl'
    });

});

myApp.controller('courseManagerCtrl', [ '$scope', function($scope) {
    $scope.templates =[
        { name: 'addCourse.html', url: 'partials/trainerModule/courseManager/addCourse.html'},
        { name: 'editCourse.html', url: 'partials/trainerModule/courseManager/editCourse.html'},
        { name: 'deleteCourse.html', url: 'partials/trainerModule/courseManager/deleteCourse.html'}];
    }]);
