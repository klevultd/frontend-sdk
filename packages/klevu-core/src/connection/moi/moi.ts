import { KlevuConfig, KlevuTypeOfSearch } from "../../index.js"
import { post } from "../fetch.js"

export type MoiRequest = {
  context: {
    klevuApiKey: string
    sessionId?: string
  }
  message?: string
  filter?: {
    value: string
  }
  product?: {
    context: {
      url: string
    }
    id: string
    intent: string
  }
}

export type MoiResponse = {
  data: [MoiResponseContext, ...MoiResponseObjects[]]
}

type MoiResponseContext = {
  context: {
    klevuApiKey: string
    sessionId: string
  }
}

type MoiResponseText = {
  message: {
    note: string | null
    type: "text"
    value: string
  }
}

type MoiResponseFilter = {
  filter: {
    note: string | null
    options: Array<{
      count: string
      name: string
      selected: boolean | null
      value: string
    }>
    settings: {
      chatFormat: string
      chatFormatEmpty: string
      key: string | null
      label: string | null
    }
  }
}

type MoiResponseGenericOptions = {
  genericOptions: {
    options: Array<{
      chat: string
      name: string
      type: "message" | "clearChat"
    }>
  }
}

type MoiMenuOptions = {
  menuOptions: {
    options: Array<{
      name: string
      chat: string
      options: Array<{
        key: string
        validations: string
        value: string
      }>
      type: "message" | "customerSupport"
    }>
  }
}

type MoiProducts = {
  productData: {
    note: string | null
    totalResultsFound: string
    typeOfQuery: KlevuTypeOfSearch // is in lowercase -- fix the backend
    products: Array<{
      id: string
      currency: string
      image: string
      itemGroupId: string
      name: string
      noOfVariants: number
      options: Array<{
        chat: string
        intent: string
        name: string
      }>
      originalContent: null | string
      price: string
      salePrice: string
      shortDesc: string
      url: string
    }>
  }
}

type MoiLocalMessage = {
  local: {
    message: string
  }
}

export type MoiResponseObjects =
  | MoiResponseText
  | MoiResponseFilter
  | MoiResponseGenericOptions
  | MoiMenuOptions
  | MoiProducts

export type MoiSession = {
  query: (request: Omit<MoiRequest, "context">) => Promise<MoiResponse>
  messages: Array<
    MoiResponseText | MoiResponseFilter | MoiProducts | MoiLocalMessage
  >
  clear: () => void
  menu: MoiMenuOptions["menuOptions"]
  genericOptions: MoiResponseGenericOptions["genericOptions"]
}

export async function startMoi(onMessage?: () => void): Promise<MoiSession> {
  // const klevuApiKey = KlevuConfig.getDefault().apiKey
  const klevuApiKey = "klevu-156934068344410779"
  const result = await queryMoi({
    context: {
      klevuApiKey,
    },
  })

  const ctx = result?.data[0]

  if (!ctx) {
    throw new Error("No context found")
  }

  const sessionId = ctx.context.sessionId

  const { messages, genericOptions, menu } = parseResponse(result)

  const session: MoiSession = {
    async query(request) {
      if (request.message) {
        this.messages = [
          ...this.messages,
          { local: { message: request.message } },
        ]
        onMessage?.()
      }

      const res = await queryMoi({
        ...request,
        context: {
          klevuApiKey,
          sessionId,
        },
      })

      if (!res) {
        throw new Error("No response from MOI")
      }

      const { messages, genericOptions, menu } = parseResponse(res)
      this.messages = [...this.messages, ...messages]
      onMessage?.()
      this.genericOptions = genericOptions
      this.menu = menu

      return res
    },
    clear() {
      this.messages = []
      onMessage?.()
    },
    messages,
    genericOptions,
    menu,
  }
  return session
}

async function queryMoi(request: MoiRequest) {
  return await post<MoiResponse>(
    `${KlevuConfig.getDefault().moiApiUrl}chat/send`,
    request
  )
}

function parseResponse(response: MoiResponse) {
  const messages: Array<MoiResponseText | MoiResponseFilter | MoiProducts> = []
  let genericOptions: MoiResponseGenericOptions["genericOptions"] | undefined =
    undefined
  let menu: MoiMenuOptions["menuOptions"] | undefined = undefined
  for (const d of response.data) {
    "message" in d && messages.push(d)
    "filter" in d && messages.push(d)
    "productData" in d && messages.push(d)

    if ("genericOptions" in d) {
      genericOptions = d.genericOptions
    }
    if ("menuOptions" in d) {
      menu = d.menuOptions
    }
  }

  if (!menu || !genericOptions) {
    throw new Error("No menu or generic options found")
  }

  return {
    messages,
    menu,
    genericOptions,
  }
}
