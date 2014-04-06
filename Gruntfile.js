'use strict';

// Directory reference:
//   css: css
//   compass: _scss
//   javascript: js
//   images: images
//   fonts: fonts

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configurable path
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      compass: {
        files: [
          '<%= yeoman.app %>/assets/_scss/**/*.{scss,sass}'
          ],
        tasks: ['compass:server', 'autoprefixer:server'],
      },
      autoprefixer: {
        files: ['<%= yeoman.app %>/assets/css/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:server']
      },
      jekyll: {
        files: [
          '<%= yeoman.app %>//**/*.{html,yml,md,mkd,markdown}',
          '_config.yml',
          '<%= yeoman.app %>/!components',
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '.tmp/assets/css/**/*.css',
          '{.tmp}/<%= js %>/**/*.js',
          '<%= yeoman.app %>/assets/images/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '.jekyll',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%= yeoman.dist %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            '.jekyll',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '!<%= yeoman.dist %>/.gitignore*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },
    compass: {
      options: {
        bundleExec: true,
        sassDir: '<%= yeoman.app %>/assets/_scss',
        cssDir: '.tmp/assets/css',
        imagesDir: '<%= yeoman.app %>/assets/images',
        javascriptsDir: '<%= yeoman.app %>/assets/js',
        relativeAssets: false,
        httpImagesPath: '/assets/images',
        httpGeneratedImagesPath: '/assets/images/generated',
        outputStyle: 'compressed',
        raw: 'extensions_dir = "<%= yeoman.app %>/assets/components"\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/assets/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: false,
          generatedImagesDir: '.tmp/<%= yeoman.dist %>/images/generated'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/assets/css',
          src: '**/*.css',
          dest: '<%= yeoman.dist %>/assets/css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '.tmp/assets/css',
          src: '**/*.css',
          dest: '.tmp/assets/css'
        }]
      }
    },
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%= yeoman.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: [
        '<%= yeoman.dist %>/*.html',
        '<%= yeoman.dist %>/**/*.html',
        ]
    },
    usemin: {
      options: {
        basedir: '<%= yeoman.dist %>',
        dirs: ['<%= yeoman.dist %>/**/*']
      },
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/assets/css/**/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: false,
          collapseBooleanAttributes: false,
          removeAttributeQuotes: false,
          removeRedundantAttributes: false
        },
        files: [{
          expand: false,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/bootstrap/transition.js',
            'assets/js/bootstrap/alert.js',
            'assets/js/bootstrap/button.js',
            'assets/js/bootstrap/carousel.js',
            'assets/js/bootstrap/collapse.js',
            'assets/js/bootstrap/dropdown.js',
            'assets/js/bootstrap/modal.js',
            'assets/js/bootstrap/tooltip.js',
            'assets/js/bootstrap/popover.js',
            'assets/js/bootstrap/scrollspy.js',
            'assets/js/bootstrap/tab.js',
            'assets/js/bootstrap/affix.js',
            'assets/js/_*.js'
          ]
        },
        options: {
          sourceMap: 'assets/js/scripts.min.js.map',
          sourceMappingURL: '/app/js/scripts.min.js.map'
        }
      }
    },
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            // Jekyll processes and moves HTML and text files
            // Usemin moves CSS and javascript inside of Usemin blocks
            // Copy moves asset files and directories
            'asets/images/**/*',
            'assets/fonts/**/*',
	          '!components',
	          '!node_modules',
	          '!dist',
            // Like Jekyll, exclude files & folders prefixed with an underscore
            '!**/_*{,/**}',
            // Explicitly add any files your site needs for distribution here
            'assets/components/jquery/jquery.js',
            'favicon.ico',
            'apple-touch*.png'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      },
      // Copy CSS into .tmp directory for Autoprefixer processing
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/assets/css',
          src: '**/*.css',
          dest: '.tmp/assets/css'
        }]
      }
    },
    rev: {
      options: {
        length: 4
      },
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/assets/js/**/*.js',
            '<%= yeoman.dist %>/assets/css/**/*.css',
            '<%= yeoman.dist %>/assets/images/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%= yeoman.dist %>/assets/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>assets/js/**/*.js',
        'test/spec/**/*.js',
        '<%= yeoman.app %>/!assets/js/vendor/**/*'
      ]
    },
    csscss: {
      options: {
        bundleExec: true,
        minMatch: 2,
        ignoreSassMixins: false,
        compass: true,
        colorize: true,
        shorthand: false,
        verbose: true
      },
      check: {
       src: ['<%= yeoman.app %>/assets/css/**/*.css',
             '<%= yeoman.app %>/assets/_scss/**/*.scss']
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%= yeoman.app %>/assets/css/**/*.css',
          '<%= yeoman.app %>/assets/_scss/**/*.scss'
        ]
      }
    },
    concurrent: {
      server: [
        'compass:server',
        'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        'compass:dist',
        'copy:dist'
      ]
    },
    uncss: {
      dist: {
        files: {
          '<%= yeoman.dist %>/assets/css/main.css': ['<%= yeoman.dist %>/draft.html']
        }
      }
    }
  });

  // タスク定義
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  // サーバー
  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  // テスト
  grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'connect:test'
  ]);

  // チェック
  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'compass:server',
    'jshint:all',
    'csscss:check',
    'csslint:check'
  ]);

  // ビルド
  grunt.registerTask('build', [
    'clean:dist',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'autoprefixer:dist',
    'uglify',
    'imagemin',
    'svgmin',
    'usemin',
    'uncss',
    ]);

  // デフォルト
  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};
