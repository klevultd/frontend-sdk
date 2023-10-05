import en from "../translations/en.json"

type TranslationKeys = typeof en

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], any>> : never
    }[keyof T]
  : ""

export function getTranslation(key: Paths<TranslationKeys, 10>): string {
  const keys = key.split(".")
  let value = window.klevu_ui_translations || en

  for (const key of keys) {
    if (value.hasOwnProperty(key)) {
      // @ts-ignore
      value = value[key]
    } else {
      console.error(`Translation "${key}" not found`)
      return key
    }
  }

  return value as any
}
