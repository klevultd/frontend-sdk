import { newE2EPage } from "@stencil/core/testing"
import { html } from "../../../storybookUtils"

describe("klevu-merchandising", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    /*
    await page.setContent(
      html`<klevu-init
          url="https://eucs30v2.ksearchnet.com/cs/v2/search"
          api-key="klevu-165829460115715456"
        ></klevu-init
        ><klevu-merchandising category="Apparel" category-title="Apparels"></klevu-merchandising>`
    )
    await page.waitForChanges()
    const element = await page.find("klevu-merchandising")
    expect(element).toHaveClass("hydrated")
    */
  })
})
