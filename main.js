const {app, BrowserWindow} = require('electron')
const path = require('path')

let mainWindow

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow()
  }
})

function createWindow () {
  mainWindow = new BrowserWindow({width: 900, height: 700})
  mainWindow.loadURL(path.join('file://', __dirname, '/src/public/app/index.html'))
  mainWindow.setMenu(null)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('unresponsive', () => {

  })

  if (process.env.NODE_ENV === 'dev') {
    mainWindow.webContents.openDevTools()
  }
}

process.on('uncaughtException', (e) => {
  console.error(e)
})

app.on('ready', () => {
  createWindow()
})
