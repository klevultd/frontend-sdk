import { html } from "lit-html"

export const ModalStory = (args: HTMLKlevuModalElement) => html`
  <div>
    <klevu-modal id="modal">Hello world!</klevu-modal>
    <klevu-button onclick="document.getElementById('modal').openModal()">Open modal</klevu-button>
  </div>
`
