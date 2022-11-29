import { newE2EPage } from "@stencil/core/testing"

describe("klevu-query", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-query></klevu-query>")

    const element = await page.find("klevu-query")
    expect(element).toHaveClass("hydrated")
  })
})
