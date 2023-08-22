import { newSpecPage } from "@stencil/core/testing"
import { KlevuColorSwatch } from "../klevu-color-swatch"

describe("klevu-color-swatch", () => {
  it("renders with red color swatch", async () => {
    const page = await newSpecPage({
      components: [KlevuColorSwatch],
      html: `<klevu-color-swatch name="colorFacet" color="red"></klevu-color-swatch>`,
    })
    if (page.root?.shadowRoot) {
      const spanEl = page.root.shadowRoot.querySelectorAll("span")
      expect(spanEl.length).toEqual(1)
      expect(spanEl[0].title).toEqual("colorFacet")
      expect(spanEl[0].style.getPropertyValue("background-color")).toEqual("red")
    }
  })
  it("renders with red color swatch which is selected", async () => {
    const page = await newSpecPage({
      components: [KlevuColorSwatch],
      html: `<klevu-color-swatch name="colorFacet" color="red" selected="true"></klevu-color-swatch>`,
    })
    if (page.root?.shadowRoot) {
      const spanEl = page.root.shadowRoot.querySelectorAll("span")
      expect(spanEl.length).toEqual(1)
      expect(spanEl[0].style.getPropertyValue("background-color")).toEqual("red")
      expect(spanEl[0].style.getPropertyValue("box-shadow")).toContain("#2B4AF7")
    }
  })
  it("renders with image url swatch", async () => {
    const page = await newSpecPage({
      components: [KlevuColorSwatch],
      html: `<klevu-color-swatch name="colorFacet" image-url="http://www.color.jpg"></klevu-color-swatch>`,
    })
    if (page.root?.shadowRoot) {
      const spanEl = page.root.shadowRoot.querySelectorAll("span")
      expect(spanEl.length).toEqual(1)
      expect(spanEl[0].style.getPropertyValue("background-image")).toContain("color.jpg")
    }
  })
})
