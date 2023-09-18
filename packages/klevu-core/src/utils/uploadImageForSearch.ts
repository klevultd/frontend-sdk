import { KlevuConfig } from ".."
/**
 * This function is to be called to get the url to be used
 * in search for image search or to be passed to the imageSearch
 * query function
 * @param image The image object to upload
 * @returns image url to be passed to search
 */
export async function KlevuUploadImageForSearch(image: Blob) {
  const form = new FormData()
  form.append(
    "image",
    image,
    image.name || KlevuConfig.getDefault().apiKey + ".jpg"
  )
  const imageUrlResponse = await fetch(
    `https://api.ksearchnet.com/image/store/${KlevuConfig.getDefault().apiKey}`,
    { method: "POST", body: form }
  )
  if (imageUrlResponse.status !== 200) {
    console.warn("Failed to upload image: " + imageUrlResponse.status)
    throw new Error("Failed to upload image")
  }
  const { url } = await imageUrlResponse.json()
  return url
}
