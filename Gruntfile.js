module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      uglify: {
        files: ['javascripts/*.js'],
        tasks: ['uglify']
      }
    },
    autoprefixer: {
      dist: {
        src: ['application/assets/stylesheet/main.min.css']
      },
    },
    sass: {
      css: {
        options: {
          sourcemap: 'none',
          style: 'compressed',
          noCache: true
        },
        files: {
          'application/assets/stylesheet/main.min.css': 'sass/main.scss'
        },
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/selectize/dist/js/standalone/selectize.min.js',
          'javascripts/owl.carousel.min.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-selectize2/dist/angular-selectize.js',
          'bower_components/satellizer/satellizer.min.js'
        ], 
        dest: 'application/assets/javascripts/vendor/bundle.js'
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'application/assets/stylesheet/main.min.css',
            'application/assets/javascripts/application.min.js',
            'application/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
              baseDir: './application',
              middleware: function (req, res, next) {
                console.log('-----')
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
              }
          },
          port: 3000
        }
      }
    },
    uglify: {
      my_target: {
        files: {
            'application/assets/javascripts/application.min.js': [
            'javascripts/application.js',
            'javascripts/directives/owl_carousel.directive.js',
            'javascripts/config.js',
            'javascripts/controllers/login.controller.js',
            'javascripts/routes.js'
          ]
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat', 'browserSync', 'watch']);
};


