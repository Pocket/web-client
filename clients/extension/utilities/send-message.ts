import type { ExtMessage } from '../types'

export function sendMessage(message: ExtMessage) {
  void chrome.runtime.sendMessage(message)
}

export function sendMessageToTab(tabId: number, message: ExtMessage) {
  void chrome.tabs.sendMessage(tabId, message)
}
