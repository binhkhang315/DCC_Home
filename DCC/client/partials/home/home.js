'use strict';

angular.module('home', []);

//Routers
myApp.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/homepage',
        templateUrl: 'partials/home/home.html',
        controller: 'homeCtrl',
    });

});

myApp.controller('homeCtrl', [function(moment, alert, calendarConfig) {


}]);
