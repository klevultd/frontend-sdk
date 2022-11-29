import { newE2EPage } from "@stencil/core/testing"

describe("klevu-button", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-button></klevu-button>")

    const element = await page.find("klevu-button")
    expect(element).toHaveClass("hydrated")
  })
})
