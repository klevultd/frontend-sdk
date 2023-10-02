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
  const sendAsFormData = data instanceof FormData

  const axios = KlevuConfig.getDefault().axios
  if (axios) {
    try {
      const res = await axios.post<T>(url, data, {
        headers: sendAsFormData
          ? undefined
          : {
              "Content-Type": "application/json",
            },
      })
      return res.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return error.response.data
    }
  }

  // Fetch will always return value. Even with 500 errors.
  const res = await fetch(url, {
    method: "POST",
    headers: sendAsFormData
      ? undefined
      : {
          "Content-Type": "application/json",
        },
    body: sendAsFormData ? data : JSON.stringify(data),
  })

  if (ignoreResult) {
    return undefined
  }

  return (await res.json()) as T
}
