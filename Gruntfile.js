module.exports = function(grunt) {
  const sass = require("node-sass");

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    /*uglify: {
      options: {
       
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }*/

    /*Grunt Sass*/
    sass: {
      options: {
        implementation: sass,
        sourceMap: false
      },
      dist: {
        files: {
          "public/css/styles.css": "assets/scss/styles.scss"
        }
      }
    },

    watch: {
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ["assets/scss/**/*.scss"],
        tasks: ["sass"]
      },
      scripts: {
        // We watch and compile sass files as normal but don't live reload here
        files: ["assets/js/*.js"],
        tasks: ["uglify"]
      }
    },

    /*Grunt Uglify*/
    uglify: {
      my_target: {
        files: {
          "public/js/scripts.js": ["assets/js/scripts.js"]
        }
      }
    }
  });

  // Load the Grunt plugins and task.
  //grunt.loadNpmTasks('grunt');
  require("load-grunt-tasks")(grunt);

  // Default task(s).
  grunt.registerTask("default", ["watch"]);
};
