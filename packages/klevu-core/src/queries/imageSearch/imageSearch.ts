import {
  KlevuFetchFunctionReturnValue,
  KlevuSearchOptions,
  search,
} from "../index.js"
import { KlevuConfig } from "../../config.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"

/**
 * Uploads the image if blob passed or uses url to perform search
 *
 * @param image Pass a url or the image blob for search
 * @param options {@link KlevuSearchOptions}
 * @returns
 * @throws Error when image upload fails or when no url/blob is passed
 */
export async function imageSearch(
  image: Blob | string,
  options?: Partial<KlevuSearchOptions>,
  ...modifiers: KlevuFetchModifer[]
): Promise<KlevuFetchFunctionReturnValue> {
  if (!image) {
    throw new Error("Image url or blob are required.")
  }
  let url = ""
  if (typeof image === "string") {
    url = image
  } else {
    const form = new FormData()
    form.append("image", image)
    const imageUrlResponse = await fetch(
      `https://api.ksearchnet.com/image/store/${
        KlevuConfig.getDefault().apiKey
      }`,
      { method: "POST", body: form }
    )
    if (imageUrlResponse.status !== 200) {
      console.warn("Failed to upload image: " + imageUrlResponse.status)
      throw new Error("Failed to upload image")
    }
    url = (await imageUrlResponse.json()).url
  }
  if (!url) {
    throw new Error("Image url is required.")
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = {
    sourceObjects: [
      {
        typeOfRecord: KlevuTypeOfRecord.Image,
        records: [
          {
            url,
          },
        ],
      },
    ],
  }
  if (options) {
    options.context = context
  } else {
    options = { context }
  }
  return search("*", options, ...modifiers)
}
