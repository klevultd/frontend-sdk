/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { KlevuConfig, KlevuTypeOfRecord, imageSearch } from "../../index.js"
import axios from "axios"
import fetch from "node-fetch"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
})

test("Image search with url as param", async () => {
  const payload = await imageSearch("http://someImageurl.com")
  expect(payload.queries).toBeDefined()
  expect(payload.queries?.length).toBe(1)
  expect(payload.queries![0].settings?.context?.sourceObjects?.length).toBe(1)
  expect(
    payload.queries![0].settings?.context?.sourceObjects![0].typeOfRecord
  ).toBe(KlevuTypeOfRecord.Image)
  expect(
    payload.queries![0].settings?.context?.sourceObjects![0].records.length
  ).toBe(1)
  expect(
    (
      payload.queries![0].settings?.context?.sourceObjects![0].records![0] as {
        url: string
      }
    ).url
  ).toBe("http://someImageurl.com")
})

test("Image search with blob as param", async () => {
  const response = await fetch("https://picsum.photos/600/600")
  const payload = await imageSearch(await response.blob())
  expect(payload.queries).toBeDefined()
  expect(payload.queries?.length).toBe(1)
  expect(payload.queries![0].settings?.context?.sourceObjects?.length).toBe(1)
  expect(
    payload.queries![0].settings?.context?.sourceObjects![0].typeOfRecord
  ).toBe(KlevuTypeOfRecord.Image)
  expect(
    payload.queries![0].settings?.context?.sourceObjects![0].records.length
  ).toBe(1)
  expect(
    (
      payload.queries![0].settings?.context?.sourceObjects![0].records![0] as {
        url: string
      }
    ).url
  ).toContain(
    "klevu-image-search-dev.s3.eu-west-1.amazonaws.com/klevu-160320037354512854/image-search"
  )
})

test("Error thrown when no image is passed", async () => {
  expect(imageSearch).rejects.toThrow("Image url or blob are required.")
})
