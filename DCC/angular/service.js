// /**
//  * service.js implements post or get method, function such as login, log out...
//  * and saves information to cookie ...
//  */
// var myController = angular.module('myApp');
//
// myController.service('AuthService', function($http, $q, $cookies, $rootScope) {
//     // implement post method in when login
//     var isAuthenticated = false;
//     var login = function(user) {
//         return $q(function(resolve, reject) {
//             $http.post('/users/login', user).then(function(result) {
//                 if (result.data.userid) {
//                     isAuthenticated = true;
//                     $cookies.put('userid', result.data.userid);
//                     $rootScope.userid = result.data.userid;
//                     resolve(result.data.msg);
//                 } else {
//                     isAuthenticated = false;
//                     reject(result.data.msg);
//                 }
//             });
//         });
//     };
//
//     return {
//         login: login,
//         isAuthenticated: function() {
//             return isAuthenticated;
//         },
//     };
// });
