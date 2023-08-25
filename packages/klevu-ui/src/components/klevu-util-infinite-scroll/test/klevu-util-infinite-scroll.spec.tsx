import { newSpecPage } from "@stencil/core/testing"
import { KlevuUtilInfiniteScroll } from "../klevu-util-infinite-scroll"

describe("klevu-util-infinite-scroll", () => {
  it("renders with div", async () => {
    const page = await newSpecPage({
      components: [KlevuUtilInfiniteScroll],
      html: `<klevu-util-infinite-scroll></klevu-util-infinite-scroll>`,
    })
    if (page.root?.shadowRoot) {
      expect(page.root.shadowRoot.innerHTML).toEqual(`<div />`)
    }
  })
})
