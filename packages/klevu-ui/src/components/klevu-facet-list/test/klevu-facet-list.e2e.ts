import { newE2EPage } from "@stencil/core/testing"

describe("klevu-facet-list", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-facet-list></klevu-facet-list>")

    const element = await page.find("klevu-facet-list")
    expect(element).toHaveClass("hydrated")
  })
})
