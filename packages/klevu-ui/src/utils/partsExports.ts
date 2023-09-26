import { parts } from "./parts"

export function partsExports(tagName: keyof typeof parts) {
  const subParts = Object.values(parts[tagName].exportedcomponents).flat()
  return [...parts[tagName].local, ...subParts].join(",")
}
