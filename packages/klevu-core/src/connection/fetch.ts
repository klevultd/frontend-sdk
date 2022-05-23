import { KlevuConfig } from "../config.js"

export async function get<T>(url: string): Promise<T> {
  if (KlevuConfig.default.axios) {
    return (await KlevuConfig.default.axios.get<T>(url)).data
  }

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post<T>(url: string, data: any): Promise<T> {
  if (KlevuConfig.default.axios) {
    return await KlevuConfig.default.axios
      .post<T>(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
  }

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
}
