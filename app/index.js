const { app, BrowserWindow } = require('electron')
const fs = require('fs');
const http = require('http');
const path = require('path');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 768, 
    height: 600,
    backgroundColor: '#ffffff',
    //icon: `file://${__dirname}/dist/assets/logo.png`,
    icon: path.join(__dirname, 'dist/assets/logo.png'),
    titleBarStyle: 'hidden'
  })
  //win.setOverlayIcon(`file://${__dirname}/dist/assets/16x16.png`, 'a description');
  

  win.loadURL(`file://${__dirname}/dist/index.html`)
  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()
  // Event when the window is closed.
  win.on('closed', function () {
    win = null;
    app.quit();
  })


  launchServer();
}

function launchServer () {
  console.log("HELLO WORLD :D :D :D :D");

  http.createServer((req, res) => {
    console.log(req.url);
    if(req.url == "favicon.ico"){
        res.writeHead(404, {});
        res.end();
    }

    const path = 'dist/model' + req.url;
    /*
    if(!fs.existsSync(path)){
        console.log("404 404 404");
        res.writeHead(404, {});
        res.end();
        return;
    }*/


    res.writeHead(200, {'Content-type': 'text/js', 'Access-Control-Allow-Origin': '*'});

    $data = require('model' + req.url);
    if($data === undefined){
      console.log("404 : Resource " + req.url + " not found");
      req.write(404, {});
      res.end();
    }
    res.write(JSON.stringify(require('model' + req.url)));
    res.end();
  }).listen('5252');
}

// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    //launchServer()
    createWindow()
  }
})