import { KlevuConfig } from "../index.js"

export enum StorageType {
  SESSION = "session",
  LOCAL = "local",
}

const isSessionStorage = (storageType: StorageType) => {
  return (
    storageType === StorageType.SESSION &&
    typeof window !== "undefined" &&
    window.sessionStorage
  )
}

const isLocalStorage = (storageType: StorageType) => {
  return (
    storageType === StorageType.LOCAL &&
    typeof window !== "undefined" &&
    window.localStorage
  )
}

export class KlevuStorage {
  static dataProtectedKeys: string[] = []

  static addKey = (key: string) => {
    if (!this.dataProtectedKeys.find((k) => k === key))
      this.dataProtectedKeys.push(key)
  }

  static removeKey = (key: string) => {
    const keyIndex = this.dataProtectedKeys.indexOf(key)
    if (keyIndex !== -1) {
      this.dataProtectedKeys.splice(keyIndex, 1)
    }
  }

  static listKeys() {
    return this.dataProtectedKeys
  }

  static getItem = (key: string, storageType = StorageType.LOCAL) => {
    if (
      this.dataProtectedKeys.find((k) => k.includes(key)) !== undefined &&
      KlevuConfig.getDefault().isConsentDisallowed()
    ) {
      return null
    }
    if (isLocalStorage(storageType)) {
      return window.localStorage.getItem(key)
    }
    if (isSessionStorage(storageType)) {
      return window.sessionStorage.getItem(key)
    }
    return null
  }

  static setItem = (
    key: string,
    value: string,
    storageType = StorageType.LOCAL
  ) => {
    if (
      this.dataProtectedKeys.find((k) => k.includes(key)) !== undefined &&
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
      this.dataProtectedKeys.find((k) => k.includes(key)) !== undefined &&
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
