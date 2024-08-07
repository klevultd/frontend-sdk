import {
  KlevuFetch,
  KlevuConfig,
  applyFilterWithManager,
  listFilters,
  search,
} from "../index.js"
import {
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
  KlevuFilterType,
} from "../models/index.js"
import { FilterManager } from "./filterManager.js"
import axios from "axios"

// use as function to get always fresh copy of mock data
const mockFilterData = (): Array<
  KlevuFilterResultOptions | KlevuFilterResultSlider
> => [
  {
    type: KlevuFilterType.Options,
    key: "test",
    label: "Test",
    options: [
      {
        count: 1,
        name: "Red",
        selected: false,
        value: "red",
      },
      {
        count: 1234,
        name: "blue",
        selected: false,
        value: "blue",
      },
      {
        count: 3,
        name: "Filter with space",
        selected: false,
        value: "filter with space",
      },
    ],
  },
  {
    type: KlevuFilterType.Slider,
    key: "price",
    label: "Test price slider",
    min: "0",
    max: "10",
    start: null,
    end: null,
  },
]

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Filter manager initializes", () => {
  const manager = new FilterManager()

  expect(manager.filters.length).toBe(0)
})

test("Init from data", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  expect(manager.filters.length).toBe(2)
  expect((manager.filters[0] as KlevuFilterResultOptions).options.length).toBe(
    3
  )
})

test("Toggling works", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.toggleOption("test", "red")
  const changedOption = (
    manager.filters.find((o) => o.key === "test") as KlevuFilterResultOptions
  ).options.find((o) => o.value === "red")
  expect(changedOption?.selected).toBe(true)
})

test("Clearing selection works", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.toggleOption("test", "red")
  manager.clearOptionSelections()
  const changedOption = (
    manager.filters.find((o) => o.key === "test") as KlevuFilterResultOptions
  ).options.find((o) => o.value === "red")
  expect(changedOption?.selected).toBe(false)

  manager.toggleOption("test", "red")
  manager.clearOptionSelections("foobar")
  const changedOption2 = (
    manager.filters.find((o) => o.key === "test") as KlevuFilterResultOptions
  ).options.find((o) => o.value === "red")
  expect(changedOption2?.selected).toBe(true)
})

test("Clearing works", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.clear()
  expect(manager.filters.length).toBe(0)
})

test("Test slider settings", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  manager.updateSlide("price", 7, 8)

  const slider = manager.filters.find(
    (f) => f.type === KlevuFilterType.Slider
  ) as KlevuFilterResultSlider

  expect(slider).toMatchObject({
    start: "7",
    end: "8",
  })
})

test("Current selection method", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  manager.toggleOption("test", "red")
  expect(manager.currentSelection("test")).toEqual(["red"])
})

test("Apply filters", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  manager.toggleOption("test", "red")
  manager.updateSlide("price", 3, 7)
  const filters = manager.toApplyFilters()

  expect(filters[0].values).toEqual(["red"])
  expect(filters[1].values).toEqual(["3", "7"])
})

test("Save and restore state", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.toggleOption("test", "red")

  const state = manager.getCurrentState()

  const anotherManager = new FilterManager(state)
  expect(manager.filters).toEqual(anotherManager.filters)

  manager.clear()

  expect(manager.filters).not.toEqual(anotherManager.filters)

  manager.setState(state)
  expect(manager.filters).toEqual(anotherManager.filters)
})

test("Test URL param settings", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.selectOption("test", "red")
  manager.updateSlide("price", 3, 7)

  expect(manager.toURLParams()).toBe("o_test=red&s_price=3-7")

  manager.readFromURLParams(
    new URLSearchParams("o_test=red%2Cblue&s_price=6-9")
  )

  const slider = manager.filters.find(
    (f) => f.type === KlevuFilterType.Slider
  ) as KlevuFilterResultSlider

  expect(slider).toMatchObject({
    start: "6",
    end: "9",
  })

  const option = manager.filters.find(
    (f) => f.type === KlevuFilterType.Options
  ) as KlevuFilterResultOptions

  expect(option.options[0].selected).toBe(true)
  expect(option.options[1].selected).toBe(true)

  expect(manager.toURLParams()).toBe("o_test=red%2Cblue&s_price=6-9")
})

