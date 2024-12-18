import { app, Menu, nativeImage, shell, Tray } from "electron"

import icon from '../../resources/icon.png?asset'

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


/**
 * 创建系统托盘
 */
export function createTray(wins: Electron.BrowserWindow[]) {
  // 创建 Tray 对象并设置图标
  appTray = new Tray(nativeImage.createFromPath(icon))
  // 创建菜单并设置到 Tray 对象上
  trayMenuTemplate = [
    {
      label: '加油站运营管理系统',
      click: () => {
        shell.openExternal('https://github.com/xiaoxian521/vue-pure-admin')
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
    appTray?.setImage(icon)
    for (const win of wins) {
      if (win) {
        win.isVisible() ? win.hide() : win.show()
      }
    }
    // if (loginWindow) {
    //   loginWindow.isVisible() ? loginWindow.hide() : loginWindow.show()
    // }

    // if (mainWindow) {
    //   mainWindow.isVisible()? mainWindow.hide() : mainWindow.show()
    // }
  })
}
