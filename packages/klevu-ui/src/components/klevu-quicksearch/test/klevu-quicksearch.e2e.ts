import { newE2EPage } from "@stencil/core/testing"
import { html } from "../../../storybookUtils"

describe("klevu-quicksearch", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent(
      html`<klevu-init
          url="https://eucs30v2.ksearchnet.com/cs/v2/search"
          api-key="klevu-165829460115715456"
        ></klevu-init
        ><klevu-quicksearch></klevu-quicksearch>`
    )

    const element = await page.find("klevu-quicksearch")
    expect(element).toHaveClass("hydrated")
  })
})
