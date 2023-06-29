import { KlevuConfig, KlevuTypeOfSearch } from "../../index.js"
import { post } from "../fetch.js"

const STORAGE_KEY = "klevu-moi-session"

export type MoiContext = {
  klevuApiKey: string
  sessionId?: string
  mode?: MoiChatModes
  url?: string
  productId?: string
  pqaWidgetId?: string
}

export type MoiRequest = {
  context: MoiContext
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
    thumbs?: "UP" | "DOWN"
    reason?: string
  }
}

export type MoiResponse = {
  data: [MoiResponseContext, ...MoiResponseObjects[]]
}

export type MoiResponseContext = {
  context: MoiContext
}

export type MoiResponseText = {
  message: {
    id: string
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
      type: "purgeHistory" | "redirectToUrl" | "askFeedbackReason"
      context: {
        messageId?: string
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

export type MoiChatModes = "PQA"

export type MoiSavedFeedback = {
  id: string
  thumbs: "up" | "down"
}

type MoiSavedSession = {
  context: MoiContext
  genericOptions: MoiResponseGenericOptions["genericOptions"]
  menu: MoiMenuOptions["menuOptions"]
  messages: MoiSession["messages"]
  feedbacks: MoiSavedFeedback[]
}

type MoiSavedLocalStorage = Partial<MoiSavedSession> & {
  modes?: {
    PQA?: {
      [url: string]: MoiSavedSession
    }
  }
}

export type MoiStartOptions = {
  /**
   * Called when a message is received from Moi
   *
   * @returns
   */
  onMessage?: () => void
  /**
   * Custom redirect handler
   * @param url
   * @returns
   */
  onRedirect?: (url: string) => void
  /**
   * Action listener for actions
   * @param action
   * @returns if false will prevent the default action
   */
  onAction?: (
    action: MoiActionsMessage["actions"]["actions"][number]
  ) => boolean | void
  /**
   * Override the config
   */
  configOverride?: KlevuConfig
  /**
   * The mode to use. If undefined will use the default Moi mode
   */
  mode?: MoiChatModes
  /**
   * URL for the PQA application
   */
  url?: string
  /**
   * productId for the PQA application
   */
  productId?: string
  /**
   * PQA widgetId for the PQA application
   */
  pqaWidgetId?: string
}

export async function startMoi(
  options: MoiStartOptions = {}
): Promise<MoiSession> {
  const config = options.configOverride || KlevuConfig.getDefault()
  let startingMessages: MoiMessages = []

  let ctx: MoiContext = {
    klevuApiKey: config.apiKey,
    sessionId: "",
    mode: options.mode,
    url: options.url,
    productId: options.url,
    pqaWidgetId: options.pqaWidgetId,
  }
  const storedSession = await getStoredSession(ctx)
  let menu: MoiMenuOptions["menuOptions"]
  let genericOptions: MoiResponseGenericOptions["genericOptions"]
  let feedbacks: MoiSavedFeedback[] = []
  if (storedSession?.context) {
    ctx = storedSession.context
    startingMessages = storedSession.messages
    menu = storedSession.menu
    genericOptions = storedSession.genericOptions
    feedbacks = storedSession.feedbacks
  } else {
    const result = await queryMoi(
      {
        context: {
          klevuApiKey: config.apiKey,
          sessionId: storedSession?.context.sessionId,
          mode: options.mode,
          url: options.url,
          productId: options.productId,
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

  return new MoiSession(
    {
      feedbacks,
      messages: startingMessages,
      menu,
      genericOptions,
    },
    options,
    ctx,
    config
  )
}

export class MoiSession {
  constructor(
    state: {
      messages: MoiMessages
      menu: MoiMenuOptions["menuOptions"]
      genericOptions: MoiResponseGenericOptions["genericOptions"]
      feedbacks: MoiSavedFeedback[]
    },
    options: MoiStartOptions,
    context: MoiContext,
    config: KlevuConfig
  ) {
    this.messages = state.messages
    this.menu = state.menu
    this.genericOptions = state.genericOptions
    this.feedbacks = state.feedbacks ?? []
    this.options = options
    this.context = context
    this.config = config
  }

  messages: MoiMessages
  menu: MoiMenuOptions["menuOptions"]
  genericOptions?: MoiResponseGenericOptions["genericOptions"]
  feedbacks: MoiSavedFeedback[]
  options: MoiStartOptions
  context: MoiContext
  config: KlevuConfig

  async query(
    request: Omit<MoiRequest, "context">,
    target?: MoiAPITarget
  ): Promise<MoiResponse> {
    if (request.message) {
      this.messages = [
        ...(this.messages ?? []),
        { local: { message: request.message } },
      ]
      this.options.onMessage?.()
    }

    const res = await queryMoi(
      {
        context: this.context,
        ...request,
      },
      this.config,
      target
    )

    if (!res) {
      throw new Error("No response from MOI")
    }

    // run actions first
    for (const obj of res.data) {
      if ("actions" in obj) {
        for (const action of obj.actions.actions) {
          //notify listeners if they want to do something
          const response = this.options.onAction?.(action)

          // allow listeners to cancel the default actions
          if (response === false) {
            continue
          }

          if (action.type === "purgeHistory") {
            this.clear()
          } else if (action.type === "redirectToUrl" && action.context.link) {
            if (this.options.onRedirect) {
              this.options.onRedirect(action.context.link)
            } else {
              window.location.href = action.context.link
            }
          }
        }
      }
    }

    const { messages, genericOptions, menu } = parseResponse(res)
    this.messages = [...this.messages, ...messages]
    this.options.onMessage?.()
    this.genericOptions = genericOptions
    this.menu = menu

    this.save()

    return res
  }
  clear() {
    this.messages = []
    this.feedbacks = []
    this.save()
    this.options.onMessage?.()
  }
  save() {
    saveSession({
      context: this.context,
      menu: this.menu,
      genericOptions: this.genericOptions,
      messages: this.messages,
      feedbacks: this.feedbacks,
    })
  }
  async addFeedback(messageId: string, thumbs: "up" | "down") {
    this.feedbacks.push({ id: messageId, thumbs })
    return this.query(
      {
        feedback: {
          messageId,
          thumbs: thumbs.toUpperCase() as "UP" | "DOWN",
        },
      },
      "feedback"
    )
  }
}

function getStoredSession(ctx: MoiContext): MoiSavedSession | undefined {
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
        feedbacks: session.feedbacks ?? [],
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
      if (session.modes["PQA"] && ctx.url && session.modes["PQA"][ctx.url]) {
        return session.modes["PQA"][ctx.url]
      } else if (
        session.modes["PQA"] &&
        ctx.productId &&
        session.modes["PQA"][ctx.productId]
      ) {
        return session.modes["PQA"][ctx.productId]
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

  const key = session.context.url || session.context.productId

  switch (session.context.mode) {
    case undefined:
      parsed.context = session.context
      parsed.messages = session.messages
      parsed.menu = session.menu
      parsed.genericOptions = session.genericOptions
      parsed.feedbacks = session.feedbacks
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
      if (!key) {
        throw new Error("No url or productId")
      }
      parsed.modes.PQA[key] = session
      break
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
}

type MoiAPITarget = "send" | "feedback"

async function queryMoi(
  request: MoiRequest,
  config: KlevuConfig,
  target: MoiAPITarget = "send"
) {
  return await post<MoiResponse>(`${config.moiApiUrl}chat/${target}`, request)
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
