import { newE2EPage } from "@stencil/core/testing"

describe("klevu-cms-list", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-cms-list></klevu-cms-list>")

    const element = await page.find("klevu-cms-list")
    expect(element).toHaveClass("hydrated")
  })
})
