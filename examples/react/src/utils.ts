import { capitalize } from "@mui/material"

export const getCategoryLabel = (category: string) => {
  return category
    .split(";")
    .map((r) => capitalize(r))
    .join(" > ")
}
