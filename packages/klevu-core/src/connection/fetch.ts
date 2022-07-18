import { KlevuConfig } from "../config.js"

export async function get<T>(
  url: string,
  ignoreResult = false
): Promise<T | undefined> {
  const axios = KlevuConfig.getDefault().axios
  if (axios) {
    return (await axios.get<T>(url)).data
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (ignoreResult) {
    return undefined
  }

  return (await res.json()) as T
}

export async function post<T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  ignoreResult = false
): Promise<T | undefined> {
  const axios = KlevuConfig.getDefault().axios
  if (axios) {
    return await axios
      .post<T>(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (ignoreResult) {
    return undefined
  }

  return (await res.json()) as T
}
