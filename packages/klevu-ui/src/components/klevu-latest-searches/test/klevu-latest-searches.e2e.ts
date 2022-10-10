import { newE2EPage } from "@stencil/core/testing"

describe("klevu-latest-searches", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-latest-searches></klevu-latest-searches>")

    await page.waitForChanges()
    const element = await page.find("klevu-latest-searches")
    expect(element).toHaveClass("hydrated")
  })
})
