const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
        sendData: (name, data) => ipcRenderer.send(name, data),
        listen: (name, callback) => ipcRenderer.on(name, callback) 
    }
);