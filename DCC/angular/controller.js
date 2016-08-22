var myApp = angular.module('myApp', ['ngCookies', 'ngTagsInput', 'textAngular', 'ngMaterial', 'materialCalendar', 'course']);
// creat angular controller
myApp.controller('LoginCtrl', function($scope, $http, $cookies, $rootScope, $window) {
    // get route '/isLogged' to check user logined or not
    $http.get('/isLogged')
        .then(function(res) {
            $cookies.put('userid', res.data);
            $rootScope.userid = $cookies.get('userid');
        });
    // get userid in cookies if it exist
    if ($cookies.get('userid')) {
        $rootScope.userid = $cookies.get('userid');
    }
    // login/ logout message: success or fail
    $scope.message = '';
    // receive value username and password from login page
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.isAuthenticated = false;
    // login function, post to server user's credentials
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
        $cookies.remove('userid');
    }
});

myApp.controller('SetCourseCtrl', function($scope, $http, $window, $sce) {
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

myApp.controller('GetListCtrl', function($scope, $rootScope, $http, CourseList) {
    CourseList.getCourseList().then(function(result) {
        $rootScope.coursesList = result;
        console.log($rootScope.coursesList);
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
myApp.controller('AddCourseCtrl', function($scope, $rootScope, $http, CourseList) {
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
    $scope.addCourse = function() {

        $http.post('/course/addCourse', $scope.courseslist).then(function(result) {
            $scope.postMsg = result.data.msg;
            CourseList.getCourseList().then(function(result) {
                $rootScope.coursesList = result;
            });
        });
    }
});

// UpdateCourseCtrl: edit course controller
myApp.controller('UpdateCourseCtrl', function($scope, $rootScope, $http, CourseList) {
    $scope.postMsg = '';
    $scope.getMsg = '';
    $scope.updateCourse = function() {
        $http.post('/course/updateCourse', $rootScope.courseslistEdit).then(function(result) {
            $scope.postMsg = result.data.msg;
            CourseList.getCourseList().then(function(result) {
                $rootScope.coursesList = result;
            });
        });
    }
});

// IsDeletedCourseCtrl: delete course controller
myApp.controller('IsDeletedCourseCtrl', function($scope, $rootScope, $http, CourseList) {
    $scope.postMsg = '';
    $scope.getMsg = '';
    $scope.isDeletedCourse = function() {
        $http.post('/course/isDeletedCourse', $rootScope.courseslistDelete).then(function(result) {
            $scope.postMsg = result.data.msg;
            CourseList.getCourseList().then(function(result) {
                $rootScope.coursesList = result;
            });
        });
    }
});

//controller for Feedback
myApp.controller('FeedbackCtrl', function($scope, $http, $window) {
    var path = $window.location.pathname;
    path = path.split('/');
    var courseID = path.pop();
    $scope.msg = '';
    $scope.comment = '';
    $scope.rating = '';
    $scope.addFeedback = function() {
        $http.post('/feedback/comment', {
            comment: $scope.comment,
            courseId: parseInt(courseID),
        }).then(function(result) {
            $scope.msg = result.data.msg;
        });
    }
    $scope.addRating = function() {
        $http.post('/feedback/rating', {
            rating: $scope.rating,
            courseId: parseInt(courseID),
        }).then(function(result) {
            $scope.msg = result.data.msg;
        });
    }
    $scope.showFeedback = function() {
        $scope.feedbackList = [];
        $http.post('/feedback/showFeedback', {
            courseId: courseID
        }).then(function(result) {
            $scope.feedbackList = result.data;
        });
    }
    $http.post('/feedback/showAverageRating', {
        courseId: courseID
    }).then(function(result) {
        $scope.average = result.data.result;
    });
});

myApp.controller('CalendarCtrl', function($scope, $filter, $http, $q, MaterialCalendarData) {
    $scope.dayFormat = 'd';
    var events;
    $scope.myTemplate = "<md-content layout='column' layout-fill md-swipe-left='next()' md-swipe-right='prev()'><md-toolbar><div class='md-toolbar-tools' layout='row'><md-button class='md-icon-button' ng-click='prev()'><md-icon md-svg-icon='md-tabs-arrow'></md-icon></md-button><div flex></div><span class='calendar-md-title'>{{ calendar.start | date:titleFormat:timezone }}</span><div flex></div><md-button class='md-icon-button' ng-click='next()' ><md-icon md-svg-icon='md-tabs-arrow' class='moveNext'></md-icon></md-button></div></md-toolbar><!-- agenda view --><md-content ng-if='weekLayout === columnWeekLayout' class='agenda'><div ng-repeat='week in calendar.weeks track by $index'><div ng-if='sameMonth(day)' ng-class='{&quot;disabled&quot; : isDisabled(day), active: active === day }' ng-click='handleDayClick(day)' ng-repeat='day in week' layout><md-tooltip ng-if='::tooltips()'>{{ day | date:dayTooltipFormat:timezone }}</md-tooltip><div>{{ day | date:dayFormat:timezone }}</div><div flex compile='dataService.data[dayKey(day)]'></div></div></div></md-content><!-- calendar view --><md-content ng-if='weekLayout !== columnWeekLayout' flex layout='column' class='calendar'><div layout='row' class='subheader'><div layout-padding class='subheader-day' flex ng-repeat='day in calendar.weeks[0]'><md-tooltip ng-if='::tooltips()'>{{ day | date:dayLabelTooltipFormat }}</md-tooltip>{{ day | date:dayLabelFormat }}</div></div><div ng-if='week.length' ng-repeat='week in calendar.weeks track by $index' flex layout='row'><div tabindex='{{ sameMonth(day) ? (day | date:dayFormat:timezone) : 0 }}' ng-repeat='day in week track by $index' ng-click='handleDayClick(day)' flex layout layout-padding ng-class='{&quot;disabled&quot; : isDisabled(day), &quot;active&quot;: isActive(day), &quot;md-whiteframe-12dp&quot;: hover || focus }' ng-focus='focus = true;' ng-blur='focus = false;' ng-mouseleave='hover = false' ng-mouseenter='hover = true'><md-tooltip ng-if='::tooltips()' compile='dataService.data[dayKey(day)]'></md-tooltip><div>{{ day | date:dayFormat }}</div><div class='events' flex compile='dataService.data[dayKey(day)]' id='{{ day | date:dayIdFormat }}'></div></div></div></md-content></md-content>";
    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    $scope.selectedDate = [];

    $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function(direction) {
        $scope.direction = direction;
        $scope.dayFormat = direction === 'vertical'
                                        ? 'EEEE, MMMM d'
                                        : 'd';
    };

    $scope.dayClick = function(date) {
      var checkDate = MaterialCalendarData.getDayKey(date);
      var dateData = MaterialCalendarData.data[checkDate];
      $scope.popup = dateData;
    };

    $scope.prevMonth = function(data) {
        $scope.msg = 'You clicked (prev) month ' + data.month + ', ' + data.year;
    };

    $scope.nextMonth = function(data) {
        $scope.msg = 'You clicked (next) month ' + data.month + ', ' + data.year;
    };
    $scope.tooltips = true;
    // set events

    $http.get('/getEvents').then(function(result) {
      $scope.msg = 'test';
        events = result.data;
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var start = event.start.dateTime || event.start.date;
            var eventDate = new Date(Date.parse(start));
            var checkDate = MaterialCalendarData.getDayKey(eventDate);
            var dateData = MaterialCalendarData.data[checkDate];
            if (typeof(dateData) === 'undefined') {
                dateData = '';
            }
            MaterialCalendarData.setDayContent(eventDate, dateData + event.summary + '</br>');
        }
    });
});
