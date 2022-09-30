import {
  KlevuConfig,
  KlevuFetch,
  search,
  applyFilterWithManager,
  FilterManager,
  KlevuFilterType,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Apply filters with manager", async () => {
  const manager = new FilterManager()

  manager.initFromListFilters([
    {
      label: "Type",
      key: "type",
      type: KlevuFilterType.Options,
      options: [
        {
          count: 1,
          name: "Badge",
          value: "Badge",
          selected: true,
        },
      ],
    },
  ])

  const result = await KlevuFetch(
    search(
      "*",
      {
        id: "test",
      },
      applyFilterWithManager(manager)
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBe(1)
  expect(result.queriesById("test")?.records[0].id === "36800417988762")
})
