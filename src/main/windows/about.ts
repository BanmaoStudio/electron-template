import { BrowserWindow } from "electron"
import { join } from "path"
import { is } from '@electron-toolkit/utils'

const aboutURL = is.dev ? `http://localhost:5173/#about` : `file://${__dirname}/index.html#about`

export function createAboutWindow(win: Electron.BrowserWindow | null): void {
  if (win !== null) {
    return
  }
  win = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false, // 无边框
    transparent: true, // 透明
    resizable: false,
    titleBarStyle: 'hidden', // 隐藏标题栏
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  win.loadURL(aboutURL)

  win.once('closed', () => {
    win = null
  })
}
