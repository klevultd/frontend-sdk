import { Component, Host, h, Method, Prop } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"

/**
 * Stylized modal dialog.
 */
@Component({
  tag: "klevu-modal",
  styleUrl: "klevu-modal.css",
  shadow: true,
})
export class KlevuModal {
  #dialogRef?: HTMLDialogElement

  @Prop()
  startOpen = false

  componentDidLoad() {
    if (this.startOpen) {
      this.openModal()
    }
  }

  @Method() async openModal() {
    this.#dialogRef?.showModal()
  }

  @Method() async closeModal() {
    this.#dialogRef?.close()
  }

  render() {
    return (
      <Host>
        <dialog ref={(el) => (this.#dialogRef = el)}>
          <header>
            <slot name="header"></slot>
            <form method="dialog">
              <button>
                <span part="material-icon">close</span>
              </button>
            </form>
          </header>
          <main>
            <slot></slot>
          </main>
        </dialog>
      </Host>
    )
  }
}
