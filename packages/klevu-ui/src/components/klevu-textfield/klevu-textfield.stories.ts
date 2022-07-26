import { css, html, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-textfield.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Atoms/Textfield",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuTextfieldElement>({
  tag: "klevu-textfield",
  args: {},
})

export const InputWithCheckboxAndButton = WebComponentTemplate<HTMLDivElement>({
  tag: "div",
  style: css`
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
  `,
  innerHTML: html`<klevu-textfield placeholder="Search something"></klevu-textfield><klevu-checkbox></klevu-checkbox
    ><klevu-button>Button</klevu-button>`,
})

export const DisabledInputWithCheckboxAndButton = WebComponentTemplate<HTMLDivElement>({
  tag: "div",
  style: css`
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
  `,
  innerHTML: html`<klevu-textfield disabled placeholder="Search something"></klevu-textfield
    ><klevu-checkbox checked disabled></klevu-checkbox><klevu-checkbox disabled></klevu-checkbox
    ><klevu-button disabled>Button</klevu-button>`,
})
