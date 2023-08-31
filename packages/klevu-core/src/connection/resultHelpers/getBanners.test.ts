import axios from "axios"
import {
  KlevuConfig,
  KlevuFetch,
  categoryMerchandising,
  search,
} from "../../index.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-164651914788114877",
    axios,
  })
})

test("Get quicksearch banners", async () => {
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  )

  const banners = await result.queriesById("test")?.getBanners({
    searchType: "quicksearch",
  })

  banners.forEach((b) => expect(b.showOnQuickSearch).toBe(true))

  expect(banners).toBeDefined()
  expect(banners.length).toBeGreaterThan(0)
})

test("Get searh landing page banners", async () => {
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  )

  const banners = await result.queriesById("test")?.getBanners({
    searchType: "landingpage",
  })

  banners.forEach((b) => expect(b.showOnLandingPage).toBe(true))

  expect(banners).toBeDefined()
  expect(banners.length).toBeGreaterThan(0)
})

test("Get merchandising banners", async () => {
  const result = await KlevuFetch(categoryMerchandising("women"))

  const banners = await result.queriesById("categoryMerchandising").getBanners()

  banners.forEach((b) => expect(b.showOnCategoryPage).toBe(true))

  expect(banners).toBeDefined()
  expect(banners.length).toBeGreaterThan(0)
})

test("Get merchandising banners 2", async () => {
  const result = await KlevuFetch(
    categoryMerchandising("accessories;men;clothing")
  )

  const banners = await result.queriesById("categoryMerchandising").getBanners()

  banners.forEach((b) => expect(b.showOnCategoryPage).toBe(true))

  expect(banners).toBeDefined()
  expect(banners.length).toBeGreaterThan(0)
})
