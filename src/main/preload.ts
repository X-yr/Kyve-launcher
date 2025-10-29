import { contextBridge, ipcRenderer } from "electron";

// Expose protected APIs to the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  app: {
    getVersion: () => ipcRenderer.invoke("get-app-version"),
    getPlatform: () => ipcRenderer.invoke("get-platform"),
    getPath: () => ipcRenderer.invoke("get-app-path"),
  },
});

// Debug tools for development environment
if (process.env.NODE_ENV === "development") {
  window.addEventListener("DOMContentLoaded", () => {
    contextBridge.exposeInMainWorld("DEBUG", {
      log: console.log,
      error: console.error,
    });
  });
}
