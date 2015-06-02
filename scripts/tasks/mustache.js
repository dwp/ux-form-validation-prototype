module.exports = function(grunt) {
  var fs    = require('fs'),
      hogan = require('hogan.js');

  // ==========================================================================
  // TASKS
  // ==========================================================================
  grunt.registerMultiTask('mustachePreview', 'Render mustache files', function() {

    this.files.forEach(function(files) {
      var partials = {};
      grunt.file.expand(files.partials).forEach(function(filepath){
        var partialName = filepath.replace('templates/', '').replace('.mustache','');
        partials[partialName] = grunt.file.read(filepath);
      });

      files.src.forEach(function(filepath) {

        var relativePath = filepath.replace('templates', '').replace('.mustache', ''),
            dataPath = files.data + relativePath + '.json',
            template = hogan.compile(grunt.file.read(filepath)),
            dataFile = grunt.file.readJSON(dataPath),
            html = template.render(dataFile, partials),
            outputFile = files.dest + relativePath + '.html';

        grunt.file.write(outputFile, html);
      });
    });
  });

};
