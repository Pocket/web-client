/* Local Storage
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getSetting(key: string) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        handleSettingError(chrome.runtime.lastError)
        return reject(
          new Error('Error when retrieving local settings. Please contact Pocket Support')
        )
      }
      resolve(result[key])
    })
  })
}

export function setSettings(values: Record<string, string>) {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.local.set(values, () => {
      if (chrome.runtime.lastError) {
        handleSettingError(chrome.runtime.lastError)
        return reject(new Error('Error when storing local settings. Please contact Pocket Support'))
      }
      resolve()
    })
  })
}

export function clearSettings() {
  void chrome.storage.local.clear()
}

function handleSettingError(err: chrome.runtime.LastError) {
  console.error(err)
}
