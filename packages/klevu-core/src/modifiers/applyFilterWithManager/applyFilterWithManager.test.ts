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
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Apply filters with manager", async () => {
  const manager = new FilterManager()

  manager.initFromListFilters([
    {
      label: "Size",
      key: "size",
      type: KlevuFilterType.Options,
      options: [
        {
          count: 1,
          name: "size",
          value: "34",
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
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
})
