import { newE2EPage } from "@stencil/core/testing"

describe("klevu-product", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-product></klevu-product>")

    const element = await page.find("klevu-product")
    expect(element).toHaveClass("hydrated")
  })
})
