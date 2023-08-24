import { newE2EPage } from "@stencil/core/testing"

describe("KlevuCheckbox", () => {
  it("should render a checked checkbox when checked is true", async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-checkbox checked></klevu-checkbox>")

    const checkbox = await page.find("klevu-checkbox")
    const input: any = await page.find("klevu-checkbox >>> input")
    expect(input.checked).toBeFalsy()
  })

  it('should emit a "change" event when the checkbox is clicked', async () => {
    const page = await newE2EPage()
    await page.setContent("<klevu-checkbox></klevu-checkbox>")

    const checkbox = await page.find("klevu-checkbox")
    const changeSpy = await checkbox.spyOnEvent("klevuCheckboxChange")

    const input = await page.find("klevu-checkbox >>> input")
    await input.click()

    await page.waitForChanges()

    expect(changeSpy).toHaveReceivedEvent()
  })
})
