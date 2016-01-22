module.exports = function(grunt) {
'use strict';

const fs = require('fs-extra')
const path = require('path');
const nunjucks = require('nunjucks');
const edn = require("jsedn");
const format = require("string-template")

const os = (function(){
  var platform = process.platform;
  if (/^win/.test(platform))    { return "windows"; }
  if (/^darwin/.test(platform)) { return "mac"; }
  if (/^linux/.test(platform))  { return "linux"; }
  return null;
})();

const exe = {
  windows:  "electron.exe",
  mac:  "Electron.app/Contents/MacOS/Electron",
  linux:  "electron"
};

const electron_path = "electron";
const electron_version = "0.36.4";

//------------------------------------------------------------------------------
// ShellJS
//------------------------------------------------------------------------------

require('shelljs/global');
// shelljs/global makes the following imports:
//   cwd, pwd, ls, find, cp, rm, mv, mkdir, test, cat,
//   str.to, str.toEnd, sed, grep, which, echo,
//   pushd, popd, dirs, ln, exit, env, exec, chmod,
//   tempdir, error

var shellconfig = require('shelljs').config;
shellconfig.silent = false; // hide shell cmd output?
shellconfig.fatal = false;   // stop if cmd failed?

//------------------------------------------------------------------------------
// Grunt Config
//------------------------------------------------------------------------------


grunt.initConfig({

  'download-electron': {
    version: electron_version,
    outputDir: 'electron'
  }

});

//------------------------------------------------------------------------------
// Third-party tasks
//------------------------------------------------------------------------------


grunt.loadNpmTasks('grunt-download-electron');

//------------------------------------------------------------------------------
// Setup Tasks
//------------------------------------------------------------------------------

grunt.registerTask('setup', [
  'download-electron'
]);

grunt.registerTask('cljsbuild-prod', function() {
  grunt.log.writeln("\nCleaning and building ClojureScript production files...");
  exec("lein do clean, with-profile production cljsbuild once");
});

grunt.registerTask('launch', function(file_name) {
  const data = edn.parse(fs.readFileSync(file_name, 'utf8'));
  const version = data.at(edn.kw(":version"));
  const code_loc = format(data.at(edn.kw(":file")), {version: version});

  const file_contents = nunjucks.render('template/index.html', {name: data.at(edn.kw(":object")),
                                                                scripts: [code_loc],
                                                                "package": data.at(edn.kw(":package")),
                                                                file: file_name});
  fs.writeFileSync('app/index.html', file_contents, 'utf8');

  grunt.log.writeln("\nLaunching app...");
  var local_exe = exe[os];
  process.env['ELECTRON_ENABLE_LOGGING'] = 'y'
  exec(path.join(electron_path, local_exe) + " app" + " " + file_name, {async:false});
});

grunt.registerTask('check-old', function() {
  grunt.log.writeln("\nChecking clojure dependencies");
  exec("lein ancient :all", {silent:false});
  grunt.log.writeln("\nChecking npm dependencies");
  exec("npm outdated", {silent:false});
});

grunt.registerTask('cljsbuild-prod', function() {
  grunt.log.writeln("\nCleaning and building ClojureScript production files...");
  exec("lein do clean, with-profile production cljsbuild once");
});

grunt.registerTask('default', ['setup']);

// end module.exports
};
