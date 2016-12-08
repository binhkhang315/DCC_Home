var myApp = angular.module('myApp', ['ngCookies', 'ngTagsInput', 'textAngular', 'ngMaterial', 'materialCalendar', 'course']);

// creat angular controller
myApp.controller('ToastCtrl', function($scope, $rootScope, $mdToast) {
    $rootScope.showToast = function(msg) {
        $mdToast.show(
            $mdToast.simple()
            .content(msg)
            .hideDelay(3000)
        );
    };
});
var events;

myApp.controller('LoginCtrl', function($scope, $http, $cookies, $rootScope, $window, ToastService) {


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
                ToastService.showToast($scope.message);
            } else {
                $scope.isAuthenticated = false;
                $scope.message = result.data.msg;
                ToastService.showToast($scope.message);
            }
        });
    };
    // logout function
    $rootScope.logout = function() {
        $cookies.remove('userid');
    };
});

myApp.controller('SetCourseCtrl', function($scope, $http, $window) {


    var path = $window.location.pathname;
    path = path.split('/');
    var courseID = path.pop();
    $http.post('/course/getCourse', {
        courseID: courseID
    }).then(function(result) {
        $scope.courseName = result.data.courseName;
        $scope.courseDescription = result.data.courseDescription;
        $scope.courseCategory = result.data.courseCategory;
        $scope.courseDocuments = result.data.courseDocuments;
    });
});

myApp.controller('GetListCtrl', function($scope, $rootScope, $http, CourseList) {


    CourseList.getCourses().then(function(result) {
        $rootScope.coursesList = result;
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
            // courseTrainerIDEdit: course.trainerIDJSON
        };
    };

    // delete course
    $scope.deleteCourse = function(course) {

        $rootScope.courseslistDelete = {
            courseIDDelete: course.id,
            courseNameDelete: course.name,
            courseIsDeletedDelete: course.isDeleted
        };
    };
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
  $scope.admin = false;
  $scope.trainer = false;
  $scope.trainee = false;
  $scope.actions = [{
       id: '1',
       name: 'Admin Dashboard'
   }, {
       id: '2',
       name: 'Trainer Dashboard'
   }, {
       id: '3',
       name: 'Trainee Dashboard'
   }, {
       id: '4',
       name: 'Default Dashboard' //Empty Dashboard
   }];
   $scope.setAction = function(action) {
       $scope.selectedAction = action;
       switch (parseInt($scope.selectedAction.id)) {
           case 1:
               $scope.admin = true;
               $scope.trainer = false;
               $scope.trainee = false;
               break;
           case 2:
               $scope.admin = false;
               $scope.trainer = true;
               $scope.trainee = false;
               break;
           case 3:
               $scope.admin = false;
               $scope.trainer = false;
               $scope.trainee = true;
               break;
           default:
               $scope.admin = false;
               $scope.trainer = false;
               $scope.trainee = false;
         }
   };

    $scope.user = {
        pStatus: '',
        pName: '',
        pDoB: '',
        pPhone: '',
        pLocation: '',
        pEmail: '',
        pAvatar: '',
        pAdmin: '',
        pTrainer: '',
        pTrainee: ''
    };
    $http.get('/users/userprofileController').then(function(result) {
        $scope.user.pStatus = result.data.pStatus;
        $scope.user.pName = result.data.pName;
        $scope.user.pDoB = result.data.pDoB;
        $scope.user.pPhone = result.data.pPhone;
        $scope.user.pLocation = result.data.pLocation;
        $scope.user.pEmail = result.data.pEmail;
        $scope.user.pAvatar = result.data.pAvatar;
        $scope.user.pAdmin = result.data.pAdmin;
        $scope.user.pTrainer = result.data.pTrainer;
        $scope.user.pTrainee = result.data.pTrainee;
    }).then(function(){
      if($scope.user.pAdmin){
        $scope.setAction($scope.actions[0]);
      } else
      if($scope.user.pTrainer){
        $scope.setAction($scope.actions[1]);
      } else
      if($scope.user.pTrainee){
         $scope.setAction($scope.actions[2]);
       } else {
          $scope.setAction($scope.actions[3]);
       }
    });

    $scope.msg = '';
    $rootScope.edit = function() {
        $http.post('/users/userprofileReturnValue', $scope.user).then(function(result) {
            $scope.msg = result.data.msg;
            $window.location.href = '/users/userprofile';
        });
    };
});

//----------------------------Set training program----------------------------------------
myApp.controller('SetTrainingProgram', function($scope, $rootScope, $http) {
    $scope.trainingprogram = {
        pName: ''
    };

    $http.get('/users/trainingprogramController').then(function(result) {
        $scope.trainingprogram.pName = result.data.pName;

    })
    $scope.msg = '';
});

//-----------------------------------------------------------------------------------------

// AddCourseCtrl: add course controller
myApp.controller('AddCourseCtrl', function($scope, $rootScope, $http, CourseList, ToastService) {


    $scope.courseslist = {
        courseName: '',
        courseDescription: '',
        courseCategory: '',
        courseTest: '',
        courseDocuments: '',
        // courseTrainerID: ''
    };
    $scope.postMsg = '';
    $scope.getMsg = '';
    $scope.addCourse = function() {

        $http.post('/course/addCourse', $scope.courseslist).then(function(result) {
            $scope.postMsg = result.data.msg;
            CourseList.getCourses().then(function(result) {
                $rootScope.coursesList = result;
                ToastService.showToast($scope.postMsg);
            });
        });
    };
});

