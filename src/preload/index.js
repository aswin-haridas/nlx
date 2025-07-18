import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api = {
  summarize: (text) => {
    console.log("Preload: Summarize function called with text:", text);
    try {
      return ipcRenderer.invoke("summarize-text", text);
    } catch (error) {
      console.error("Preload: Error in summarize function:", error);
      throw error;
    }
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
    console.log("Preload: APIs exposed successfully");
  } catch (error) {
    console.error("Preload: Error exposing APIs:", error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
  console.log("Preload: APIs added to window global");
}
