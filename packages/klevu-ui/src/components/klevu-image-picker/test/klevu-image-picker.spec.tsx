import { newSpecPage } from "@stencil/core/testing"
import { KlevuImagePicker } from "../klevu-image-picker"

describe("klevu-image-picker", () => {
  it("render swith upload image button", async () => {
    const page = await newSpecPage({
      components: [KlevuImagePicker],
      html: `<klevu-image-picker ></klevu-image-picker>`,
    })
    if (page.root?.shadowRoot) {
      const divEl = page.root.shadowRoot.querySelectorAll("label")
      expect(divEl[0].innerHTML).toContain("Upload a photo<")
    }
  })
})
