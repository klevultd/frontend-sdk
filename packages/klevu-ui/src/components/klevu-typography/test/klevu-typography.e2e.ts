import { newE2EPage } from "@stencil/core/testing"

describe("klevu-typography", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-typography></klevu-typography>")

    const element = await page.find("klevu-typography")
    expect(element).toHaveClass("hydrated")
  })
})
