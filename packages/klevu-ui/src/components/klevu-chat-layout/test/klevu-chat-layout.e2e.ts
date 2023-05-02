import { newE2EPage } from "@stencil/core/testing"

describe("klevu-chat-layout", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-chat-layout></klevu-chat-layout>")

    const element = await page.find("klevu-chat-layout")

    expect(element).toHaveClass("hydrated")
  })
})
