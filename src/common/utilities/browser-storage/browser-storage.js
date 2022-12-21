import { storageFactory } from 'storage-factory'

export const localStore = storageFactory(() => localStorage)
export const sessionStore = storageFactory(() => sessionStorage)
