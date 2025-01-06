import { localize } from '../../utilities/localization'
import { getSetting } from '../../utilities/storage'

/* Context Menus
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export async function setContextMenus() {
  chrome.contextMenus.removeAll()

  // Page Context - Right click menu on page
  chrome.contextMenus.create({
    title: localize('context_menu_save'),
    id: 'pageContextClick',
    contexts: ['page', 'frame', 'editable', 'image', 'video', 'audio', 'link', 'selection'] // prettier-ignore
  })

  // Browser Icon - Right click menu
  chrome.contextMenus.create({
    title: localize('context_menu_open_list'),
    id: 'toolbarContextClickList',
    contexts: ['action']
  })

  chrome.contextMenus.create({
    title: localize('context_menu_discover_more'),
    id: 'toolbarContextClickHome',
    contexts: ['action']
  })

  // Log In or Out menu item depending on existence of access token
  const access_token = await getSetting('access_token')
  if (access_token) {
    chrome.contextMenus.create({
      title: localize('context_menu_log_out'),
      id: 'toolbarContextClickLogOut',
      contexts: ['action']
    })
  } else {
    chrome.contextMenus.create({
      title: localize('context_menu_log_in'),
      id: 'toolbarContextClickLogIn',
      contexts: ['action']
    })
  }
}
