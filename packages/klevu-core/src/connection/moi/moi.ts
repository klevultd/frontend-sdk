import {
  KlevuBaseQuerySettings,
  KlevuConfig,
  KlevuTypeOfSearch,
} from "../../index.js"
import { KlevuStorage } from "../../utils/storage.js"
import { post } from "../fetch.js"

const STORAGE_KEY = "klevu-moi-session"
const MAX_MESSAGES = 10

export type MoiContext = {
  klevuApiKey: string
  sessionId?: string
  visitorId?: string
  mode?: MoiChatModes
  url?: string
  productId?: string
  pqaWidgetId?: string
  additionalData?: string
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
  klevuSettings?: Omit<KlevuBaseQuerySettings, "query">
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
    collectFeedback?: boolean
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

export type MoiQuestionsResponse = {
  questions: {
    options: MoiQuestion[]
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
  | MoiQuestionsResponse

export type MoiQuestion = string

export type MoiMessages = Array<
  MoiResponseText | MoiResponseFilter | MoiProducts | MoiLocalMessage
>

export type MoiChatModes = "PQA"

export type MoiSavedFeedback = {
  id: string
  thumbs: "up" | "down"
  reason?: string
}

type MoiSavedSessionState = {
  genericOptions: MoiResponseGenericOptions["genericOptions"]
  menu: MoiMenuOptions["menuOptions"]
  messages: MoiSession["messages"]
  feedbacks: MoiSavedFeedback[]
}

type MoiSavedSession = {
  context: MoiContext
  MOI?: MoiSavedSessionState
  PQA?: {
    [urlOrProductId: string]: MoiSavedSessionState & {
      questions: MoiQuestion[]
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
  /**
   * To pass additional information to the api as string
   */
  additionalData?: string
  settings?: {
    /**
     * Override the config
     */
    configOverride?: KlevuConfig

    /**
     * Always sends the initial message to Moi even if there are no messages stored for that case
     */
    alwaysStartConversation?: boolean
  }
}

export async function startMoi(
  options: MoiStartOptions = {}
): Promise<MoiSession> {
  const config = options.settings?.configOverride || KlevuConfig.getDefault()
  let startingMessages: MoiMessages = []
  let questions: MoiQuestion[] = []

  let ctx: MoiContext = {
    klevuApiKey: config.apiKey,
    sessionId: "",
    visitorId: "",
    mode: options.mode,
    url: options.url,
    productId: options.productId,
    pqaWidgetId: options.pqaWidgetId,
    additionalData: options.additionalData,
  }
  const storedSession = await getStoredSession()

  let menu: MoiMenuOptions["menuOptions"]
  let genericOptions: MoiResponseGenericOptions["genericOptions"]
  let feedbacks: MoiSavedFeedback[] = []
  let shouldSendMessage = options.settings?.alwaysStartConversation
  const PQAKey = options.productId || options.url

  if (storedSession && storedSession.context) {
    switch (options.mode) {
      case undefined:
        ctx.sessionId = storedSession.context.sessionId
        ctx.visitorId = storedSession.context.visitorId
        if (storedSession.MOI) {
          startingMessages = storedSession.MOI.messages
          menu = storedSession.MOI.menu
          genericOptions = storedSession.MOI.genericOptions
          feedbacks = storedSession.MOI.feedbacks

          if (options.settings?.alwaysStartConversation) {
            shouldSendMessage = storedSession.MOI.messages.length === 0
          }
        }
        break
      case "PQA":
        ctx.sessionId = storedSession.context.sessionId
        ctx.visitorId = storedSession.context.visitorId
        if (PQAKey && storedSession.PQA && storedSession.PQA[PQAKey]) {
          startingMessages = storedSession.PQA[PQAKey].messages
          menu = storedSession.PQA[PQAKey].menu
          genericOptions = storedSession.PQA[PQAKey].genericOptions
          feedbacks = storedSession.PQA[PQAKey].feedbacks
          questions = storedSession.PQA[PQAKey].questions || []

          if (options.settings?.alwaysStartConversation) {
            shouldSendMessage = storedSession.PQA[PQAKey].messages.length === 0
          }
        }
    }
  }

  if (shouldSendMessage) {
    const result = await queryMoi(
      {
        context: ctx,
      },
      config
    )

    if (!result?.data[0].context) {
      throw new Error("No context found")
    }

    const parsed = parseResponse(result)
    ctx = parsed.context
    startingMessages = parsed.messages
    menu = parsed.menu
    genericOptions = parsed.genericOptions
    questions = parsed.questions || []
  }

  return new MoiSession(
    {
      feedbacks,
      messages: startingMessages,
      questions,
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
      questions: MoiQuestion[]
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
    this.questions = state.questions
    this.menu = state.menu
    this.genericOptions = state.genericOptions
    this.feedbacks = state.feedbacks ?? []
    this.options = options
    this.context = context
    this.config = config

    if (this.context.url && this.context.productId) {
      throw new Error("Cannot set both url and productId for PQA")
    }

    this.save()
  }

  messages: MoiMessages
  questions: MoiQuestion[]
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

    const { messages, genericOptions, menu, context, questions } =
      parseResponse(res)
    this.messages = [...this.messages, ...messages]
    if (this.messages.length > MAX_MESSAGES) {
      this.messages.shift()
    }
    this.questions = [...questions]
    this.options.onMessage?.()
    this.genericOptions = genericOptions
    this.menu = menu
    this.context = context

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
    const PQAkey = this.context.productId || this.context.url

    switch (this.context.mode) {
      case undefined:
        saveSession({
          context: this.context,
          MOI: {
            menu: this.menu,
            genericOptions: this.genericOptions,
            messages: this.messages,
            feedbacks: this.feedbacks,
          },
        })
        break
      case "PQA":
        if (!PQAkey) {
          throw new Error("Cannot save PQA session without url or productId")
        }

        saveSession({
          context: this.context,
          PQA: {
            [PQAkey]: {
              menu: this.menu,
              genericOptions: this.genericOptions,
              messages: this.messages,
              feedbacks: this.feedbacks,
              questions: this.questions || [],
            },
          },
        })
    }
  }
  async addFeedback(messageId: string, thumbs: "up" | "down", reason?: string) {
    const oldFeedback = this.feedbacks.find((f) => f.id === messageId)
    if (oldFeedback) {
      oldFeedback.thumbs = thumbs
      oldFeedback.reason = reason
    } else {
      this.feedbacks.push({ id: messageId, thumbs, reason })
    }

    return this.query(
      {
        feedback: {
          messageId,
          thumbs: thumbs.toUpperCase() as "UP" | "DOWN",
          reason,
        },
      },
      "feedback"
    )
  }
}

function getStoredSession(): MoiSavedSession | undefined {
  const storedSession = KlevuStorage.getItem(STORAGE_KEY)
  if (!storedSession) {
    return undefined
  }

  return JSON.parse(storedSession) as MoiSavedSession
}

function saveSession(session: MoiSavedSession) {
  const saved = KlevuStorage.getItem(STORAGE_KEY)
  let parsed: Partial<MoiSavedSession> = {}
  if (saved) {
    parsed = JSON.parse(saved) as MoiSavedSession
  }

  const key = session.context.productId || session.context.url

  switch (session.context.mode) {
    case undefined:
      parsed.context = session.context
      parsed.MOI = session.MOI
      break
    case "PQA":
      parsed.context = session.context

      if (!parsed.PQA) {
        parsed.PQA = {}
      }

      if (!key || !session.PQA) {
        throw new Error("No url, productId or PQA session")
      }
      parsed.PQA[key] = session.PQA[key]
      break
  }

  KlevuStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
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
  const questions: MoiQuestion[] = []
  let genericOptions: MoiResponseGenericOptions["genericOptions"] | undefined =
    undefined
  let menu: MoiMenuOptions["menuOptions"] | undefined = undefined
  const context: MoiContext = response.data[0].context

  for (const d of response.data) {
    "message" in d && messages.push(d)
    "filter" in d && messages.push(d)
    "productData" in d && messages.push(d)
    "questions" in d && questions.push(...(d.questions?.options || []))

    if ("genericOptions" in d) {
      genericOptions = d.genericOptions
    }
    if ("menuOptions" in d) {
      menu = d.menuOptions
    }
  }

  return {
    context,
    messages,
    menu,
    genericOptions,
    questions,
  }
}
