import { newSpecPage } from "@stencil/core/testing"
import { KlevuInfiniteScroll } from "../klevu-infinite-scroll"

describe("klevu-infinite-scroll", () => {
  it("renders with 3 stars", async () => {
    const page = await newSpecPage({
      components: [KlevuInfiniteScroll],
      html: `<klevu-infinite-scroll><div slot="loader">Loading</div></klevu-infinite-scroll>`,
    })
    if (page.root?.shadowRoot) {
      expect(page.root.shadowRoot.innerHTML).toEqual(`&nbsp;`)
    }
  })
})
