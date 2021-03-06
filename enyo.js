/*
 * grunt init:enyo
 * https://github.com/phated/grunt-init-enyo
 *
 * Copyright (c) 2012 Blaine Bublitz
 * Licensed under the MIT license.
 * http://github.com/phated/grunt-init-enyo/blob/master/LICENSE-MIT
 */

// Basic template description.
exports.description = 'Scaffold an EnyoJS project';

// Template-specific notes to be displayed before question prompts.
// exports.notes = '_Project name_ should not contain "jquery" or "js" and ' +
//   'should be a unique ID not already in use at plugins.jquery.com. _Project ' +
//   'title_ should be a human-readable title, and doesn\'t need to contain ' +
//   'the word "jQuery", although it may. For example, a plugin titled "Awesome ' +
//   'jQuery Plugin" might have the name "awesome-plugin". For more information ' +
//   'please see the documentation at ' +
//   'https://github.com/jquery/plugins.jquery.com/blob/master/docs/jquery.json.md';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  grunt.helper('prompt', {type: 'enyo'}, [
    // Prompt for these values.
    grunt.helper('prompt_for', 'name'),
    grunt.helper('prompt_for', 'description', 'The best EnyoJS project ever.'),
    grunt.helper('prompt_for', 'version'),
    grunt.helper('prompt_for', 'repository'),
    grunt.helper('prompt_for', 'homepage'),
    grunt.helper('prompt_for', 'bugs'),
    grunt.helper('prompt_for', 'licenses', 'MIT GPL'),
    grunt.helper('prompt_for', 'author_name'),
    grunt.helper('prompt_for', 'author_email'),
    grunt.helper('prompt_for', 'author_url'),
    {
      name: 'enyo_libraries',
      message: 'Enyo libraries',
      default: 'layout onyx',
      warning: 'Space separated list of enyo libraries dependencies'
    }
  ], function(err, props) {
    // Make an array out of the enyo_libraries string
    var words = grunt.utils._.words;
    var clean = grunt.utils._.clean;
    props.enyo_libraries = words(clean(props.enyo_libraries));

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: ['api/', 'assets/', 'enyo/', 'lib/', 'tools/']});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.name,
      version: props.version,
      npm_test: 'grunt',
      // TODO: pull from grunt's package.json
      node_version: '>= 0.6.0'
    });

    // Generate jquery.json file.
    // init.writePackageJSON(props.jqueryjson, props);

    // All done!
    done();
  });

};