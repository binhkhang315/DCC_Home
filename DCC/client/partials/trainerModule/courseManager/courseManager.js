'use strict';

angular.module('courseManager', []);

//Routers
myApp.config(function($stateProvider) {
    $stateProvider.state('courseManager', {
        url: '/courseManager',
        templateUrl: 'partials/trainerModule/courseManager/courseManager.html',
        data:{
            auth:true
        },
        controller: 'courseManagerCtrl'
    });
});

//Factory
myApp.factory('courseManagerServices', ['$http', function($http) {

    var factoryDefinitions = {
        getCourseList: function() {
            return $http.get('partials/trainerModule/courseManager/mock/myCourseList.json').success(function(data) { return data; });
        },
        addCourse: function(req){
            return $http.post('/course/addCourse', rep).success(function(data) { return data; });
        },
        updateCourse: function(Req){
            return $http.post('/course/updateCourse', Req).success(function(data) { return data; });
        }
    }

    return factoryDefinitions;
}
]);

//controller
myApp.controller('courseManagerCtrl', [ '$scope', '$rootScope','courseManagerServices', function($scope, $rootScope, courseManagerServices) {
    //Add button
    $scope.templates =[
        { name: 'addCourse.html', url: 'partials/trainerModule/courseManager/addCourse.html'},
        { name: 'editCourse.html', url: 'partials/trainerModule/courseManager/editCourse.html'},
        { name: 'deleteCourse.html', url: 'partials/trainerModule/courseManager/deleteCourse.html'}];

        //GetCourseList
        $rootScope.coursesList={};
        courseManagerServices.getCourseList().then(function(result){
            $rootScope.coursesList=result.data;
        });
        //dislay modal of edit & add course
        $scope.funtionTitle = '';
        $scope.functionDone= '';

        //add course
        $scope.coursesProperty = {
            name: '',
            description: '',
            test: '',
            documents: '',
            belong2TrainingProgram:''
        };
        $scope.addCourse=function(){
            $scope.funtionTitle = 'Add Course';
            $scope.functionDone = 'Add';
            courseManagerServices.addCourse($scope.coursesProperty).then(function(result) {
                if (result.data.success){
                $scope.postMsg = result.data.msg;
                courseManagerServices.getCourseList().then(function(result) {
                    $rootScope.coursesList = result;
                });
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
            } else {
                $rootScope.ShowPopupMessage(result.data.msg, "error");
            }
            });
        };
        //update course
        $scope.coursesPropertyEdit = {
            nameEdit: '',
            descriptionEdit: '',
            testEdit: '',
            documentsEdit: '',
            idEdit:'',
        };
        $scope.updateCourse = function() {
            $scope.funtionTitle = 'Edit Course';
            $scope.functionDone = 'Edit';
            courseManagerServices.updateCourse($rootScope.coursesPropertyEdit).then(function(result){
                if (result.data.success){
                    $rootScope.ShowPopupMessage(result.data.msg, "success");
                    $location.path("/courseManager");
                }else{
                    $rootScope.ShowPopupMessage(result.data.msg, "error");
                }

            });
        };
        //delete course
    }]);
