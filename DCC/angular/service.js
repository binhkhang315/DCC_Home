var cCourse = angular.module('myCourse', ['ngCookies']);
myApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});
