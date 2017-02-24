/*global module:false,require:false*/
'use strict';

module.exports = function (grunt) {

  // automatically loads all of our grunt tasks
  require('load-grunt-tasks')(grunt);
  
  grunt.loadNpmTasks('grunt-ts');

  grunt.initConfig({

    app: require('./bower.json').appPath,

    dist: 'src/main/webapp/dist',

    // Compile TS into JS
    ts: {
      app: {
        // use options from our tsconfig.json 
        tsconfig: 'tsconfig.json'
      }
    },

    // Empties folders to start fresh
    clean: {
      options: {force: true},
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= dist %>/*',
            '!<%= dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: [ 'bower.json' ],
        tasks: [ 'wiredep' ]
      },
      js: {
        files: [ '<%= app %>/scripts/**/*.js' ],
        tasks: [ 'newer:jshint:all' ]
      }
    },

    // Inject JS dependencies
    injector: {
      options: {
        addRootSlash: false,
        relative: true,
        ignorePath: [ '<%= app %>/', '.tmp/' ]
      },
      app: {
        files: {
          'src/main/webapp/index.html': [
            'src/main/webapp/dist/**/*.js',
            'src/main/webapp/assets/*.css'
          ],
        }
      }
    },

    // Inject Bower Dependencies
    wiredep: {
      app: {
        src: ['src/main/webapp/index.html'],
        directory: 'src/main/webapp/bower_components',
        exclude: [
          /bootstrap-sass-only/
        ]
      },
      test: {
        src: 'src/test/javascript/karma.conf.js',
        exclude: [ /bootstrap-sass-only/ ],
        ignorePath: /\.\.\/\.\.\//, // remove ../../ from paths of injected javascripts
        devDependencies: true,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src/main/webapp',
          dest: '<%= dist %>',
          src: [
            'scripts/**/*.html',
            'assets/images/**/*.{png,gif,webp,jpg,jpeg,svg}',
            'assets/styles/**/*.css'
          ]
        }, {
          expand: true,
          cwd: '.tmp/assets/images',
          dest: '<%= dist %>/assets/images',
          src: [
            'generated/*'
          ]
        }]
      }
    },

    // Unit testing
    karma: {
      options: {
        configFile: 'src/test/javascript/karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      debug: {
        singleRun: false
      }
    },

    // Istanbul JS test coverage
    coverage: {
      default: {
        options: {
          thresholds: {
            statements: 90,
            branches: 90,
            lines: 90,
            functions: 90
          },
          dir: 'coverage',
          root: 'src/test/javascript'
        }
      }
    },

    // JSHint
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'gruntfile.js',
          '<%= app %>/scripts/**/*.js'
        ]
      },
      test: {
        src: [
          'gruntfile.js',
          'src/test/javascript/spec/**/*.js'
        ]
      },
      exclude: [ 'src/test/javascript/spec/e2e/*' ]
    }

  });

  grunt.registerTask('test', [
    'clean',
    'wiredep:test',
    'karma:unit',
    'jshint:test'
  ]);

  grunt.registerTask('default', [
    'clean',
    'ts',
    'wiredep',
    'injector'
  ]);

};
