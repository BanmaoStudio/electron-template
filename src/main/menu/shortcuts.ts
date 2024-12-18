import { app } from 'electron'

export const macShortcuts = [
  {
    label: app.name,
    submenu: [
      { label: '关于', role: 'about', accelerator: 'CmdOrCtrl+I' },
      {
        label: '检查更新',
        click: () => {
          console.warn('未实现')
        }
      },
      { type: 'separator' },
      {
        label: '设置',
        accelerator: 'Command+,',
        click: () => {
          console.warn('未实现')
        }
      },
      { type: 'separator' },
      { label: '服务', role: 'services' },
      { type: 'separator' },
      { label: '隐藏', role: 'hide' },
      { label: '隐藏其他', role: 'hideOthers' },
      { label: '显示全部', role: 'unhide' },
      { type: 'separator' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { label: '退出', accelerator: 'Command+Q', role: 'quit' }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { label: '撤销', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
      { label: '重做', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
      { type: 'separator' },
      { label: '剪切', accelerator: 'CmdOrCtrl+X', role: 'cut' },
      { label: '复制', accelerator: 'CmdOrCtrl+C', role: 'copy' },
      { label: '粘贴', accelerator: 'CmdOrCtrl+V', role: 'paste' },
      { label: '全选', accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
    ]
  }
] as Electron.MenuItemConstructorOptions[]
