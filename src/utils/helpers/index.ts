import { Menu } from 'electron'

export function generateMenu(tpl: Electron.MenuItemConstructorOptions[]) {
  return Menu.buildFromTemplate(tpl)
}
