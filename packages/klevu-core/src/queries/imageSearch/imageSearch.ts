import {
  KlevuFetchFunctionReturnValue,
  KlevuSearchOptions,
  search,
} from "../index.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"
import { KlevuUploadImageForSearch } from "../../utils/uploadImageForSearch.js"

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
    url = await KlevuUploadImageForSearch(image)
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
