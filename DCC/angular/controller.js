var myApp = angular.module('myApp', ['ngCookies']);
//change angular symbol from '{{' and '}}' to '{[{' and'}]}' to avoid conflicting with handlebars's synstax
myApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});
// creat angular controller
myApp.controller('LoginCtrl', function($scope, $http, $cookies, $rootScope) {
    // function to submit the form after all validation has occurred
    $http.get('/isLogged')
        .then(function(res) {
            $cookies.put('userid', res.data.userid);
        });
    if ($cookies.get('userid')) {
        $rootScope.userid = $cookies.get('userid');
    }
    // login/ logout message: success or fail
    $scope.message = '';
    // call the login function in service.js
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.isAuthenticated =  false;
    $scope.login = function() {
      $http.post('/users/login', $scope.user).then(function(result) {
          if (result.data.userid) {
              $scope.isAuthenticated = true;
              $cookies.put('userid', result.data.userid);
              $rootScope.userid = result.data.userid;
              $scope.message = result.data.msg;
          } else {
              $scope.isAuthenticated = false;
              $scope.message = result.data.msg;
          }
      });
    };
    // logout function
    $rootScope.logout = function() {
        if (true) { //logout data response
            $cookies.remove('userid');
        }
    }
});
