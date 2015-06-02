'use strict';

module.exports = function (grunt) {
  var fs    = require('fs'),
    hogan = require('hogan.js'),
    extend = require('extend');

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

    // load custom tasks
  grunt.loadTasks('scripts/tasks');

  grunt.initConfig({
    app: {
      'templates': 'templates',
      'data': 'data',
      'styles': 'styles',
      'javascripts' : 'javascripts',
      'images' : 'images',
      'govuk_template': 'node_modules/govuk_template_mustache',
      'govuk_frontend_toolkit': 'node_modules/govuk-elements/govuk/public',
      'govuk_elements': 'node_modules/govuk-elements/public'
    },
    target: {
      'html': 'build/',
      'styles': 'build/public/stylesheets',
      'images': 'build/public/images',
      'scripts': 'build/public/javascripts'
    },
    clean: {
      dev: {
        clean: ['build']
      }
    },
    connect: {
      dev: {
        options: {
          livereload: true,
          base: ['build'],
          directory: 'build',
          // open: 'http://0.0.0.0:8000/html'
          open: 'http://localhost:8000/form-start.html'
        }
      }
    },
    watch: {
      templates: {
        files: ['<%= app.templates %>/**/*.mustache','<%= app.data %>/**/*.json'],
        tasks: ['mustachePreview'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['<%= app.styles %>/**/*.scss'],
        tasks: ['compass'],
        options: {
          livereload: true
        }
      },
      javascripts: {
        files: ['<%= app.javascripts %>/**/*.js'],
        tasks: ['jshint','copy'],
        options: {
          livereload: true
        }
      }
    },
    mustachePreview: {
      dev: {
        src: ['<%= app.templates %>/**/*.mustache', '!<%= app.templates %>/**/_*.mustache'],
        partials: ['<%= app.templates %>/**/_*.mustache'],
        dest: '<%= target.html %>',
        data: '<%= app.data %>'

      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd:'<%= app.govuk_template %>/assets/stylesheets',
          src: ['**'],
          filter: 'isFile',
          dest: '<%= target.styles %>'
        }, {
          expand: true,
          cwd:'<%= app.images %>',
          src: ['**'],
          filter: 'isFile',
          dest: '<%= target.images %>'
        }, {
          expand: true,
          cwd:'<%= app.govuk_template %>/assets/images',
          src: ['**'],
          filter: 'isFile',
          dest: '<%= target.images %>'
        },{
          expand: true,
          cwd:'<%= app.javascripts %>',
          src: ['**'],
          filter: 'isFile',
          dest: '<%= target.scripts %>'
        },{
          expand: true,
          cwd:'<%= app.govuk_template %>/assets/javascripts',
          src: ['**'],
          filter: 'isFile',
          dest: '<%= target.scripts %>'
        },{
          expand: true,
          cwd:'<%= app.govuk_frontend_toolkit %>/images',
          src: ['**'],
          filter: 'isFile',
          dest: '<%= target.images %>'
        }]
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: '<%= app.styles %>',
          cssDir: '<%= target.styles %>',
          force: true,
          importPath: [
            '<%= app.govuk_elements %>/sass',
            '<%= app.govuk_frontend_toolkit %>/sass'
          ],
          imagesDir: '<%= target.images %>',
          httpImagesPath: '/public/images/'
        }
      }
    },
    jshint: {
      files: ['javascripts/*.js','javascripts/govuk/*.js','!javascripts/details.polyfill.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          "$": false,
          "jQuery": false
        },
      },
    },
  });

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'mustachePreview',
    'copy',
    'compass',
    'connect',
    'watch'
  ]);


  grunt.registerTask('build', [
    'clean',
    'mustachePreview',
    'copy',
    'compass'
  ]);
}
