module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      uglify: {
        files: ['javascripts/**/*.js'],
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
          'node_modules/angular-google-gapi/dist/angular-google-gapi.min.js',
          'bower_components/angular-local-storage/dist/angular-local-storage.js',
          'bower_components/moment/moment.js',
          'bower_components/angular-momentjs/angular-momentjs.js',
          'bower_components/spin.js/spin.js',
          'bower_components/angular-spinner/angular-spinner.js',
          'bower_components/angular-loading-spinner/angular-loading-spinner.js'

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
              baseDir: './application'
          },
          port: 3001
        }
      }
    },
    uglify: {
      my_target: {
        files: {
            'application/assets/javascripts/application.min.js': [
            'javascripts/application.js',
            'javascripts/module/module.js',
            'javascripts/config/routes.js',
            'javascripts/config/config.js',
            'javascripts/services/authentication.factory.js',
            'javascripts/services/httpInterceptor.factory.js',
            'javascripts/services/checkin.factory.js',
            'javascripts/services/getweeks.factory.js',
            'javascripts/directives/owl_carousel.directive.js',
            'javascripts/directives/history-items.directive.js',
            'javascripts/directives/calendar-week.directive.js',
            'javascripts/controllers/login.controller.js',
            'javascripts/controllers/getprojects.controller.js',
            'javascripts/controllers/gethistory.controller.js'
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


