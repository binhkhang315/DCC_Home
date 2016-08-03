var myApp = angular.module('myApp', ['ngCookies']);
//change angular symbol from '{{' and '}}' to '{[{' and'}]}' to avoid conflicting with handlebars's synstax
myApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});
myApp.controller('LayoutCtrl', function($scope, $http, $cookies, $rootScope){
  // function to submit the form after all validation has occurred
  $http.get('/isLogged')
      .then(function(res) {
        console.log('this is get /isLogged');
        if (res.data.userid)
          localStorage.setItem('userid', res.data.userid);
      });
  if (localStorage.length > 0) {
      $rootScope.userid = localStorage.getItem('userid');
  }
});
// creat angular controller
myApp.controller('LoginCtrl', function($scope, $http, $cookies, $rootScope) {
    // login/ logout message: success or fail
    $scope.message = '';
    // call the login function in service.js
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.isAuthenticated =  false;
    $scope.login = function() {
      $http.post('/users/login', $scope.user).then(function(res) {
          if (res.data.userid) {
              $scope.isAuthenticated = true;
              localStorage.setItem('userid', res.data.userid);
              $rootScope.userid = res.data.userid;
              $scope.message = res.data.msg;
          } else {
              $scope.isAuthenticated = false;
              $scope.message = res.data.msg;
          }
      });
    };
    // logout function
    $rootScope.logout = function() {
        if (true) { //logout data response
            localStorage.clear();
        }
    }
});
