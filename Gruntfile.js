'use strict';
var spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = function(grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    mochacli: {
      options: {
        reporter: 'list',
        bail: true
      },
      all: ['test/*.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'mochacli']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochacli']
      }
    }
  });

  // PG server for tests
  grunt.registerTask('startTestDB', function() {
    var done = this.async();

    var out = fs.openSync('./local_postgres/out.log', 'a');
    var err = fs.openSync('./local_postgres/out.log', 'a');

    // check for .pid file before starting server
    if (fs.existsSync('./local_postgres/postmaster.pid')) {
      var postmaster = fs.readFileSync('./local_postgres/postmaster.pid', 'utf8');
      console.log("postgres already running");
      console.log("kill it with the first line (kill <pid>) of what follows");
      console.log(postmaster);
      done();
    } else {
      var pg = spawn('postgres', ['-D', 'local_postgres'],
        { 'stdio': ['ignore',out,err],
          'detached': true });
      pg.unref();
      console.log(pg.pid);
      done();
    }
  });
  grunt.registerTask('stopTestDB', function() {
    var done = this.async();

    // check for .pid file before stopping server
    if (fs.existsSync('./local_postgres/postmaster.pid')) {
      var postmaster = fs.readFileSync('./local_postgres/postmaster.pid', 'utf8');
      var pid = postmaster.match(/^.*$/m)[0];
      console.log("killing task id: " + pid);
      spawn('kill', [pid]);
      done();
    } else {
      console.log("postgres is not running");
      done();
    }
  });
  grunt.registerTask('pingPostgres', function() {
    var pgReady = spawn('pg_isready', ['--port=8888'], { 'stdio': [0,1,2]});
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochacli']);
};
