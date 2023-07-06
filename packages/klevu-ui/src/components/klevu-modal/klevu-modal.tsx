import { Component, Host, h, Method, Prop, Event, EventEmitter } from "@stencil/core"

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

  /**
   * Should show the modal on load.
   */
  @Prop()
  startOpen = false

  componentDidLoad() {
    if (this.startOpen) {
      this.openModal()
    }
  }

  /**
   * Opens the modal.
   */
  @Method() async openModal() {
    this.#dialogRef?.showModal()
  }

  /**
   * Closes the modal.
   */
  @Method() async closeModal() {
    this.#dialogRef?.close()
  }

  /**
   * Emitted when the modal is closed.
   */
  @Event({
    bubbles: true,
    cancelable: true,
  })
  klevuCloseModal!: EventEmitter<void>

  #close(e: Event) {
    const event = this.klevuCloseModal.emit()
    if (event.defaultPrevented) {
      e.preventDefault()
    }
  }

  render() {
    return (
      <Host>
        <dialog ref={(el) => (this.#dialogRef = el)} onCancel={this.#close.bind(this)}>
          <header>
            <slot name="header"></slot>
            <form method="dialog" onSubmit={this.#close.bind(this)}>
              <button>
                <klevu-icon name="close" />
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
