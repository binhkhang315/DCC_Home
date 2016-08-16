var myApp = angular.module('myApp', ['ngCookies', 'ngTagsInput', 'textAngular']);
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

myApp.controller('SetCourseCtrl', function($scope, $http, $window,$sce) {
    var path = $window.location.pathname;
    path = path.split('/');
    var courseID = path.pop();
    $http.post('/course/getCourse', {
        courseID: courseID
    }).then(function(result) {
        var trainerJSON = result.data.courseTrainer;
        var trainers = [];
        for (var i = 0; i < trainerJSON.length; i++) {
            trainers.push(trainerJSON[i].text);
        }
        $scope.courseName = result.data.courseName;
        $scope.courseTrainer = trainers;
        $scope.courseTrainerPage = result.data.courseTrainerPage;
        $scope.courseDescription = $sce.trustAsHtml(result.data.courseDescription);
        $scope.courseCategory = result.data.courseCategory;
        $scope.courseDocuments = result.data.courseDocuments;
    });
});

myApp.controller('GetListCtrl', function($scope, $rootScope, $http) {
    $http.get('/course/list').then(function(result) {
        $rootScope.coursesList = result.data.course;
        for (var i = 0; i < $rootScope.coursesList.length; i++) {
            $rootScope.coursesList[i].trainerID = JSON.parse($rootScope.coursesList[i].trainerID);
            $rootScope.coursesList[i].trainerIDJSON = $rootScope.coursesList[i].trainerID;
            var trainers = $rootScope.coursesList[i].trainerID[0].text;
            for (var j = 1; j < $rootScope.coursesList[i].trainerID.length; j++) {
                trainers = trainers + ' / ' + $rootScope.coursesList[i].trainerID[j].text;
            }
            $rootScope.coursesList[i].trainerID = trainers;
        }
    });

    // edit course
    $scope.editCourse = function(course) {
        $rootScope.courseslistEdit = {
            courseIDEdit: course.id,
            courseNameEdit: course.name,
            courseDescriptionEdit: course.description,
            courseCategoryEdit: course.category,
            courseTestEdit: course.test,
            courseDocumentsEdit: course.documents,
            courseTrainerIDEdit: course.trainerIDJSON
        }
    }

    // delete course
    $scope.deleteCourse = function(course) {
        $rootScope.courseslistDelete = {
            courseIDDelete: course.id,
            courseNameDelete: course.name,
            // courseDescriptionDelete: course.description,
            // courseCategoryDelete: course.category,
            // courseTestDelete: course.test,
            // courseDocumentsDelete: course.documents,
            // courseTrainerIDDelete: course.trainerID,
            courseIsDeletedDelete: course.isDeleted
        }
    }
});

myApp.controller('SetFeatureCtrl', function($scope, $http) {
    $http.get('/course/features').then(function(result) {
        $scope.courseDocuments = result.data.courseDocuments;
        $scope.courseFeedback = result.data.courseFeedback;
        $scope.courseTest = result.data.courseTest;
        $scope.courseRating = result.data.courseRating;

    });
});

myApp.controller('SetProfileCtrl', function($scope, $rootScope, $http, $window) {
    $scope.user = {
        pStatus: '',
        pName: '',
        pDoB: '',
        pPhone: '',
        pLocation: '',
        pEmail: '',
        pAvatar: ''
    };

    $http.get('/users/userprofileController').then(function(result) {
        $scope.user.pStatus = result.data.pStatus;
        $scope.user.pName = result.data.pName;
        $scope.user.pDoB = result.data.pDoB;
        $scope.user.pPhone = result.data.pPhone;
        $scope.user.pLocation = result.data.pLocation;
        $scope.user.pEmail = result.data.pEmail;
        $scope.user.pAvatar = result.data.pAvatar;
    });

    $scope.msg = '';
    $rootScope.edit = function() {
        $http.post('/users/userprofileReturnValue', $scope.user).then(function(result) {
            $scope.msg = result.data.msg;
            $window.location.href = '/users/userprofile';
        });
    }
});

// AddCourseCtrl: add course controller

myApp.controller('AddCourseCtrl', function($scope, $rootScope, $window, $http) {
    $scope.courseslist = {
        courseName: '',
        courseDescription: '',
        courseCategory: '',
        courseTest: '',
        courseDocuments: '',
        courseTrainerID: ''
    };
    $scope.postMsg = '';
    $scope.getMsg = '';
    $scope.AddCourseCtrl = function() {

      console.log($scope.courseslist);
        $http.post('/course/addCourse', $scope.courseslist).then(function(result) {
            $scope.postMsg = result.data.msg;
            $http.get('/course/list').then(function(result) {
                $scope.getMsg = result.data.msg;
            });
        });
        $window.location.reload();
    };


});

// UpdateCourseCtrl: edit course controller
myApp.controller('UpdateCourseCtrl', function($scope, $window, $rootScope, $http) {
    $scope.postMsg = '';
    $scope.getMsg = '';
    $scope.UpdateCourseCtrl = function() {
        $http.post('/course/updateCourse', $rootScope.courseslistEdit).then(function(result) {
            $scope.postMsg = result.data.msg;
            $http.get('/course/list').then(function(result) {
                $scope.getMsg = result.data.msg;
                $rootScope.courseslistEdit = result.data.course;
            });
        });

        $window.location.reload();
    }
});

// IsDeletedCourseCtrl: delete course controller
myApp.controller('IsDeletedCourseCtrl', function($scope, $window, $rootScope, $http) {
    $scope.postMsg = '';
    $scope.getMsg = '';
    $scope.IsDeletedCourseCtrl = function() {
        $http.post('/course/isDeletedCourse', $rootScope.courseslistDelete).then(function(result) {
            $scope.postMsg = result.data.msg;
            $http.get('/course/list').then(function(result) {
                $scope.getMsg = result.data.msg;
                $rootScope.courseslistDelete = result.data.course;
            });
        });
        $window.location.reload();
    }
});

//controller for Feedback
myApp.controller('FeedbackCtrl', function($scope, $http, $window) {
    var path = $window.location.pathname;
    path = path.split('/');
    var courseID = path.pop();
    $scope.addFeedback = function() {
        $http.post('/feedback/comment', {
            comment: $scope.comment,
            courseID: parseInt(courseID),
        });
    }
    $scope.addRating = function() {
        $http.post('/feedback/rating', {
            rating: $scope.rating,
            courseID: parseInt(courseID),
        });
    }
    $scope.showFeedback = function() {
        $scope.feedbackList = [];
        $http.post('/feedback/showFeedback', {
            courseID: courseID
        }).then(function(result) {
            $scope.feedbackList = result.data;
        });
    }
});
