var request = require('supertest');
var assert = require('chai').assert;
var expect = require('chai').expect;
var route = require('../app.js');
var models = require('../models');
models.course.sync({
    force: false
});
// mongoose.connect('mongodb://localhost/loginapp');
// var db = mongoose.connection;

function isEmpty(str) {
    return (!str || 0 === str.length);
};

describe('<Unit Test for Routing>', function() {
    describe('', function() {
        return it('Test case 1 : get / ', function(done) {
            request(route)
                .get('/')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 2 : get /course ', function(done) {
            request(route)
                .get('/course')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 3 : get /course/coursesoverview ', function(done) {
            request(route)
                .get('/course/coursesoverview')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 4 : get /course/trainerdashboard ', function(done) {
            request(route)
                .get('/course/trainerdashboard')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 5 : get /users/userprofile ', function(done) {
            request(route)
                .get('/users/userprofile')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 6 : get /users/dashboard ', function(done) {
            request(route)
                .get('/users/dashboard')
                .end(function(err, res) {
                    assert.equal(res.headers.location, '/')
                    return done();
                });
        });
    });
});

//---------------------------------------------------------------------------------------
describe('<Unit test for Login>', function() {

    describe('', function() {
        return it('Test case 1 : Login success', function(done) {
            request(route)
                .post('/users/login')
                .send({
                    username: 'qwe@gmail.com',
                    password: 'qwe'
                })
                .end(function(err, res) {
                    assert.equal(res.body.userid, 'qwe@gmail.com');
                    return done();
                });
        });
    });

    describe('', function() {
        return it('Test case 2 : Login fail, username true, password false', function(done) {
            request(route)
                .post('/users/login')
                .send({
                    username: 'qwe@gmail.com',
                    password: 'thach13'
                })
                .end(function(err, res) {
                    assert.equal(res.body.userid, null);
                    return done();
                });
        });

        describe('', function() {
            return it('Test case 3 : Login fail, username false, password true', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: 'thach1',
                        password: 'qwe'
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

        describe('', function() {
            return it('Test case 4 : Login fail, username null, password true', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: null,
                        password: 'qwe'
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

        describe('', function() {
            return it('Test case 5 : Login fail, username true, password null', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: 'qwe@gmail.com',
                        password: null
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

        describe('', function() {
            return it('Test case 6 : Login fail, username false, password null', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: 'thach2',
                        password: null
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

        describe('', function() {
            return it('Test case 7 : Login fail, username null, password false', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: null,
                        password: '123'
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

    });
});
describe('<Unit test for Course controller', function() {
    describe('', function() {
        return it('Test case 1 : POST /course/getCourse', function(done) {
            request(route)
                .post('/course/getCourse')
                .send({
                    courseID: '1'
                })
                .end(function(err, res) {
                    assert.equal(res.body.courseName, 'CBA Overview');
                    return done();
                });
        });
    });
    describe('', function() {
        return it('Test case 2 : POST /course/addCourse duplicate name', function(done) {
            var datasend = {
                courseName: 'CBA Overview',
                courseDescription: 'This is testing Des',
                courseCategory: 'testing cat',
                courseTest: 'testing test',
                courseDocuments: 'testing doc',
                courseTrainerID: [{
                    "text": "testing"
                }]
            };
            request(route)
                .post('/course/addCourse')
                .send(datasend)
                .end(function(err, res) {
                    assert.equal(res.body.msg, 'Name already existed. Add fail!');
                    return done();
                });
        });
    });
    describe('', function() {
        return it('Test case 3 : POST /course/addCourse success', function(done) {
            var datasend = {
                courseName: 'Testing',
                courseDescription: 'This is testing Des',
                courseCategory: 'testing cat',
                courseTest: 'testing test',
                courseDocuments: 'testing doc',
                courseTrainerID: [{
                    "text": "testing"
                }]
            };
            request(route)
                .post('/course/addCourse')
                .send(datasend)
                .end(function(err, res) {
                    assert.equal(res.body.msg, 'Add course success!');
                    return done();
                });
            afterEach(function() {
                models.course.destroy({
                    where: {
                        name: 'testing'
                    }
                });
            });
        });
    });
    describe('', function() {
        return it('Test case 3 : POST /course/updateCourse', function(done) {
            var datasend = {
                courseIDEdit: 999,
                courseNameEdit: 'testing3',
                courseDescriptionEdit: 'This is testing Des3',
                courseCategoryEdit: 'testing cat3',
                courseTestEdit: 'testing testing3',
                courseDocumentsEdit: 'testing doc3',
                courseTrainerIDEdit: [{
                    "text": "testing3"
                }]
            };
            request(route)
                .post('/course/updateCourse')
                .send(datasend)
                .end(function(err, res) {
                    console.log('------------------------------- done -------------------');
                    assert.equal(res.body.msg, 'Edit course success!');
                    return done();
                });
        });
    });
});
describe('', function() {
    return it('Test case 3 : POST /course/updateCourse', function(done) {
        var datasend = {
            courseIDEdit: 992,
            courseNameEdit: 'testing3',
            courseDescriptionEdit: 'This is testing Des3',
            courseCategoryEdit: 'testing cat3',
            courseTestEdit: 'testing testing3',
            courseDocumentsEdit: 'testing doc3',
            courseTrainerIDEdit: [{
                "text": "testing3"
            }]
        };
        request(route)
            .post('/course/updateCourse')
            .send(datasend)
            .end(function(err, res) {
                console.log('------------------------------- done -------------------');
                assert.equal(res.body.msg, 'Course not found in database');
                return done();
            });
    });
});

describe('<Unit test for Course model', function() {
    describe('Method Course', function() {
        return it('Test case 1: getCourseByID with id existed in database - return course object', function(done) {
            models.course.getCourseByID('1', function(course) {
                assert.equal(course.id, 1);
                return done();
            })
        });
    });
    describe('', function() {
        return it('Test case 2: getCourseByID with id not found in database - return null', function(done) {
            models.course.getCourseByID('not found', function(course) {
                assert.equal(course, null);
                return done();
            })
        });
    });
    describe('', function() {
        return it('Test case 3: getCourseByName with name existed in database - return course course object', function(done) {
            models.course.getCourseByName('CBA Overview', function(course) {
                assert.equal(course.name, 'CBA Overview');
                return done();
            })
        });
    });
    describe('', function() {
        return it('Test case 4: getCourseByName with name not found in database - return course = null', function(done) {
            models.course.getCourseByName('not found', function(course) {
                assert.equal(course, null);
                return done();
            })
        });
    });
    describe('', function() {
        return it('Test case 5: getCourseByCategory with category existed in database - return course[] list object ', function(done) {
            models.course.getCourseByCategory('CBA Overview', function(course) {
                assert.equal(course[0].category, 'CBA Overview');
                assert.equal(course[2].category, 'CBA Overview');
                return done();
            })
        });
    });
    describe('', function() {
        return it('Test case 6: getCourseByCategory with category not found in database - return course[] null ', function(done) {
            models.course.getCourseByCategory('not found', function(course) {
                assert.equal(course[0], null);
                return done();
            })
        });
    });
    // describe('', function() {
    //     return it('Test case 7: getCourseByTrainerID with trainerID existed in database - return course[] list object', function(done) {
    //         models.course.getCourseByTrainerID('King Nguyen', function(course) {
    //             assert.equal(course[0].trainerID, 'King Nguyen');
    //             return done();
    //         })
    //     });
    // });
    describe('', function() {
        return it('Test case 8: getCourseByTrainerID with TrainerID not found in database - return course[] null', function(done) {
            models.course.getCourseByTrainerID('not found', function(course) {
                assert.equal(course[0], null);
                return done();
            })
        });
    });
    describe('', function() {
        return it('Test case 9: getCourseList in database - return course[] list object', function(done) {
            models.course.getCourseList(function(course) {
                assert.equal(course[0].id, '1');
                return done();
            })
        });
    });
});

describe('<Unit test for User model', function() {
    describe('Method User', function() {
        return it('Test case 1: getUserByID', function(done) {
            models.User.getUserByID('1', function(user) {
                assert.equal(user.username, 'admin');
                return done();
            })
        });
    });

    describe('', function() {
        return it('Test case 2: getUserByName', function(done) {
            models.User.getUserByName('admin', function(user) {
                assert.equal(user.id, '1');
                return done();
            })
        });
    });
});

describe('<Unit test for userProfile function>', function() {

    describe('Send data to font-end', function() {
        return it('Get /users/userprofileController ', function(done) {
            request(route)
                .get('/users/userprofileController')
                .end(function(err, res) {
                    assert.equal(res.body.pName, 'admin');
                    return done();
                });
        });
    });

    describe('Route for editUserProfile page', function() {
        return it('Get /users/edituserprofile ', function(done) {
            request(route)
                .get('/users/edituserprofile')
                .expect(200, done)
        });
    });

    describe('Edit data method', function() {
        return it('Post /users/userprofileReturnValue ', function(done) {
            request(route)
                .post('/users/userprofileReturnValue')
                .send({
                    status: 'vhlam',
                    dob: '20/10/1995'
                })
                .end(function(err, res) {
                    assert.equal(res.text, 'Success');
                    return done();
                });
        });
    });
});

//-----------------------------------------------------------------------
