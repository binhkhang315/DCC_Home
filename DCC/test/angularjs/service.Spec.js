describe('Service test', function(){
    describe('courseService test', function(){
        var $httpBackend;
        var Course;
        beforeEach(module('course'));
        beforeEach(inject(function(CourseList,$injector){
          $httpBackend = $injector.get('$httpBackend');
          Course = CourseList;
        }));

        it('1. getCourseList function test 1', function(){
          $injector = angular.injector([ 'course' ]);
          var data = {course:[{
              trainerID: '[{"text":"asd"},{"text":"qwe"}]'
          }]};
          $httpBackend.whenGET('/course/list').respond(data);
          Course.getCourseList().then(function(result){
            expect(result[0].trainerID).toEqual('asd / qwe');
          });
          $httpBackend.flush();
        });

        it('2. getCourseList function test 2', function(){
          $injector = angular.injector([ 'course' ]);
          var data = {course:[{
              trainerID: '[{"text":"hihi"}]'
          }]};
          $httpBackend.whenGET('/course/list').respond(data);
          Course.getCourseList().then(function(result){
            expect(result[0].trainerID).toEqual('hihi');
          });
          $httpBackend.flush();
        });

        it('3. getCourseList function test 3', function(){
          $injector = angular.injector([ 'course' ]);
          var data = {course:[{
              trainerID: '[{"text":""}]'
          }]};
          $httpBackend.whenGET('/course/list').respond(data);
          Course.getCourseList().then(function(result){
            expect(result[0].trainerID).toEqual('');
          });
          $httpBackend.flush();
        });
    });
});
