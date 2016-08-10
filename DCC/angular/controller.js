var myApp = angular.module('myApp', ['ngCookies']);
//change angular symbol from '{{' and '}}' to '{[{' and'}]}' to avoid conflicting with handlebars's synstax
myApp.config(
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    }
);

// creat angular controller
myApp.controller('LoginCtrl', function($scope, $http, $cookies, $rootScope, $window) {
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
                $window.location.reload();
            } else {
                $scope.isAuthenticated = false;
                $scope.message = result.data.msg;
            }
        });
    };
    // logout function
    $rootScope.logout = function() {

            $cookies.remove('userid');
            $window.location.reload();

    }
});
myApp.controller('setCourse', function($scope, $http,$window) {
    var path = $window.location.pathname;
    path = path.split('/');
    var courseID = path.pop();
    $http.post('/course/getCourse',{courseID:courseID}).then(function(result) {
        $scope.courseName = result.data.courseName;
        $scope.courseTrainer = result.data.courseTrainer;
        $scope.courseTrainerPage = result.data.courseTrainerPage;
        $scope.courseDescription = result.data.courseDescription;
        $scope.courseCategory = result.data.courseCategory;
        $scope.courseDocuments = result.data.courseDocuments;
    });
});

myApp.controller('getList', function($scope,$rootScope, $http) {
    $http.get('/course/list').then(function(result) {
      $rootScope.coursesList = result.data.course;
    });
});

myApp.controller('setFeature', function($scope, $http) {
    $http.get('/course/features').then(function(result) {
        $scope.courseDocuments = result.data.courseDocuments;
        $scope.courseFeedback = result.data.courseFeedback;
        $scope.courseTest = result.data.courseTest;
        $scope.courseRating = result.data.courseRating;

    });
});

myApp.controller('setProfile', function($scope, $http) {
    $http.get('/users/userprofileController').then(function(result) {
        $scope.pStatus = result.data.pStatus;
        $scope.pName = result.data.pName;
        $scope.pDoB = result.data.pDoB;
        $scope.pPhone = result.data.pPhone;
        $scope.pLocation = result.data.pLocation;
        $scope.pEmail = result.data.pEmail;
    });
});

// add course controller
myApp.controller('addCourse', function($scope,$rootScope, $http) {
        $scope.courseslist = {
            courseName: '',
            courseDescription: '',
            courseCategory: '',
            courseTest: '',
            courseDocuments: '',
            courseTrainerID: ''
        };
        $scope.addCourse = function() {
            $http.post('/course/addCourse', $scope.courseslist).then(function(result) {
                $http.get('/course/list').then(function(result) {
                  $rootScope.coursesList = result.data.course;
                });
            });
        }

});



myApp.controller('deleteCourse', function($scope, $http) {
    $http.get('/course/deleteCourse').then(function() {

    });
});

//myApp.controller('')


//controller for Feedback
myApp.controller('FeedbackCtrl',function($scope, $http){
  $scope.addFeedback = function() {
      $http.post('/course/coursesoverview/comment', {
          comment : $scope.comment,
      }).success(function(data, status, headers, config) {
          $scope.feedbacks.push({
            comment : $scope.comment,
          });
          $scope.comment = '';
      });
  };
  $scope.addRating = function(){
    $http.post('/course/coursesoverview/rating', {
        rating : $scope.rating,
    }).success(function(data, status, headers, config) {
        $scope.feedbacks.push({
          rating : $scope.rating,
        });
    });
  };

});
//myApp.controller('')
