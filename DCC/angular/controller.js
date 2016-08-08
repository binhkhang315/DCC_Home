var myApp = angular.module('myApp', ['ngCookies']);
//change angular symbol from '{{' and '}}' to '{[{' and'}]}' to avoid conflicting with handlebars's synstax
myApp.config(
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    }
);
// myApp.config(
//     function($routeProvider) {
//         $routeProvider.
//             when('/', {templateUrl:'/home'}).
//             when('/course/coursesoverview/:id',
//                 {
//                     controller:setCourse,
//                     templateUrl: function(params){ return '/course/coursesoverview/' + params.id; }
//                 }
//             ).
//             otherwise({redirectTo:'/'});
//     }
// );

// creat angular controller
myApp.controller('LoginCtrl', function($scope, $http, $cookies, $rootScope) {
    // function to submit the form after all validation has occurred
    $http.get('/isLogged')
        .then(function(res) {
            $cookies.put('userid', res.data);
            $rootScope.userid = $cookies.get('userid');
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
    $scope.isAuthenticated = false;
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
myApp.controller('setCourse', function($scope, $http, $location) {

    $http.get('/course/getCourse').then(function(result) {
        console.log(result.data);
        $scope.courseName = result.data.courseName;
        $scope.courseTrainer = result.data.courseTrainer;
        $scope.courseTrainerPage = result.data.courseTrainerPage;
        $scope.courseDescription = result.data.courseDescription;
        $scope.courseCategory = result.data.courseCategory;
        $scope.courseDocuments = result.data.courseDocuments;
    });
});

myApp.controller('getList', function($scope, $http) {
    $http.get('/course/list').then(function(result) {
        console.log(result.data);
        $scope.coursesList = result.data.course;
    });
});

myApp.controller('setFeature', function($scope, $http) {
    $http.get('/course/features').then(function(result) {
        console.log(result.data);
        $scope.courseDocuments = result.data.courseDocuments;
        $scope.courseFeedback = result.data.courseFeedback;
        $scope.courseTest = result.data.courseTest;
        $scope.courseRating = result.data.courseRating;

    });
});

myApp.controller('setProfile', function($scope, $http) {
    $http.get('/users/profile').then(function(result) {
        console.log(result.data);
        $scope.pStatus = result.data.pStatus;
        $scope.pName = result.data.pName;
        $scope.pDoB = result.data.pDoB;
        $scope.pPhone = result.data.pPhone;
        $scope.pLocation = result.data.pLocation;
        $scope.pEmail = result.data.pEmail;
    });
});

myApp.controller('deleteCourse', function($scope, $http) {
    $http.get('/course/deleteCourse').then(function(result) {

    });
});

//myApp.controller('')


myApp.controller('FeedbackCtrl',function($scope, $http){
  $scope.addFeedback = function() {
      $http.post('/course/coursesoverview/feedback', {
          comment : $scope.comment,
          // rating : $scope.rating,
      }).success(function(data, status, headers, config) {
          $scope.feedbacks.push({
            comment : $scope.comment,
            // rating : $scope.rating
          });
          $scope.comment = '';
      }).error(function(data, status, headers, config) {
          console.log("Ops: " + data);
      });
  };
});
//myApp.controller('')
