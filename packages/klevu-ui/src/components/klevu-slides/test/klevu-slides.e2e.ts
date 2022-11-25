import { newE2EPage } from "@stencil/core/testing"

describe("klevu-slides", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-slides></klevu-slides>")

    const element = await page.find("klevu-slides")
    expect(element).toHaveClass("hydrated")
  })
})
