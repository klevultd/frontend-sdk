import { newE2EPage } from "@stencil/core/testing"

describe("KlevuButton", () => {
  it("should render a button with the correct text", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-button>Click me</klevu-button>")

    const button = await page.find("klevu-button")
    expect(button).toEqualText("Click me")
  })

  it('should emit a "click" event when the button is clicked', async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-button>Click me</klevu-button>")

    const button = await page.find("klevu-button")
    const clickSpy = await button.spyOnEvent("click")

    await button.click()
    await page.waitForChanges()

    expect(clickSpy).toHaveReceivedEvent()
  })

  it('should be disabled when the "disabled" property is true', async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-button disabled>Click me</klevu-button>")

    const button = await page.find("klevu-button")
    expect(button).toHaveAttribute("disabled")

    const clickSpy = await button.spyOnEvent("click")

    await button.click()
    await page.waitForChanges()
    expect(clickSpy).toHaveReceivedEvent()
  })
})
