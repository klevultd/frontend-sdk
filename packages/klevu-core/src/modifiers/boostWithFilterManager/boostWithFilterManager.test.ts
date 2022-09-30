import {
  KlevuConfig,
  KlevuFetch,
  search,
  FilterManager,
  KlevuFilterType,
  boostWithFilterManager,
} from "../../index.js"
import axios from "axios"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Boost filters with manager", async () => {
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
      boostWithFilterManager(manager, [
        {
          key: "Badge",
          weight: 100,
        },
      ])
    )
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records[0].id === "36800417988762")
})
