/*global module:false,require:false*/
'use strict';

module.exports = function (grunt) {

  // automatically loads all of our grunt tasks
  require('load-grunt-tasks')(grunt);
  
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-connect');

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

    // Bundle JS with a module loader - webpack
    webpack: {
      app: {
        entry: {
          bundle: "./src/main/webapp/scripts/app/app.ts"
        },
        output: {
          path: "src/main/webapp/dist/",
          filename: "[name].js",
        },
        module: {
          rules: [
            {
              test: /\.ts?$/,
              loader: 'ts-loader'
            },
            {
              test: /\.js$/,
              loader: 'source-map-loader'
            }
          ]
        },
        stats: {
          modules: true,
          reasons: true
        },
        resolve: {
          extensions: ['.ts', '.js']
        },
        devtool: 'source-map'
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
      ts: {
        files: [ '<%= app %>/scripts/**/*.ts' ],
        tasks: [ 'backJackDoItAgain' ]
      },
      tsconfig: {
        files: [ 'tsconfig.json'],
        tasks: [ 'backJackDoItAgain' ]
      },
      gruntfile: {
        files: [ 'gruntfile.js' ],
        tasks: [ 'backJackDoItAgain' ]
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
            'src/main/webapp/dist/bundle.js',
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
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'src/main/webapp',
          livereload: true
        }
      }
    }

  });

  grunt.registerTask('test', [
    'clean',
    'wiredep:test',
    'karma:unit',
    'jshint:test'
  ]);

  grunt.registerTask('backJackDoItAgain', [
    'clean',
    'ts',
    'webpack',
    'wiredep',
    'injector'
  ]);

  grunt.registerTask('default', [
    'backJackDoItAgain',
    'connect',
    'watch'
  ]);

};
