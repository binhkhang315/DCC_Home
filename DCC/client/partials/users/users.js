'use strict';
angular.module('users', []);

//Routers
myApp.config(function($stateProvider) {

    //Login
    $stateProvider.state('login', {
        templateUrl: 'partials/common/loginHeader.html',
        controller: 'loginController'
    });

    //Logout
    $stateProvider.state('logout', {
        url: "/logout",
        template: "<h3>Logging out...</h3>",
        controller: 'logoutController'
    });

});

//Factories
myApp.factory('userServices', ['$http', function($http) {

    var factoryDefinitions = {
        login: function(loginReq) {
            return $http.post('/users/login', loginReq).success(function(data) { return data; });
        },
        logout: function() {
            return $http.get('/users/logout').success(function(data) { return data; });
        },
    }

    return factoryDefinitions;
}
]);

//Controllers
myApp.controller('loginController', ['$scope', 'userServices', '$location', '$rootScope', function($scope, userServices, $location, $rootScope) {

    //$scope.login = {"username":"qwe@gmail.com", "password": "qwe"};
    $scope.login = {};
    $scope.login.msg ='';
    $scope.doLogin = function() {
        if ($scope.loginForm.$valid) {
            userServices.login($scope.login).then(function(result){
                $scope.data = result;
                console.log(result.data); //DEBUG
                $scope.login.msg = result.data.msg;
                if (result.data.success) {
                    window.sessionStorage["userInfo"] = JSON.stringify(result.data);
                    $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);
                    // redirect to dashboard after login
                    $scope.hidemodal = "modal";
                    $location.path("/dashboard");
                }
            });
        }
    };
}]);

myApp.controller('logoutController', ['$scope', 'userServices', '$location', '$rootScope', function($scope, userServices, $location, $rootScope) {
    userServices.logout().then(function(){
        console.log("----> logout success"); //DEBUG
        sessionStorage.clear();
        $rootScope.userInfo = false;
        // redirect ro home page after logout
        $location.path("/");
    })
}]);
