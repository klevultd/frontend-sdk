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

  expect(manager.options.length).toBe(0)
  expect(manager.sliders.length).toBe(0)
})

test("Init from data", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  expect(manager.options.length).toBe(1)
  expect(manager.sliders.length).toBe(1)
  expect(manager.options[0].options.length).toBe(2)
})

test("Toggling works", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.toggleOption("test", "Red")
  const changedOption = manager.options
    .find((o) => o.key === "test")
    ?.options.find((o) => o.name === "Red")
  expect(changedOption?.selected).toBe(true)
})

test("Clearing selection works", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.toggleOption("test", "Red")
  manager.clearOptionSelections()
  const changedOption = manager.options
    .find((o) => o.key === "test")
    ?.options.find((o) => o.name === "Red")
  expect(changedOption?.selected).toBe(false)

  manager.toggleOption("test", "Red")
  manager.clearOptionSelections("foobar")
  const changedOption2 = manager.options
    .find((o) => o.key === "test")
    ?.options.find((o) => o.name === "Red")
  expect(changedOption2?.selected).toBe(true)
})

test("Clearing works", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())
  manager.clear()
  expect(manager.options.length).toBe(0)
  expect(manager.sliders.length).toBe(0)
})

test("Test slider settings", () => {
  const manager = new FilterManager()
  manager.initFromListFilters(mockFilterData())

  manager.updateSlide("price", 7, 8)
  expect(manager.sliders[0]).toMatchObject({
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
  console.log(filters)
  expect(filters[0].values).toEqual(["red"])
  expect(filters[1].values).toEqual(["3", "7"])
})
