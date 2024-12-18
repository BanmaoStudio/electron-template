import { Menu } from 'electron'
import { generateMenu } from '../../utils/helpers'
import { isMac } from '../../utils/platform'
import { macShortcuts } from './shortcuts'

export function createMenu(win: Electron.BrowserWindow | null) {
  const template = [
    ...(isMac ? macShortcuts : []),
    {
      label: '报表查询',
      submenu: [
        {
          label: '日报查询',
          click: () => {
            win?.webContents.send('change-view', { route: '/daily-report' })
          }
        },
        {
          label: '月报查询',
          click: () => {
            win?.webContents.send('change-view', { route: '/monthly-report' })
          }
        },
        {
          label: '季报查询',
          click: () => {
            win?.webContents.send('change-view', { route: '/quarterly-report' })
          }
        },
        {
          label: '年报查询',
          click: () => {
            win?.webContents.send('change-view', { route: '/annual-report' })
          }
        }
      ]
    }
  ]
  Menu.setApplicationMenu(generateMenu(template))
}
