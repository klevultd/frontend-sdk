/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { KlevuConfig, KlevuTypeOfRecord, imageSearch } from "../../index.js"
import axios from "axios"
import { jest } from "@jest/globals"

const origFetch = global.fetch

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
    axios,
  })
  global.fetch = origFetch
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
  const base64Data = "aGV5IHRoZXJl"
  const base64Response = await fetch(`data:image/jpeg;base64,${base64Data}`)
  const blob = await base64Response.blob()
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ url: "http://someImageurl.com" }),
    })
  ) as any

  const payload = await imageSearch(blob)
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

test("Image search with blob as param and upload fails", async () => {
  const base64Data = "aGV5IHRoZXJl"
  const base64Response = await fetch(`data:image/jpeg;base64,${base64Data}`)
  const blob = await base64Response.blob()
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 500,
    })
  ) as any

  expect(() => imageSearch(blob)).rejects.toThrow("Failed to upload image")
})

test("Error thrown when no image is passed", async () => {
  expect(imageSearch).rejects.toThrow("Image url or blob are required.")
})
