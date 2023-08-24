import { newE2EPage } from "@stencil/core/testing"

describe("KlevuChip", () => {
  it("should render a chip with the correct class when removable is true", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-chip></klevu-chip>")

    const chip = await page.find("klevu-chip")
    chip.setProperty("removable", true)
    await page.waitForChanges()

    expect(chip).toHaveClass("removable")
  })

  it("should render a chip with the correct class when selected is true", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-chip></klevu-chip>")

    const chip = await page.find("klevu-chip")
    chip.setProperty("selected", true)
    await page.waitForChanges()

    expect(chip).toHaveClass("selected")
  })

  it('should emit a "close" event when the close button is clicked', async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-chip removable>The chip</klevu-chip>")

    const chip = await page.find("klevu-chip")
    const closeButton = await page.find("klevu-chip >>> klevu-icon")
    const closeSpy = await chip.spyOnEvent("klevuChipRemove")

    await closeButton.click()
    await page.waitForChanges()

    expect(closeSpy).toHaveReceivedEvent()
  })
})
