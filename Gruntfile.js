module.exports = function(grunt) {
  const sass = require("node-sass");

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

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
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"]
      },
      dist: {
        files: {
          "public/js/scripts.js": "assets/js/scripts.js"
        }
      }
    },

    watch: {
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ["assets/scss/**/*.scss"],
        tasks: ["sass"]
      },
      babel: {
        files: ["assets/js/*.js"],
        tasks: ["babel"]
      },
      scripts: {
        // We watch and compile JavaScript files as normal but don't live reload here
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
  require("load-grunt-tasks")(grunt);

  // Default task(s).
  grunt.registerTask("default", ["watch"]);
};
