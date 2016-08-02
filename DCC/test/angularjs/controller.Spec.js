// test file for angular/controller.js
describe("LoginCtrl Unit testing #1", function() {

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
            }
        }
    }));

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
    //Init data

});
