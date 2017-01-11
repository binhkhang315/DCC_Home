'use strict';

angular.module('courseManager',);

//Routers
myApp.config(function($stateProvider) {
    $stateProvider.state('courseManager', {
        url: '/courseManager',
        templateUrl: 'partials/trainerModule/courseManager/courseManager.html',
        data:{
            auth:true
        }
    });

});


//Controllers
myApp.controller('UpdateCourseCtrl', ['$scope', ])
