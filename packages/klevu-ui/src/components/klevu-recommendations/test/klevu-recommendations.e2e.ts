import { KlevuConfig } from "@klevu/core"
import { newE2EPage } from "@stencil/core/testing"
import axios from "axios"
import { html } from "../../../storybookUtils"

describe("klevu-recommendations", () => {
  it("renders", async () => {
    const page = await newE2EPage()
    await page.setContent(
      html`<klevu-init
          url="https://eucs30v2.ksearchnet.com/cs/v2/search"
          api-key="klevu-165829460115715456"
        ></klevu-init
        ><klevu-recommendations recommendation-id="k-4c963fdd-df37-4819-becd-bc6015307ba6"></klevu-recommendations>`
    )

    const element = await page.find("klevu-recommendations")
    expect(element).toHaveClass("hydrated")
  })
})
