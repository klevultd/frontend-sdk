import { newE2EPage } from "@stencil/core/testing"

describe("klevu-checkbox", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-checkbox></klevu-checkbox>")

    const element = await page.find("klevu-checkbox")
    expect(element).toHaveClass("hydrated")
  })
})
