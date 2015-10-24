module.exports = function(grunt) {
  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    shell: {
      redis: {
        command: "mongod",
        options: {
          async: true,
          stdout: false,
          stderr: true,
          failOnError: false,
          execOptions: {
            cwd: "."
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['shell:redis', 'nodemon']);
};