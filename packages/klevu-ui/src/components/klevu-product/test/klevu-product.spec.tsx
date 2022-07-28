import { newSpecPage } from "@stencil/core/testing"
import { KlevuProduct } from "../klevu-product"

describe("klevu-product", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [KlevuProduct],
      html: `<klevu-product></klevu-product>`,
    })
    expect(page.root).toEqualHtml(`
      <klevu-product>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-product>
    `)
  })
})