// UpdateCourseCtrl: edit course controller
myApp.controller('UpdateCourseCtrl', function($scope, $rootScope, $http, CourseList, ToastService) {


    $scope.postMsg = '';
    $scope.getMsg = '';
    $scope.updateCourse = function() {
        $http.post('/course/updateCourse', $rootScope.courseslistEdit).then(function(result) {
            $scope.postMsg = result.data.msg;
            CourseList.getCourses().then(function(result) {
                $rootScope.coursesList = result;
                ToastService.showToast($scope.postMsg);
            });
        });
    };
});

// IsDeletedCourseCtrl: delete course controller
myApp.controller('IsDeletedCourseCtrl', function($scope, $rootScope, $http, CourseList, ToastService) {


    $scope.postMsg = '';
    $scope.getMsg = '';
    $scope.isDeletedCourse = function() {
        $http.post('/course/isDeletedCourse', $rootScope.courseslistDelete).then(function(result) {
            $scope.postMsg = result.data.msg;
            CourseList.getCourses().then(function(result) {
                $rootScope.coursesList = result;
                ToastService.showToast($scope.postMsg);
            });
        });
    };
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
    };
    $scope.addRating = function() {
        $http.post('/feedback/rating', {
            rating: $scope.rating,
            courseId: parseInt(courseID),
        }).then(function(result) {
            $scope.msg = result.data.msg;
        });
    };
    $scope.showFeedback = function() {
        $scope.feedbackList = [];
        $http.post('/feedback/showFeedback', {
            courseId: courseID
        }).then(function(result) {
            $scope.feedbackList = result.data;
        });
    };
    $http.post('/feedback/showAverageRating', {
        courseId: courseID
    }).then(function(result) {
        $scope.average = result.data.result;
    });
});

myApp.controller('CalendarCtrl', function($scope, $filter, $http, $q, MaterialCalendarData) {

// start template
    $scope.dayFormat = 'd';

    $scope.myTemplate = "<md-content layout='column' layout-fill md-swipe-left='next()' md-swipe-right='prev()'><md-toolbar><div class='md-toolbar-tools' layout='row'><md-button class='md-icon-button' ng-click='prev()'><md-icon md-svg-icon='md-tabs-arrow'></md-icon></md-button><div flex></div><span class='calendar-md-title'>{{ calendar.start | date:titleFormat:timezone }}</span><div flex></div><md-button class='md-icon-button' ng-click='next()' ><md-icon md-svg-icon='md-tabs-arrow' class='moveNext'></md-icon></md-button></div></md-toolbar><!-- calendar view --><md-content ng-if='weekLayout !== columnWeekLayout' flex layout='column' class='calendar'><div layout='row' class='subheader'><div layout-padding class='subheader-day' flex ng-repeat='day in calendar.weeks[0]'>{{ day | date:dayLabelFormat }}</div></div><div ng-if='week.length' ng-repeat='week in calendar.weeks track by $index' flex layout='row'><div tabindex='{{ sameMonth(day) ? (day | date:dayFormat:timezone) : 0 }}' ng-repeat='day in week track by $index' ng-click='handleDayClick(day)' flex layout layout-padding ng-class='{&quot;disabled&quot; : isDisabled(day), &quot;active&quot;: isActive(day), &quot;md-whiteframe-12dp&quot;: hover || focus }' ng-focus='focus = true;' ng-blur='focus = false;' ng-mouseleave='hover = false' ng-mouseenter='hover = true'><md-tooltip ng-if='::tooltips()' compile='dataService.data[dayKey(day)]'></md-tooltip><div>{{ day | date:dayFormat }}</div><div class='events' flex compile='dataService.data[dayKey(day)]' id='{{ day | date:dayIdFormat }}'></div></div></div></md-content></md-content>";
    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    $scope.selectedDate = [];

    $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function(direction) {
        $scope.direction = direction;
        $scope.dayFormat = direction === 'vertical' ?
            'EEEE, MMMM d' :
            'd';
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
    // end template
    // set events
    $http.get('/getEvents').then(function(result) {
        $scope.msg = 'test';
        events = result.data;
        if(result.data===null)
            $("#popups").hide();
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var start = event.start.dateTime || event.start.date;
            var eventDate = new Date(Date.parse(start));
            var checkDate = MaterialCalendarData.getDayKey(eventDate);
            var dateData = MaterialCalendarData.data[checkDate];
            if (typeof(dateData) === 'undefined') {
                dateData = '';
            }
            var arr = event.summary.split(']');
            event.summary = arr[arr.length - 1];
            $("#popups").hide();
            MaterialCalendarData.setDayContent(eventDate, dateData + '<a onclick="show(' + i + ');" onmouseover="showEvent(' + i + ')" onmouseleave="hideEvent()" >' + event.summary + '</a>' + '</br>');
        }
    });
});
