import { css, html, WebComponentTemplate } from "../storybookUtils"

export default {
  title: "Atoms/Forms",
}

const textfield = document.createElement("klevu-textfield") as HTMLKlevuTextfieldElement
textfield.placeholder = "Search something"
const checkbox = document.createElement("klevu-checkbox")
const button = document.createElement("klevu-button")
button.innerHTML = "Button"
const dropdown = document.createElement("klevu-dropdown") as HTMLKlevuDropdownElement
dropdown.options = [
  {
    value: "1",
    text: "One",
  },
  {
    value: "2",
    text: "Two",
  },
  {
    value: "3",
    text: "Three",
  },
]

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
  childElements: [textfield, checkbox, button, dropdown],
})

const textfield2 = document.createElement("klevu-textfield") as HTMLKlevuTextfieldElement
textfield2.placeholder = "Search something"
textfield2.disabled = true
const checkbox2 = document.createElement("klevu-checkbox")
checkbox2.disabled = true
const button2 = document.createElement("klevu-button")
button2.disabled = true
button2.innerHTML = "Button"
const dropdown2 = document.createElement("klevu-dropdown")
dropdown2.disabled = true
dropdown2.options = [
  {
    value: "1",
    text: "One",
  },
  {
    value: "2",
    text: "Two",
  },
  {
    value: "3",
    text: "Three",
  },
]

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
  childElements: [textfield2, checkbox2, button2, dropdown2],
})
