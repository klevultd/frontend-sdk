import { newE2EPage } from "@stencil/core/testing"

describe("klevu-search-landing-page", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent(
      `<klevu-init
          url="https://eucs30v2.ksearchnet.com/cs/v2/search"
          api-key="klevu-165829460115715456"
        ></klevu-init
        ><klevu-search-landing-page term="jeans"></klevu-search-landing-page>`
    )

    const element = await page.find("klevu-search-landing-page")
    expect(element).toHaveClass("hydrated")
  })
})
