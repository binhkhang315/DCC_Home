describe('Service test', function(){
    describe('courseService test', function(){
        var $httpBackend;
        var Course;
        beforeEach(module('course'));
        beforeEach(inject(function(CourseList,$injector){
          $httpBackend = $injector.get('$httpBackend');
          Course = CourseList;
        }));

        it('1. getCourses function test 1', function(){
          $injector = angular.injector([ 'course' ]);
          var data = {course:[{
              name: 'hahaha'
          }]};
          $httpBackend.whenGET('/course/list').respond(data);
          Course.getCourses().then(function(result){
            expect(result[0].name).toEqual('hahaha');
          });
          $httpBackend.flush();
        });

        it('2. getCourses function test 2', function(){
          $injector = angular.injector([ 'course' ]);
          var data = {course:[{
              name: '0'
          }]};
          $httpBackend.whenGET('/course/list').respond(data);
          Course.getCourses().then(function(result){
            expect(result[0].name).toEqual('0');
          });
          $httpBackend.flush();
        });

        it('3. getCourses function test 3', function(){
          $injector = angular.injector([ 'course' ]);
          var data = {course:[{
              name: ''
          }]};
          $httpBackend.whenGET('/course/list').respond(data);
          Course.getCourses().then(function(result){
            expect(result[0].name).toEqual('');
          });
          $httpBackend.flush();
        });
    });
});
