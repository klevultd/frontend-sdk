import { newE2EPage } from "@stencil/core/testing"

describe("klevu-heading", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-heading></klevu-heading>")

    const element = await page.find("klevu-heading")
    expect(element).toHaveClass("hydrated")
  })
})
