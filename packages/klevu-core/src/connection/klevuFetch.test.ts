import { KlevuConfig, KlevuFetch, search } from "../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Two searches should work", async () => {
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    }),
    search("shirts", {
      id: "test2",
    })
  )

  const query = result.queriesById("test")
  const query2 = result.queriesById("test2")

  expect(query).toBeDefined()
  expect(query?.searchClickEvent).toBeDefined()

  expect(query2).toBeDefined()
  expect(query2?.searchClickEvent).toBeDefined()
})

test("Should fail when trying two searches with same id", async () => {
  try {
    await KlevuFetch(
      search("hoodies", {
        id: "test",
      }),
      search("shirts", {
        id: "test",
      })
    )
    expect(false).toBe(true)
  } catch (e: any) {
    expect(e.message).toBe(
      "Duplicate ids in request. Please provider unique ids for requests"
    )
  }
})
