import { search, sendSearchEvent } from "@klevu/core"

// Queries needs to be shared between the client and the server.
// In this example we have configurable term and shouldSendEvent.
// Term can change dynamically in the client and server.
// Usually we do not want to send the search event more than just once when it actually happens.
// Not after every page change or again in the frontend.

export function klevuQuery(term: string, shouldSendEvent: boolean) {
  const modifiers = shouldSendEvent ? [sendSearchEvent()] : []

  return [
    search(
      term,
      {
        limit: 9,
      },
      ...modifiers
    ),
  ]
}
