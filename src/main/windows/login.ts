import { BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

const loginURL = is.dev ? `http://localhost:5173/#login` : `file://${__dirname}/index.html#login`

export function createLoginWindow(
  loginWindow: Electron.BrowserWindow | null
): Electron.BrowserWindow {
  if (loginWindow) {
    return loginWindow
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

  loginWindow.loadURL(loginURL)
  // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  //   loginWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  // } else {
  //   loginWindow.loadFile(join(__dirname, '../renderer/index.html'))
  // }

  loginWindow.once('ready-to-show', () => {
    loginWindow?.show()
  })

  loginWindow.on('closed', () => {
    loginWindow = null
  })

  return loginWindow
}
