import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  summarize: (text) => {
    console.log('Preload: Invoking summarize with text length:', text.length)
    return ipcRenderer.invoke('summarize', text)
  },
  book : () => {
    return ipcRenderer.invoke('book')
  },
  websocket: {
    send: (message) => {
      console.log('Preload: Sending WebSocket message:', message)
      return ipcRenderer.invoke('ws-send', message)
    },
    // Allow renderer to listen for WebSocket events
    onMessage: (callback) => {
      ipcRenderer.on('ws-message', (_event, message) => callback(message))
    },
    onConnect: (callback) => {
      ipcRenderer.on('ws-connect', () => callback())
    },
    onDisconnect: (callback) => {
      ipcRenderer.on('ws-disconnect', () => callback())
    },
    // Remove event listeners when they're no longer needed
    removeListeners: () => {
      ipcRenderer.removeAllListeners('ws-message')
      ipcRenderer.removeAllListeners('ws-connect')
      ipcRenderer.removeAllListeners('ws-disconnect')
    }
  }


}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
