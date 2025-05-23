import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from 'axios'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function connectWebSocket() {
  ws = new WebSocket(`ws://${YOUR_WS_SERVER_IP}:${YOUR_WS_PORT}/`)

  ws.on('open', () => {
    console.log('WebSocket connected')
  })

  ws.on('message', (message) => {
    const str = message.toString()
    console.log('Message received:', str)
    mainWindow.webContents.send('some-event', str)
  })

  ws.on('error', (err) => {
    console.error('WebSocket error:', err)
  })

  ws.on('close', () => {
    console.log('WebSocket closed. Reconnecting...')
    setTimeout(connectWebSocket, 5000)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('summarize', async (event, text) => {
    console.log('Received text to summarize:', text.substring(0, 100) + '...')

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/summarize',
        {
          text: text
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log(response)

      return response.data
    } catch (error) {
      console.error('Error summarizing text:', error.message)
      if (error.response) {
        console.error('Response data:', error.response.data)
        console.error('Response status:', error.response.status)
      }
      return null
    }
  })

  ipcMain.handle('book', async (event, action = 'book') => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/book',
        {
          action: action
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('Booking response:', response.data)
      return response.data
    } catch (error) {
      console.error('Error booking:', error.message)
      return { data: 'error' }
    }
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
