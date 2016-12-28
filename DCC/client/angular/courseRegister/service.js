var courseRegister = angular.module('courseRegister',['ngCookies']);
courseRegister.service('CourseRegisterService',['$http','$q',function($http,$q){
    this.getTrainingProgram = function(){
      var mockTrainingProgramList = [
          {
              id: '1',
              name: 'Orientation',
          },
          {
              id: '2',
              name: 'On the jobs',
          },
          {
              id: '3',
              name: 'On demand',
          }
      ];
      return  mockTrainingProgramList;
    };
    this.getSessionListByTrainingProgramID = function(trainingProgramID){
        var mockSessionList = [
            {
                id: '1',
                name: 'GE',
                belong2TrainingProgram: '1'
            },
            {
                id: '2',
                name: 'Linux Programming',
                belong2TrainingProgram: '1'
            },
            {
                id: '3',
                name: 'CBA Overview',
                belong2TrainingProgram: '2'
            },
            {
                id: '4',
                name: 'AXE Overview',
                belong2TrainingProgram: '2'
            },
            {
                id: '5',
                name: 'IMS Overview',
                belong2TrainingProgram: '2'
            },
            {
                id: '6',
                name: 'ODM1',
                belong2TrainingProgram: '3'
            },
            {
                id: '7',
                name: 'ODM2',
                belong2TrainingProgram: '3'
            },
        ];

        var result = [];
        mockSessionList.forEach(function(element){
            if(element.belong2TrainingProgram == trainingProgramID){
                result.push(element);
            }
        })
        return result;
    }
    this.getCourseBySessionIDList = function(SessionID) {
        var mockCourseList = [
            {
                id: '1',
                name: 'Training Overview',
                description: 'brief overviews for all training courses',
                belong2Session:  '1',
            },
            {
                id: '2',
                name: 'Linux Overview',
                description: 'brief overviews for all training courses',
                belong2Session:  '2'
            },
            {
                id: '3',
                name: 'AXE Overview',
                description: 'brief overviews for all training courses',
                belong2Session:  '3'
            },
            {
                id: '4',
                name: 'CBA Overview',
                description: 'brief overviews for all training courses',
                belong2Session:  '4'
            },
            {
                id: '5',
                name: 'IMS Overview',
                description: 'brief overviews for all training courses',
                belong2Session:  '5'
            },
            {
                id: '6',
                name: 'ODM1 Overview',
                description: 'brief overviews for all training courses',
                belong2Session:  '6'
            },
            {
                id: '7',
                name: 'ODM2 Overview',
                description: 'brief overviews for all training courses',
                belong2Session:  '7'
            },
            {
                id: '8',
                name: 'What is D.E.K',
                description: 'brief overviews for all training courses',
                belong2Session:  '1'
            },
            {
                id: '9',
                name: 'What is AXE',
                description: 'brief overviews for all training courses',
                belong2Session:  '3'
            },
            {
                id: '10',
                name: 'Sth',
                description: 'brief overviews for all training courses',
                belong2Session:  '5'
            },
            {
                id: '11',
                name: 'Oh lala',
                description: 'brief overviews for all training courses',
                belong2Session:  '7'
            },
        ];
        var result1 = [];
        mockCourseList.forEach(function(element1){
            if(element1.belong2Session == SessionID){
                result1.push(element1);
            }
        })
        return result1;
    }
}]);
