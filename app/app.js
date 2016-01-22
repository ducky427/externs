const electron = require('electron'),
      fs = require('fs-extra'),
      path = require('path'),
      shell = require('shell'),
      packageJson = require(__dirname + '/package.json');

var ipc = electron.ipcMain;
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

const onMac = (process.platform === 'darwin');
const acceleratorKey = onMac ? "Command" : "Control";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// make sure app.getDataPath() exists
// https://github.com/oakmac/cuttle/issues/92
fs.ensureDirSync(app.getPath('userData'));


//------------------------------------------------------------------------------
// Main
//------------------------------------------------------------------------------


// NOTE: not all of the browserWindow options listed on the docs page work
// on all operating systems
const browserWindowOptions = {
  height: 850,
  title: 'externs-electron',
  width: 1400,
  show: false
};


//------------------------------------------------------------------------------
// Register IPC Calls from the Renderers
//------------------------------------------------------------------------------

ipc.on('close-app', function(event) {
  mainWindow.destroy();
});


//------------------------------------------------------------------------------
// Ready
//------------------------------------------------------------------------------


// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

  // Create the browser window.
  mainWindow = new BrowserWindow(browserWindowOptions);

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    app.quit();
  });

});
