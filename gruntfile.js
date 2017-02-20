/*global module:false,require:false*/
'use strict';

var useminAutoprefixer = {
  name: 'autoprefixer',
  createConfig: require('grunt-usemin/lib/config/cssmin').createConfig // Reuse cssmins createConfig
};

module.exports = function (grunt) {

  // automatically loads all of our grunt tasks
  require('load-grunt-tasks')(grunt);
  
  grunt.loadNpmTasks('grunt-typescript');

  grunt.initConfig({

    app: require('./bower.json').appPath,

    dist: 'src/main/webapp/dist',

    typescript: {
      base: {
        src: ['src/main/webapp/scripts/**/*.ts'],
        dest: 'src/main/webapp/dist',
        options: {
          module: 'amd', //or commonjs 
          target: 'es5', //or es3
          sourceMap: true,
          declaration: true
        }
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

    // Inject dependencies
    injector: {
      options: {
        addRootSlash: false,
        relative: true,
        ignorePath: [ '<%= app %>/', '.tmp/' ]
      },
      app: {
        files: {
          'src/main/webapp/index.html': [
            'src/main/webapp/scripts/**/*.js',
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
            'index.html',
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

  // Unit tests
  grunt.registerTask('test', [
    'clean:server',
    'wiredep:test',
    'karma:unit',
    'jshint:test'
  ]);

  // grunt.registerTask('build', [
  //   'clean:dist',
  //   'wiredep:app',
  //   "typescript",
  //   'useminPrepare',
  //   'copy:dist',
  //   'cssmin:generated',
  //   'autoprefixer',
  //   'concat:generated',
  //   'uglify:generated',
  //   'filerev',
  //   'usemin',
  //   'htmlmin'
  // ]);

  // Host application in dev mode
  grunt.registerTask('default', [
    'clean',
    'typescript',
    'wiredep',
    'injector',
    'copy'
  ]);

};
