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
    ],
  },
  {
    type: KlevuFilterType.Slider,
    key: "price",
    label: "Test price slider",
    min: "0",
    max: "10",
    start: "3",
    end: "7",
  },
]

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
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
    2
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
  manager.readFromURLParams(new URLSearchParams("o_color=Anthracite"))
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
    ).options.find((o) => o.value == "Anthracite")?.selected
  ).toBe(true)

  expect(
    (
      manager.filters.find((f) => f.key === "color") as KlevuFilterResultOptions
    ).options.find((o) => o.value === "Anthracite")?.selected
  ).toBe(true)

  expect(manager.filters.length).toBeGreaterThan(1)
})

test("Deprecated properties still work", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  expect(manager.options.length).toBe(1)
  expect(manager.options[0].options.length).toBe(2)

  expect(manager.sliders.length).toBe(1)
})
