// test file for angular/controller.js
describe("Controllers Unit testing", function() {

    // Arrange
    var mockScope;
    var controller;
    var message = '';
    var successMsg = 'You are authenticated!';
    var failMsg = 'You are not authenticated!'

    var controller, $controller, $scope, $http, $rootScope, $location, $interval, createController;
    beforeEach(angular.mock.module("myApp"));
    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $location = $injector.get('$location');
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        createController = {
            loginCtrl: function() {
                return $controller('LoginCtrl', {
                    $scope: $rootScope
                });
            },
            addCourse: function() {
                return $controller('addCourse', {
                    $scope: $rootScope
                });
            },
            updateCourse: function() {
                return $controller('updateCourse', {
                    $scope: $rootScope
                });
            },
            isDeletedCourse: function() {
                return $controller('isDeletedCourse', {
                    $scope: $rootScope
                });
            },
            setFeature: function() {
                return $controller('setFeature', {
                    $scope: $rootScope
                });
            },
            setProfile: function() {
                return $controller('setProfile', {
                    $scope: $rootScope
                });
            }
        }
    }));

    // LoginCtrl
    // *************************************************************************
    it('Test 1: LoginCtrl Be Defined', inject(function($controller) {
        controller = createController.loginCtrl();
        expect(controller).toBeDefined();
    }));

    it('Test 2: Check Login Success ', function() {
        controller = createController.loginCtrl();
        var user = {
            username: 'thach',
            password: 'thach123'
        };
        $rootScope.user = user;
        var data = {
            userid: 'thach',
            msg: 'You are authenticated!'
        };
        $rootScope.login();
        $httpBackend.whenPOST('/users/login', user).respond(data);
        $httpBackend.whenGET('/isLogged').respond(data);
        $httpBackend.flush();
        expect($rootScope.isAuthenticated).toBe(true);
    });

    it('Test 3: Check Login Fail: username true, password false ', function() {
        controller = createController.loginCtrl();
        var user = {
            username: 'thach',
            password: 'thach12'
        };
        $rootScope.user = user;
        var data = {
            userid: null,
            msg: 'You are not authenticated!'
        };
        $rootScope.login();
        $httpBackend.whenPOST('/users/login', user).respond(data);
        $httpBackend.whenGET('/isLogged').respond(data);
        $httpBackend.flush();
        expect($rootScope.isAuthenticated).toBe(false);
    });

    it('Test 4: Check Login Fail: username false, password true ', function() {
        controller = createController.loginCtrl();
        var user = {
            username: 'thach1',
            password: 'thach123'
        };
        $rootScope.user = user;
        var data = {
            userid: null,
            msg: 'You are not authenticated!'
        };
        $rootScope.login();
        $httpBackend.whenPOST('/users/login', user).respond(data);
        $httpBackend.whenGET('/isLogged').respond(data);
        $httpBackend.flush();
        expect($rootScope.isAuthenticated).toBe(false);
    });

    it('Test 5: Check Login Fail: username null', function() {
        controller = createController.loginCtrl();
        var user = {
            username: null,
            password: 'thach123'
        };
        $rootScope.user = user;
        var data = {
            userid: null,
            msg: 'You are not authenticated!'
        };
        $rootScope.login();
        $httpBackend.whenPOST('/users/login', user).respond(data);
        $httpBackend.whenGET('/isLogged').respond(data);
        $httpBackend.flush();
        expect($rootScope.isAuthenticated).toBe(false);
    });

    it('Test 6: Check Login Fail: password null ', function() {
        controller = createController.loginCtrl();
        var user = {
            username: 'thach',
            password: null
        };
        $rootScope.user = user;
        var data = {
            userid: '',
            msg: 'You are not authenticated!'
        };
        $rootScope.login();
        $httpBackend.whenPOST('/users/login', user).respond(data);
        $httpBackend.whenGET('/isLogged').respond(data);
        $httpBackend.flush();
        expect($rootScope.isAuthenticated).toBe(false);
    });

    // addCourse ctrl
    // *************************************************************************
    it('Test 7: addCourse Be Defined', inject(function($controller) {
        controller = createController.addCourse();
        expect(controller).toBeDefined();
    }));

    it('Test 8: addCourse() test', inject(function($controller) {
        controller = createController.addCourse();
        var postData = {
            msg : 'Add course success!'
        };
        var course = {
            courseName: 'agile training',
            courseDescription: 'abc xyz',
            courseCategory: 'agile training',
            courseTest: 'test131',
            courseDocuments: 'agile131.pdf',
            courseTrainerID: '123321'
        };
        var getData = {
          course: course,
          msg: 'send list success'
        };
        $rootScope.courseslist = course;
        $rootScope.addCourse();
        $httpBackend.whenPOST('/course/addCourse', $rootScope.courseslist).respond(postData)
        $httpBackend.whenGET('/course/list').respond(getData);
        $httpBackend.flush();
        //console.log($rootScope.postMsg);
        expect($rootScope.postMsg).toBe(postData.msg);
        expect($rootScope.getMsg).toBe(getData.msg);
    }));

    // updateCourse ctrl
    // *************************************************************************
    it('Test 9: updateCourse Be Defined', inject(function($controller) {
        controller = createController.updateCourse();
        expect(controller).toBeDefined();
    }));

    it('Test 10: updateCourse() test', inject(function($controller) {
        controller = createController.updateCourse();
        var postData = {
            msg : 'Edit course success!'
        };
        var course = {
            courseName: 'agile training',
            courseDescription: 'abc xyz',
            courseCategory: 'agile training',
            courseTest: 'test131',
            courseDocuments: 'agile131.pdf',
            courseTrainerID: '123321'
        };
        var getData = {
          course: course,
          msg: 'send list success'
        };
        $rootScope.courseslist = course;
        $rootScope.updateCourse();
        $httpBackend.whenPOST('/course/updateCourse', $rootScope.courseslist).respond(postData)
        $httpBackend.whenGET('/course/list').respond(getData);
        $httpBackend.flush();
        expect($rootScope.postMsg).toBe(postData.msg);
        expect($rootScope.getMsg).toBe(getData.msg);
    }));

    // isDeletedCourse ctrl
    // *************************************************************************
    it('Test 11: isDeletedCourse Be Defined', inject(function($controller) {
        controller = createController.isDeletedCourse();
        expect(controller).toBeDefined();
    }));

    it('Test 12: isDeletedCourse() test', inject(function($controller) {
        controller = createController.isDeletedCourse();
        var postData = {
            msg: 'Delete success!'
        };
        var course = {
            courseName: 'agile training',
            courseDescription: 'abc xyz',
            courseCategory: 'agile training',
            courseTest: 'test131',
            courseDocuments: 'agile131.pdf',
            courseTrainerID: '123321'
        };
        var getData = {
          course: course,
          msg:'send list success'
        };
        $rootScope.courseslistDelete = course;
        $rootScope.isDeletedCourse();
        $httpBackend.whenPOST('/course/isDeletedCourse', $rootScope.courseslistDelete).respond(postData)
        $httpBackend.whenGET('/course/list').respond(getData);
        $httpBackend.flush();
        expect($rootScope.postMsg).toBe(postData.msg);
        expect($rootScope.getMsg).toBe(getData.msg);
    }));

    // setFeature ctrl
    // *************************************************************************
    it('Test 13: setFeature Be Defined', inject(function($controller) {
        console.log('this is test 1');
        controller = createController.setFeature();
        expect(controller).toBeDefined();
    }));

    it('Test 14: setFeature Be Defined', inject(function($controller) {
        console.log('this is test 2');
        controller = createController.setFeature();
        expect(controller).toBeDefined();
    }));

    it('Test 15: get /course/features test', inject(function($controller) {
        controller = createController.setFeature();
        var data = {
            courseDocuments : 'This is document',
            courseFeedback : 'This is Feedback',
            courseTest : 'This is test',
            courseRating :'This is rating'
        };
        $httpBackend.whenGET('/course/features').respond(data);
        $httpBackend.flush();
        expect($rootScope.courseDocuments).toBe(data.courseDocuments);

        // $scope.courseDocuments = result.data.courseDocuments;
        // $scope.courseFeedback = result.data.courseFeedback;
        // $scope.courseTest = result.data.courseTest;
        // $scope.courseRating = result.data.courseRating;
    }));

    // setProfile ctrl
    // *************************************************************************
    // it('Test 16: setProfile Be Defined', inject(function($controller) {
    //     controller = createController.setProfile();
    //     expect(controller).toBeDefined();
    // }));
    //
    // it('Test 17: get /users/userprofileController', inject(function($controller) {
    //     controller = createController.setProfile();
    //     var data = {
    //       pStatus: 'abc',
    //       pName: 'lam',
    //       pDoB: '10/11/95',
    //       pPhone: '123456689',
    //       pLocation: 'DEK',
    //       pEmail: 'lamz@gmail.com',
    //       pAvatar: 'acb'
    //     };
    //     $httpBackend.whenGET('/users/userprofileController').respond(data);
    //     $httpBackend.flush();
    //     expect($rootScope.user.pStatus).toBe(data.pStatus);
    //     expect($rootScope.user.pName).toBe(data.pName);
    //     expect($rootScope.user.pDoB).toBe(data.pDoB);
    //     expect($rootScope.user.pPhone).toBe(data.pPhone);
    //     expect($rootScope.user.pLocation).toBe(data.pLocation);
    //     expect($rootScope.user.pEmail).toBe(data.pEmail);
    //     expect($rootScope.user.pAvatar).toBe(data.pAvatar);
    // }));
    //
    // it('Test 18: Edit userProfile', inject(function($controller) {
    //     controller = createController.setProfile();
    //     var user = {
    //       pStatus: 'dfas',
    //       pName: 'asdf',
    //       pDoB: 'sdf',
    //       pPhone: 'asdf',
    //       pLocation: 'asdf',
    //       pEmail: 'asdf',
    //       pAvatar: 'sdf'
    //     };
    //     var data = {
    //       msg : 'Success'
    //     };
    //     $rootScope.user = user;
    //     $rootScope.edit();
    //     $httpBackend.whenGET('/users/userprofileController').respond(user);
    //     $httpBackend.whenPOST('/users/userprofileReturnValue', user).respond(data);
    //     $httpBackend.flush();
    //     expect($rootScope.msg).toBe(data.msg);
    // }));

});
