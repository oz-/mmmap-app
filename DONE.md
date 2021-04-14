# Order of operations

## Base creation

Creates Vue application

```vue create mmmap```

Adds elecctron-builder and electron-builder's Vue plugin

```cd mmmap && vue add electron-builder```

Adds *get-port* module to connect main process and renderer process with WebSockets after a first handshake via Electron's IPC

```yarn add get-port```

## Inter-process communication

To keep app sandboxed, the Electron's IPC module is used only at the very beginning of the application's creation.

Main process gets an available port on the local host, then creates a WebSocket server on it. 
Renderer process asks main process for this port then connects to WebSocket server and add listeners before Vue.js app creation. 