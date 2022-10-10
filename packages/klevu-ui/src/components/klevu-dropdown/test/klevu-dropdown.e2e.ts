import { newE2EPage } from "@stencil/core/testing"

describe("klevu-dropdown", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-dropdown></klevu-dropdown>")

    await page.$eval("klevu-dropdown", (elm: any) => {
      elm.name = "The dropdown"
      elm.options = [
        {
          value: "1",
          text: "One",
        },
        {
          value: "2",
          text: "Two",
        },
      ]
    })

    await page.waitForChanges()

    const element = await page.find("klevu-dropdown")
    expect(element).toHaveClass("hydrated")
  })
})
