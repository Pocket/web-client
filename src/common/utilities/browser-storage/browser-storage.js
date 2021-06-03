import { storageFactory } from 'storage-factory'

/*
import { localStore } from 'common/utilities'

function foo(token) {
  storage.localStore.setItem("token", token)
  // or
  localStore.setItem("token", token)
}
*/

export const localStore = storageFactory(() => localStorage)
export const sessionStore = storageFactory(() => sessionStorage)
