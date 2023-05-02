import {
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
  KlevuFilterType,
} from "../models/index.js"
import { FilterManager } from "./filterManager.js"

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
  manager.toggleOption("test", "Red")
  const changedOption = (
    manager.filters.find((o) => o.key === "test") as KlevuFilterResultOptions
  ).options.find((o) => o.name === "Red")
  expect(changedOption?.selected).toBe(true)
})

test("Clearing selection works", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.toggleOption("test", "Red")
  manager.clearOptionSelections()
  const changedOption = (
    manager.filters.find((o) => o.key === "test") as KlevuFilterResultOptions
  ).options.find((o) => o.name === "Red")
  expect(changedOption?.selected).toBe(false)

  manager.toggleOption("test", "Red")
  manager.clearOptionSelections("foobar")
  const changedOption2 = (
    manager.filters.find((o) => o.key === "test") as KlevuFilterResultOptions
  ).options.find((o) => o.name === "Red")
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

  manager.toggleOption("test", "Red")
  expect(manager.currentSelection("test")).toEqual(["red"])
})

test("Apply filters", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  manager.toggleOption("test", "Red")
  const filters = manager.toApplyFilters()

  expect(filters[0].values).toEqual(["red"])
  expect(filters[1].values).toEqual(["3", "7"])
})

test("Save and restore state", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.toggleOption("test", "Red")

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
  manager.selectOption("test", "Red")

  expect(manager.toURLParams()).toBe("test=red&price=3-7")

  manager.readFromURLParams(new URLSearchParams("test=red&price=6-9"))

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

  expect(manager.toURLParams()).toBe("test=red&price=6-9")
})
