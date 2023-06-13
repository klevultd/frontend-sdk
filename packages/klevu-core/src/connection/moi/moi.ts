import { KlevuConfig, KlevuTypeOfSearch } from "../../index.js"
import type { PartialK } from "../../utils/partialK.js"
import { post } from "../fetch.js"

const STORAGE_KEY = "klevu-moi-session"

export type MoiContext = {
  klevuApiKey: string
  sessionId: string
  mode: MoiChatModes
  url: string
}

export type MoiRequest = {
  context: PartialK<MoiContext, "sessionId" | "mode" | "url">
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
  feedback?: {
    messageId: string
    thumbs?: "up" | "down"
    reason?: string
  }
}

export type MoiResponse = {
  data: [MoiResponseContext, ...MoiResponseObjects[]]
}

export type MoiResponseContext = {
  context: PartialK<MoiContext, "mode" | "url">
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
  genericOptions?: {
    options: Array<{
      chat: string
      name: string
      type: "message" | "clearChat"
    }>
  }
}

export type MoiMenuOptions = {
  menuOptions?: {
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
    products: MoiProduct[]
  }
}

export type MoiProduct = {
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

export type MoiMessages = Array<
  MoiResponseText | MoiResponseFilter | MoiProducts | MoiLocalMessage
>

export type MoiSession = {
  query: (request: Omit<MoiRequest, "context">) => Promise<MoiResponse>
  messages: MoiMessages
  clear: () => void
  menu: MoiMenuOptions["menuOptions"]
  genericOptions: MoiResponseGenericOptions["genericOptions"]
}

export type MoiChatModes = "PQA"

type MoiSavedSession = {
  context: PartialK<MoiContext, "url" | "mode">
  genericOptions: MoiResponseGenericOptions["genericOptions"]
  menu: MoiMenuOptions["menuOptions"]
  messages: MoiSession["messages"]
}

type MoiSavedLocalStorage = Partial<MoiSavedSession> & {
  modes?: {
    PQA?: {
      [url: string]: MoiSavedSession
    }
  }
}

export async function startMoi({
  onMessage,
  onRedirect,
  configOverride,
  mode,
  url,
}: {
  onMessage?: () => void
  onRedirect?: (url: string) => void
  configOverride?: KlevuConfig
  mode?: MoiChatModes
  url?: string
} = {}): Promise<MoiSession> {
  const config = configOverride || KlevuConfig.getDefault()
  let startingMessages: MoiMessages = []

  let ctx: PartialK<MoiContext, "mode" | "url"> = {
    klevuApiKey: config.apiKey,
    sessionId: "",
    mode,
    url,
  }
  const storedSession = await getStoredSession(ctx)
  let menu: MoiMenuOptions["menuOptions"]
  let genericOptions: MoiResponseGenericOptions["genericOptions"]
  if (storedSession?.context) {
    ctx = storedSession.context
    startingMessages = storedSession.messages
    menu = storedSession.menu
    genericOptions = storedSession.genericOptions
  } else {
    const result = await queryMoi(
      {
        context: {
          klevuApiKey: config.apiKey,
          sessionId: storedSession?.context.sessionId,
          mode,
          url,
        },
      },
      config
    )

    if (!result?.data[0].context) {
      throw new Error("No context found")
    }

    ctx = result.data[0].context

    const parsed = parseResponse(result)
    startingMessages = parsed.messages
    menu = parsed.menu
    genericOptions = parsed.genericOptions
  }

  const session: MoiSession = {
    async query(request) {
      if (request.message) {
        this.messages = [
          ...this.messages,
          { local: { message: request.message } },
        ]
        onMessage?.()
      }

      const res = await queryMoi(
        {
          context: ctx,
          ...request,
        },
        config
      )

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        context: ctx!,
        menu: this.menu,
        genericOptions: this.genericOptions,
        messages: this.messages,
      })

      return res
    },
    clear() {
      this.messages = []
      saveSession({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        context: ctx!,
        menu: this.menu,
        genericOptions: this.genericOptions,
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

function getStoredSession(
  ctx: PartialK<MoiContext, "url" | "mode" | "sessionId">
): MoiSavedSession | undefined {
  const storedSession = localStorage.getItem(STORAGE_KEY)
  if (!storedSession) {
    return undefined
  }

  const session = JSON.parse(storedSession) as MoiSavedLocalStorage

  if (!ctx.mode && session.context) {
    if (session.context) {
      return {
        context: session.context,
        genericOptions: session.genericOptions,
        menu: session.menu,
        messages: session.messages ?? [],
      }
    }
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!session.modes || !session.modes[ctx.mode!]) {
    return undefined
  }

  switch (ctx.mode) {
    case "PQA":
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (session.modes["PQA"] && session.modes["PQA"][ctx.url!]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return session.modes["PQA"][ctx.url!]
      }
      break
  }

  return undefined
}

function saveSession(session: MoiSavedSession) {
  const saved = localStorage.getItem(STORAGE_KEY)
  let parsed: MoiSavedLocalStorage = {}
  if (saved) {
    parsed = JSON.parse(saved) as MoiSavedLocalStorage
  }

  switch (session.context.mode) {
    case undefined:
      parsed.context = session.context
      parsed.messages = session.messages
      parsed.menu = session.menu
      parsed.genericOptions = session.genericOptions
      break
    case "PQA":
      if (!parsed.modes) {
        parsed.modes = {
          PQA: {},
        }
      }
      if (!parsed.modes.PQA) {
        parsed.modes.PQA = {}
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      parsed.modes.PQA[session.context.url!] = session
      break
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
}

async function queryMoi(request: MoiRequest, config: KlevuConfig) {
  return await post<MoiResponse>(`${config.moiApiUrl}chat/send`, request)
}

function parseResponse(response: MoiResponse) {
  const messages: MoiMessages = []
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

  return {
    messages,
    menu,
    genericOptions,
  }
}
