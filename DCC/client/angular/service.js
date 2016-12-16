var courseService = angular.module('course',['ngCookies']);
courseService.service('CourseList',['$http','$q',function($http,$q){
    this.getCourses = function(){
      var deferred = $q.defer();
      return $http.get('/course/list').then(function(result) {
          var coursesList = result.data.course;
          deferred.resolve(coursesList);
          return deferred.promise;
      });
    };
}]);

courseService.service('ToastService',['$mdToast',function($mdToast){
    this.showToast = function(msg){
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .hideDelay(3000)
      );
    }
}]);
