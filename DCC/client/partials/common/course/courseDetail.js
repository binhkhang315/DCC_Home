'use strict';
angular.module('courseDetail', []);


myApp.config(function($stateProvider) {
    $stateProvider.state('courseDetail', {
        url:"/courseDetail",
        templateUrl: 'partials/common/course/courseDetail.html',
    });
});
