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
