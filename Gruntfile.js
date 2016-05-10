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
          'bower_components/Materialize/bin/materialize.js'
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
          server: './application'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'application/assets/javascripts/application.min.js': [
            'javascripts/application.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat', 'browserSync', 'watch']);
};


