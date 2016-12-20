// Karma configuration
// Generated on Tue Aug 02 2016 10:30:24 GMT+0700 (SE Asia Standard Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'client/assets/js/angular/angular-cookies.js',
            'client/assets/js/angular/ng-tags-input.js',
            'client/assets/js/angular/angular-animate.min.js',
            'client/assets/js/angular/angular-aria.min.js',
            'client/assets/js/angular/angular-material.js',
            'client/assets/js/angular/angular-material.min.js',
            'client/assets/js/angular/angular-material-calendar.js',
            'client/assets/js/angular/angular-material-calendar.min.js',
            'client/assets/js/angular/angular-material-mocks.js',
            'client/assets/js/textAngular/textAngular-rangy.min.js',
            'client/assets/js/textAngular/textAngular-sanitize.min.js',
            'client/assets/js/textAngular/textAngular.min.js',
            'client/angular/*.js',
            'test/angularjs/*.js'
        ],

        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
        ],
        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'client/angular/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'junit', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: false,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        junitReporter: {
            outputFile: './test/reports/junit/TESTS-xunit.xml'
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage_angular',
            subdir: 'lcov-report'
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
