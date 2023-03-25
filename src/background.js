'use strict';
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Tray,
  Menu,
  protocol,
  dialog,
  nativeImage,
} = require('electron');
const path = require('path');
const { createProtocol } = require('vue-cli-plugin-electron-builder/lib');
const installExtension = require('electron-devtools-installer');
const { VUEJS_DEVTOOLS } = require('electron-devtools-installer');
const isDevelopment = process.env.NODE_ENV !== 'production';

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function windowOptions() {
  //创建窗口
  const mainWin = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    resizable: false,
    minimizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  require('@electron/remote/main').initialize();
  require('@electron/remote/main').enable(mainWin.webContents);
  app.setAppUserModelId('TeachingToolkit');
  //托盘图标路径
  let appIcon;
  if (isDevelopment) {
    appIcon = path.join(__static, './static/favicon.ico');
  } else {
    appIcon = path.join(process.resourcesPath, './static/favicon.ico');
  }
  const tray = new Tray(nativeImage.createFromPath(appIcon));
  const trayTemplate = Menu.buildFromTemplate([
    {
      label: 'DevTools',
      click: () => {
        mainWin.webContents.openDevTools();
      },
    },
    {
      label: '退出',
      click: () => {
        mainWin.close();
      },
    },
  ]);
  tray.setToolTip('Teaching Toolkit');
  tray.on('click', () => {
    mainWin.show();
  });
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayTemplate);
  });

  //   IPC
  //   windows
  ipcMain.on('window-min', () => {
    mainWin.minimize();
  });
  ipcMain.on('window-max', () => {
    if (mainWin.isMaximized()) {
      mainWin.unmaximize();
    } else {
      mainWin.maximize();
    }
  });
  ipcMain.on('window-close', () => {
    mainWin.hide();
    new Notification({
      title: '提示',
      subtitle: '通知',
      body: '应用已最小化到托盘',
      icon: appIcon,
    }).show();
  });
  ipcMain.on('window-fix', (event, top) => {
    mainWin.setAlwaysOnTop(top);
  });
  //   path
  ipcMain.on('__static', (event) => {
    event.returnValue = __static;
  });
  //   server
  ipcMain.on('closeServer', () => {
    mainWin.webContents.send('closeServer', '');
  });
  //   单个文件
  ipcMain.on('dialogFile', (event, data) => {
    dialog
      .showOpenDialog({
        title: '请选择',
        filters: [{ name: 'Filters' }],
        properties: [data],
      })
      .then((result) => {
        if (result.filePaths) {
          event.returnValue = result;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //加载
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await mainWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWin.webContents.openDevTools();
  } else {
    createProtocol('app');
    mainWin.loadURL('app://./index.html');
  }
  remote.enable(mainWin.webContents);
}

app.on('ready', async () => {
  windowOptions();
});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
