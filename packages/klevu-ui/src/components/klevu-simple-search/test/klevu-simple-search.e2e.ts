import { newE2EPage } from "@stencil/core/testing"
import { html } from "./../../../storybookUtils"

describe("klevu-simple-search", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent(html`<klevu-init
        url="https://eucs30v2.ksearchnet.com/cs/v2/search"
        api-key="klevu-165829460115715456"
      ></klevu-init
      ><klevu-simple-search></klevu-simple-search>`)

    const element = await page.find("klevu-simple-search")
    expect(element).toHaveClass("hydrated")
  })
})
