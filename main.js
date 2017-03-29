var {app, BrowserWindow} = require('electron')
var path = require('path')

let mainWindow

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow == null) {
    createWindow()
  }
})

function createWindow () {
  mainWindow = new BrowserWindow({width: 900, height: 700, frame: false, minWidth: 300, minHeight: 430})
  mainWindow.loadURL(path.join('file://', __dirname, '/app/public/index.html'))
  mainWindow.setMenu(null)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('unresponsive', function () {

  })

  if (process.env.ENV === 'dev') {
    mainWindow.webContents.openDevTools()
  }
}
process.on('uncaughtException', function () {

})

app.on('ready', function () {
  createWindow()
})