test("Test URL param settings with existing data", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.selectOption("test", "red")
  manager.selectOption("test", "filter with space")
  manager.updateSlide("price", 3, 7)

  const output = manager.toURLParams(
    new URLSearchParams(
      "?o_test=blue&foo=bar&o_doestnexist=foobar&s_doesntsxist=0-10"
    )
  )
  expect(output).toContain("o_test=red%2Cfilter+with+space")
  expect(output).toContain("s_price=3-7")
  expect(output).not.toContain("o_doesntexist")
  expect(output).not.toContain("s_doesntexist")

  manager.readFromURLParams(
    new URLSearchParams("o_test=red%2Cblue%2Cfilter+with+space&s_price=6-9")
  )

  const slider = manager.filters.find(
    (f) => f.type === KlevuFilterType.Slider
  ) as KlevuFilterResultSlider

  expect(slider).toMatchObject({
    start: "6",
    end: "9",
  })

  const option = manager.filters.find(
    (f) => f.type === KlevuFilterType.Options
  ) as KlevuFilterResultOptions

  expect(option.options[0].selected).toBe(true)
  expect(option.options[1].selected).toBe(true)
  expect(option.options[2].selected).toBe(true)

  expect(manager.toURLParams()).toBe(
    "o_test=red%2Cblue%2Cfilter+with+space&s_price=6-9"
  )
})

test("Test URL param reading when there is not initialized", () => {
  const manager = new FilterManager()
  manager.readFromURLParams(new URLSearchParams("o_test=red&s_price=6-9"))

  const option = manager.filters.find(
    (f) => f.type === KlevuFilterType.Options
  ) as KlevuFilterResultOptions

  expect(option.options.find((o) => o.value === "red")?.selected).toBe(true)

  const slider = manager.filters.find(
    (f) => f.type === KlevuFilterType.Slider
  ) as KlevuFilterResultSlider

  expect(slider).toMatchObject({
    start: "6",
    end: "9",
  })
})

test("Test URL params with request", async () => {
  const manager = new FilterManager()
  manager.readFromURLParams(new URLSearchParams("o_color=grey"))
  const result = await KlevuFetch(
    search(
      "hoodies",
      {},
      listFilters({ filterManager: manager }),
      applyFilterWithManager(manager)
    )
  )

  expect(
    (
      result
        .queriesById("search")
        ?.filters?.find((f) => f.key == "color") as KlevuFilterResultOptions
    ).options.find((o) => o.value == "grey")?.selected
  ).toBe(true)

  expect(
    (
      manager.filters.find((f) => f.key === "color") as KlevuFilterResultOptions
    ).options.find((o) => o.value === "grey")?.selected
  ).toBe(true)

  expect(manager.filters.length).toBeGreaterThan(1)
})

test("Deprecated properties still work", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  expect(manager.options.length).toBe(1)
  expect(manager.options[0].options.length).toBe(3)

  expect(manager.sliders.length).toBe(1)
})

test("Selected filters are correctly applied", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  const result = manager.selectedFilters()

  expect(result.length).toBe(0)

  manager.toggleOption("test", "red")
  manager.updateSlide("price", 3, 7)

  const result2 = manager.selectedFilters()

  expect(result2.length).toBe(2)
  expect(result2[0]).toMatchObject({
    key: "test",
    value: "red",
    label: "Test",
    type: KlevuFilterType.Options,
  })
  expect(result2[1]).toMatchObject({
    key: "price",
    value: "3-7",
    label: "Test price slider",
    type: KlevuFilterType.Slider,
  })
})
