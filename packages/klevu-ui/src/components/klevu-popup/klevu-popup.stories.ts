import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuPopup } from "./klevu-popup"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-popup")

const meta: Meta = {
  title: "Atoms/Popup",
  component: "klevu-popup",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Popup: StoryObj<KlevuPopup> = {
  args: {
    startOpen: false,
    anchor: "bottom-start",
  },
  render: (args) => html`
    <klevu-popup
      anchor=${ifDefined(args.anchor)}
      close-at-outside-click=${ifDefined(args.closeAtOutsideClick)}
      fullscreen-on-mobile-size=${ifDefined(args.fullscreenOnMobileSize)}
      open-at-focus=${ifDefined(args.openAtFocus)}
      start-open=${ifDefined(args.startOpen)}
      elevation=${ifDefined(args.elevation)}
      offset=${ifDefined(args.offset)}
    >
      <klevu-search-field slot="origin"></klevu-search-field>
      <div slot="content">Hello world popup</div>
    </klevu-popup>
  `,
}

export const ButtonSource: StoryObj<KlevuPopup> = {
  args: {
    startOpen: false,
    anchor: "bottom-start",
    openAtFocus: false,
    elevation: 3,
  },
  render: (args) => html`<klevu-popup
    anchor=${ifDefined(args.anchor)}
    close-at-outside-click=${ifDefined(args.closeAtOutsideClick)}
    fullscreen-on-mobile-size=${ifDefined(args.fullscreenOnMobileSize)}
    open-at-focus=${ifDefined(args.openAtFocus)}
    start-open=${ifDefined(args.startOpen)}
    elevation=${ifDefined(args.elevation)}
    offset=${ifDefined(args.offset)}
  >
    <klevu-button slot="origin">Open popup</klevu-button>
    <div slot="content">Hello world popup</div>
  </klevu-popup>`,
}

export const ExternalSource: StoryObj<KlevuPopup> = {
  args: {
    anchor: "bottom-start",
    elevation: 3,
  },
  render: (args) => html`<klevu-popup
      id="external-popup"
      anchor=${ifDefined(args.anchor)}
      close-at-outside-click=${ifDefined(args.closeAtOutsideClick)}
      fullscreen-on-mobile-size=${ifDefined(args.fullscreenOnMobileSize)}
      open-at-focus=${ifDefined(args.openAtFocus)}
      start-open=${ifDefined(args.startOpen)}
      elevation=${ifDefined(args.elevation)}
      offset=${ifDefined(args.offset)}
    >
      <div slot="content">Popup Content</div>
    </klevu-popup>
    <p>This is some text to separate popup from the origin. The popup element is above this text.</p>
    <p>The button below is attached as an origin to the popup using script.</p>
    <klevu-button id="thebutton" is-secondary>Open Popup</klevu-button>
    <style>
      #external-popup::part(popup-base) {
        width: 50px;
        height: 30px;
        background-color: beige;
      }
    </style>
    <script>
      function attachOriginElement() {
        const origin = document.querySelector("#thebutton")
        const popup = document.querySelector("#external-popup")
        popup.originElement = origin
      }
      attachOriginElement()
    </script> `,
}
