import { storageFactory } from 'storage-factory'

/*
import * as storage from 'connectors/browser-storage/browser-storage'
import { localStore } from 'connectors/browser-storage/browser-storage'

function foo(token) {
  storage.localStore.setItem("token", token)
  // or
  localStore.setItem("token", token)
}
*/

export const localStore = storageFactory(() => localStorage)
export const sessionStore = storageFactory(() => sessionStorage)
