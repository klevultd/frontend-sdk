import { newE2EPage } from "@stencil/core/testing"

describe("klevu-textfield", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-textfield></klevu-textfield>")

    const element = await page.find("klevu-textfield")
    expect(element).toHaveClass("hydrated")
  })
})
