import { newE2EPage } from "@stencil/core/testing"

describe("klevu-suggestions-list", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-suggestions-list></klevu-suggestions-list>")

    const element = await page.find("klevu-suggestions-list")
    expect(element).toHaveClass("hydrated")
  })
})
