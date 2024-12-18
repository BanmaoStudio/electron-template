import { nativeImage } from 'electron'
import { app, shell, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// import pkg from '../../package.json'

// const winURL = is.dev ? `http://localhost:5173` : `file://${__dirname}/index.html`
// const loginURL = is.dev ? `http://localhost:5173/#login` : `file://${__dirname}/index.html#login`

let loginWindow: BrowserWindow | null = null
let mainWindow: BrowserWindow | null = null
// let aboutWindow: BrowserWindow | null = null

// const path = require('path')

// const ApplicationName = pkg.name
// 托盘对象
let appTray: Tray | null = null
// 是否可以退出
// let trayClose = false
// 系统托盘右键菜单
let trayMenuTemplate: Electron.MenuItemConstructorOptions[] = []
// 系统托盘图标
// let iconPath
// 图标的上下文
let contextMenu: Menu | null = null
// 图标闪烁定时器
let blinkTrayTimer

const trayImage = nativeImage.createFromPath(icon)
/**
 * 创建系统托盘
 */
function createTray() {
  // 创建 Tray 对象并设置图标
  appTray = new Tray(trayImage.resize({ width: 16, height: 16 }))
  // 创建菜单并设置到 Tray 对象上
  trayMenuTemplate = [
    {
      label: '加油站运营管理系统',
      click: () => {
        // shell.openExternal('https://github.com/xiaoxian521/vue-pure-admin')
        mainWindow?.show()
      }
    },
    {
      label: '退出',
      click: () => {
        // trayClose = true
        app.quit()
      }
    }
  ]

  appTray.setToolTip('加油站运营管理系统')
  // 图标的上下文
  contextMenu = Menu.buildFromTemplate(trayMenuTemplate)

  // 设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu)

  // 主窗口显示隐藏切换
  appTray.on('click', () => {
    // 清除显示闪烁定时器
    clearInterval(blinkTrayTimer)
    blinkTrayTimer = null
    // 还原图标
    appTray?.setImage(trayImage.resize({ width: 16, height: 16 }))
    if (loginWindow) {
      loginWindow.isVisible() ? loginWindow.hide() : loginWindow.show()
    }

    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })
}

function createLoginWindow(): void {
  if (loginWindow) {
    return
  }

  loginWindow = new BrowserWindow({
    show: true,
    width: 768,
    height: 480,
    frame: false, // 无边框
    transparent: true, // 透明
    // resizable: false,
    titleBarStyle: 'hidden', // 隐藏标题栏
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // loginWindow.loadURL(loginURL)
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    loginWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#login`)
  } else {
    loginWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'login' })
  }

  loginWindow.once('ready-to-show', () => {
    loginWindow?.show()
  })

  loginWindow.on('closed', () => {
    loginWindow = null
  })
}



function createMainWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    frame: false, // 无边框
    autoHideMenuBar: true,
    titleBarStyle: 'hidden', // 隐藏标题栏
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
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

  // IPC test
  ipcMain.on('close', () => {
    if (loginWindow) {
      loginWindow.close()
    }
    if (mainWindow) {
      mainWindow.close()
    }
  })

  ipcMain.on('maximize', () => {
    mainWindow?.isMaximizable() ? mainWindow?.unmaximize() : mainWindow?.maximize()
  })

  // 打开主页
  ipcMain.on('openMainWindow', () => {
    if (!mainWindow) {
      createMainWindow()
    }
    loginWindow?.destroy()
    loginWindow = null
  })

  ipcMain.on('openLoginWindow', () => {
    if (!loginWindow) {
      createLoginWindow()
    }
    mainWindow?.destroy()
    loginWindow?.show()
    loginWindow?.focus()
  })

  createLoginWindow()
  createTray()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createLoginWindow()
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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
