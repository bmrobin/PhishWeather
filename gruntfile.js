/*global module:false,require:false*/
'use strict';

var useminAutoprefixer = {
  name: 'autoprefixer',
  createConfig: require('grunt-usemin/lib/config/cssmin').createConfig // Reuse cssmins createConfig
};

module.exports = function (grunt) {

  // automatically loads all of our grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    app: require('./bower.json').appPath,

    dist: 'src/main/webapp/dist',

    // Empties folders to start fresh
    clean: {
      options: {force: true},
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'src/main/webapp/assets/styles/ui.css',
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
      sass: {
        files: [ 'src/main/scss/*.scss' ],
        tasks: [ 'sass' ]
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
        ignorePath: [ '<%= app %>/', '.tmp/' ]
      },
      app: {
        files: {
          '<%= app %>/index.html': [
            '<%= app %>/scripts/**/*.js',
            '<%= app %>/assets/styles/ui.css'
          ]
        }
      }
    },

    // Inject Bower Dependencies
    wiredep: {
      app: {
        src: ['src/main/webapp/index.html'],
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
            '*.html',
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

    // Minify JS and CSS resources
    useminPrepare: {
      html: 'src/main/webapp/**/*.html',
      options: {
        dest: '<%= dist %>',
        flow: {
          html: {
            steps: {
              js: [ 'concat', 'uglify' ],
              css: [ 'cssmin', useminAutoprefixer ]
            },
            post: {}
          }
        }
      }
    },

    // Generate a hash specific to the file(s) and inject that into all references
    filerev: {
      options: {
        algorithm: 'md5',
        length: 16
      },
      css: {
        src: '<%= dist %>/assets/styles/**/*.css'
      },
      js: {
        src: '<%= dist %>/scripts/**/*.js'
      }
    },

    // Inject minified resource references into HTML
    usemin: {
      html: ['<%= dist %>/**/*.html'],
      css: ['<%= dist %>/assets/styles/**/*.css'],
      js: ['<%= dist %>/scripts/**/*.js'],
      options: {
        assetsDirs: ['<%= dist %>', '<%= dist %>/assets/styles', '<%= dist %>/assets/fonts'],
        patterns: {
          js: [
          ]
        },
        dirs: ['<%= dist %>']
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          keepClosingSlash: true
        },
        files: [{
          expand: true,
          cwd: '<%= dist %>',
          src: ['*.html'],
          dest: '<%= dist %>'
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

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'src/main/webapp/**/*.html',
            'src/main/webapp/**/*.json',
            '{.tmp/,}src/main/webapp/assets/styles/**/*.css',
            '{.tmp/,}src/main/webapp/scripts/**/*.js',
            'src/main/webapp/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      },
      options: {
        watchTask: true,
        proxy: "localhost:9090",
        open: false
      }
    }

  });

  // Unit tests
  grunt.registerTask('test', [
    'clean:server',
    'wiredep:test',
    'karma:unit',
    'jshint:test'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep:app',
    'sass:dist',
    'useminPrepare',
    'copy:dist',
    'cssmin:generated',
    'autoprefixer',
    'concat:generated',
    'uglify:generated',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  // Host application in dev mode
  grunt.registerTask('default', [
    'clean:server',
    'wiredep',
    'injector',
    'browserSync',
    'watch'
  ]);

};
