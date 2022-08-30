import { KlevuConfig } from "@klevu/core"
import { newE2EPage } from "@stencil/core/testing"

describe("klevu-quicksearch", () => {
  beforeEach(() => {
    KlevuConfig.init({
      apiKey: "klevu-165829460115715456",
      url: "https://eucs30v2.ksearchnet.com/cs/v2/search",
    })
  })
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-quicksearch></klevu-quicksearch>")

    const element = await page.find("klevu-quicksearch")
    expect(element).toHaveClass("hydrated")
  })
})
