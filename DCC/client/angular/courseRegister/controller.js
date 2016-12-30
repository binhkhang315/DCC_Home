var myApp = angular.module('myApp');

myApp.controller('CourseRegisterController', function($scope, $rootScope, CourseRegisterService) {
    $scope.sessionByTrainingProgramList = [];

    $scope.trainingProgramList =CourseRegisterService.getTrainingProgram()
    $scope.trainingProgramIDSelected = {
        id: 1
    }
    $scope.updateChange = function() {
        $scope.sessionByTrainingProgramList[$scope.trainingProgramIDSelected.id] = CourseRegisterService.getSessionListByTrainingProgramID($scope.trainingProgramIDSelected.id)
    }
    $scope.sessionIDSelected = {
        id: 1
    }
    // set first look for page

    $scope.sessionByTrainingProgramList[1] = CourseRegisterService.getSessionListByTrainingProgramID(1)
    $scope.courseBySessionIDList =  CourseRegisterService.getCourseBySessionIDList(1)

    $scope.updateCourseList = function() {
        $scope.courseBySessionIDList = CourseRegisterService.getCourseBySessionIDList($scope.sessionIDSelected.id)
    }

    $scope.registeredList = {
        userId: $rootScope.userid,
        courseRegister: []
    }

    $scope.RegisterCourse = function(courseID, isRegister, numberOfPeopleRegister){
        if(isRegister == true){
            $scope.registeredList.courseRegister.push(courseID);
        }
        else{
            $scope.registeredList.courseRegister.splice($scope.registeredList.courseRegister.indexOf(courseID), 1);
        }
    }
    // when you confirm
    $scope.confirmRegister = function() {
        $http.post('/course/registerCourse',$scope.registeredList).then();
    }

    //controller TraineeDashboard
    $scope.showSessionOfTraingingProgram = function(id) {
        $scope.sessionByTrainingProgramList[id] = CourseRegisterService.getSessionListByTrainingProgramID(id);
    }

  });
