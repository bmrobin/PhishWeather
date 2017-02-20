// Karma configuration
module.exports = function (config) {
  config.set({
    autoWatch: true,

    basePath: '../../',

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    files: [
      // bower:js
      'main/webapp/bower_components/jquery/dist/jquery.js',
      'main/webapp/bower_components/angular/angular.js',
      'main/webapp/bower_components/angular-aria/angular-aria.js',
      'main/webapp/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'main/webapp/bower_components/angular-cache-buster/angular-cache-buster.js',
      'main/webapp/bower_components/angular-cookies/angular-cookies.js',
      'main/webapp/bower_components/ngstorage/ngStorage.js',
      'main/webapp/bower_components/angular-loading-bar/build/loading-bar.js',
      'main/webapp/bower_components/angular-resource/angular-resource.js',
      'main/webapp/bower_components/angular-sanitize/angular-sanitize.js',
      'main/webapp/bower_components/angular-ui-router/release/angular-ui-router.js',
      'main/webapp/bower_components/bootstrap-ui-datetime-picker/dist/datetime-picker.js',
      'main/webapp/bower_components/json3/lib/json3.js',
      'main/webapp/bower_components/messageformat/messageformat.js',
      'main/webapp/bower_components/ng-file-upload/ng-file-upload.js',
      'main/webapp/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'main/webapp/bower_components/angular-mocks/angular-mocks.js',
      // endbower

      'main/webapp/scripts/**/*.js',
      'main/webapp/scripts/**/*.tpl.html',
      'test/javascript/spec/**/*.js'
    ],

    exclude: ['test/javascript/spec/e2e/**/'],

    preprocessors: {
      'main/webapp/scripts/**/*.js': [
        'coverage'
      ]
    },

    port: 9876,

    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    reporters: [
      'coverage'
    ],

    coverageReporter: {
      reporters: [
        {type: 'json', dir: 'test/javascript/coverage/json/'},
        {type: 'html', dir: 'test/javascript/coverage/html/'},
        {type: 'text-summary'}
      ]
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'main/webapp/',
      moduleName: 'designer.templates'
    },

    colors: true,

    logLevel: config.LOG_INFO,

    captureConsole: true,

    singleRun: false
  });
};
