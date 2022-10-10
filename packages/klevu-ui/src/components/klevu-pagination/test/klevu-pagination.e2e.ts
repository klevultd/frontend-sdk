import { newE2EPage } from "@stencil/core/testing"

describe("klevu-pagination", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent('<klevu-pagination min="1" max="5" current="3"></klevu-pagination>')

    const element = await page.find("klevu-pagination")
    expect(element).toHaveClass("hydrated")
  })
})
