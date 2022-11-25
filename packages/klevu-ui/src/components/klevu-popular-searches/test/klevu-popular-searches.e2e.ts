import { newE2EPage } from "@stencil/core/testing"

describe("klevu-popular-searches", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent(
      `<klevu-init
          url="https://eucs30v2.ksearchnet.com/cs/v2/search"
          api-key="klevu-165829460115715456"
        ></klevu-init
        ><klevu-popular-searches></klevu-popular-searches>`
    )
    await page.waitForChanges()
    const element = await page.find("klevu-popular-searches")
    expect(element).toHaveClass("hydrated")
  })
})
