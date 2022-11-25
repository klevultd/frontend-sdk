import { newE2EPage } from "@stencil/core/testing"

describe("klevu-accordion", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-accordion></klevu-accordion>")

    const element = await page.find("klevu-accordion")
    expect(element).toHaveClass("hydrated")
  })
})
