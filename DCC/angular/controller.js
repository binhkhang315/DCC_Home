var myApp = angular.module('myApp', ['ngCookies']);
//change angular symbol from '{{' and '}}' to '{[{' and'}]}' to avoid conflicting with handlebars's synstax
myApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

// creat angular controller
myApp.controller('LoginCtrl', function($scope, $http, $cookies, $rootScope, AuthService) {
    // function to submit the form after all validation has occurred
    $http.get('/isLogged')
        .then(function(res) {
            $cookies.put('userid', res.data.userid);
        });
    if ($cookies.get('userid')) {
        $rootScope.userid = $cookies.get('userid');
    }
    // call the login function in service.js
    $scope.login = function() {
        var user = {
            username: $scope.username,
            password: $scope.userpassword
        };
        AuthService.login(user).then(function(msg) {
            console.log('you are authenticated');

        }, function(errMsg) {
            console.log('you are not !!');
        });
    };
    // logout function
    $rootScope.logout = function() {
        if (true) { //logout data response
            $cookies.remove('userid');
        }
    }
});
