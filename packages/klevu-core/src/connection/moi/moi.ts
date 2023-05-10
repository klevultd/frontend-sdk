import { KlevuConfig, KlevuTypeOfSearch } from "../../index.js"
import { post } from "../fetch.js"

const STORAGE_KEY = "klevu-moi-session"

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

export type MoiResponseContext = {
  context: {
    klevuApiKey: string
    sessionId: string
  }
}

export type MoiResponseText = {
  message: {
    note: string | null
    type: "text"
    value: string
  }
}

export type MoiResponseFilter = {
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

export type MoiResponseGenericOptions = {
  genericOptions: {
    options: Array<{
      chat: string
      name: string
      type: "message" | "clearChat"
    }>
  }
}

export type MoiMenuOptions = {
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

export type MoiProducts = {
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

export type MoiActionsMessage = {
  actions: {
    actions: Array<{
      type: "purgeHistory" | "redirectToUrl"
      context: {
        value?: string
        link?: string
      }
    }>
  }
}

export type MoiLocalMessage = {
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
  | MoiActionsMessage

export type MoiSession = {
  query: (request: Omit<MoiRequest, "context">) => Promise<MoiResponse>
  messages: Array<
    MoiResponseText | MoiResponseFilter | MoiProducts | MoiLocalMessage
  >
  clear: () => void
  menu: MoiMenuOptions["menuOptions"]
  genericOptions: MoiResponseGenericOptions["genericOptions"]
}

type MoiSavedSession = {
  sessionId: string
  messages: MoiSession["messages"]
}

export async function startMoi({
  onMessage,
  apiKey,
  onRedirect,
}: {
  onMessage?: () => void
  apiKey?: string
  onRedirect?: (url: string) => void
} = {}): Promise<MoiSession> {
  const klevuApiKey = apiKey || KlevuConfig.getDefault().apiKey

  const storedSession = await getStoredSession()

  const result = await queryMoi({
    context: {
      klevuApiKey,
      sessionId: storedSession?.sessionId,
    },
  })

  const ctx = result?.data[0]

  if (!ctx) {
    throw new Error("No context found")
  }

  const sessionId = ctx.context.sessionId

  let startingMessages: MoiSession["messages"] = []
  if (storedSession) {
    startingMessages = storedSession.messages
  }

  const { messages, genericOptions, menu } = parseResponse(result)

  startingMessages = [...startingMessages, ...messages]

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

      // run actions first
      for (const obj of res.data) {
        if ("actions" in obj) {
          for (const action of obj.actions.actions) {
            if (action.type === "purgeHistory") {
              this.clear()
            } else if (action.type === "redirectToUrl" && action.context.link) {
              if (onRedirect) {
                onRedirect(action.context.link)
              } else {
                window.location.href = action.context.link
              }
            }
          }
        }
      }

      const { messages, genericOptions, menu } = parseResponse(res)
      this.messages = [...this.messages, ...messages]
      onMessage?.()
      this.genericOptions = genericOptions
      this.menu = menu

      saveSession({
        sessionId,
        messages: this.messages,
      })

      return res
    },
    clear() {
      this.messages = []
      saveSession({
        sessionId,
        messages: this.messages,
      })
      onMessage?.()
    },
    messages: startingMessages,
    genericOptions,
    menu,
  }
  return session
}

function getStoredSession(): MoiSavedSession | undefined {
  const storedSession = localStorage.getItem(STORAGE_KEY)
  if (!storedSession) {
    return undefined
  }

  const session = JSON.parse(storedSession) as MoiSavedSession
  return session
}

function saveSession(session: MoiSavedSession) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
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
