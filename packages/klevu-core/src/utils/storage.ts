import { KlevuConfig, LAST_CLICKED_STORAGE_KEY } from ".."
import { isBrowser } from "../utils/isBrowser.js"

export enum StorageType {
  SESSION = "session",
  LOCAL = "local",
}

const dataProtectedKeys = [LAST_CLICKED_STORAGE_KEY]

const isSessionStorage = (storageType: StorageType) => {
  return storageType === StorageType.SESSION && window.sessionStorage
}

const isLocalStorage = (storageType: StorageType) => {
  return storageType === StorageType.LOCAL && window.localStorage
}

export class KlevuStorage {
  static getItem = (key: string, storageType = StorageType.LOCAL) => {
    if (
      dataProtectedKeys.find((k) => k.includes(key)) !== undefined &&
      KlevuConfig.getDefault().isConsentDisallowed()
    ) {
      return undefined
    }
    if (isLocalStorage(storageType)) {
      return window.localStorage.getItem(key)
    }
    if (isSessionStorage(storageType)) {
      return window.sessionStorage.getItem(key)
    }
  }

  static setItem = (
    key: string,
    value: string,
    storageType = StorageType.LOCAL
  ) => {
    console.log(
      dataProtectedKeys.find((k) => k.includes(key)),
      KlevuConfig.getDefault().isConsentDisallowed(),
      isLocalStorage(storageType)
    )
    if (
      dataProtectedKeys.find((k) => k.includes(key)) !== undefined &&
      KlevuConfig.getDefault().isConsentDisallowed()
    ) {
      return
    }
    if (isLocalStorage(storageType)) {
      return window.localStorage.setItem(key, value)
    }
    if (isSessionStorage(storageType)) {
      return window.sessionStorage.setItem(key, value)
    }
  }

  static removeItem = (key: string, storageType = StorageType.LOCAL) => {
    if (
      dataProtectedKeys.find((k) => k.includes(key)) !== undefined &&
      KlevuConfig.getDefault().isConsentDisallowed()
    ) {
      return
    }
    if (isLocalStorage(storageType)) {
      return window.localStorage.removeItem(key)
    }
    if (isSessionStorage(storageType)) {
      return window.sessionStorage.removeItem(key)
    }
  }
}
