import { Component, Event, EventEmitter, Fragment, Host, Prop, h } from "@stencil/core"

export type KlevuImageSelectedEvent = { name: string; image: Blob }

@Component({
  tag: "klevu-image-picker",
  styleUrl: "klevu-image-picker.css",
  shadow: false,
})
export class KlevuImagePicker {
  /**
   * This event is fired when an image is selected.
   */
  @Event({
    composed: true,
  })
  klevuImageSelected!: EventEmitter<KlevuImageSelectedEvent>

  /**
   * To be used to display loading indicator
   */
  @Prop() isLoading: boolean = false

  render() {
    return (
      <Host>
        <div
          class="container"
          onClick={(e) => {
            e.stopPropagation()
          }}
          onFocus={(e) => {
            e.stopPropagation()
          }}
        >
          <p>
            <klevu-typography variant="h4">Visual Image Search</klevu-typography>
          </p>
          <label htmlFor="select-image">
            {this.isLoading ? (
              <klevu-loading-indicator />
            ) : (
              <Fragment>
                <klevu-icon name="upload" />
                <span>Upload a photo</span>
              </Fragment>
            )}
          </label>
          <input
            hidden
            id="select-image"
            type="file"
            onClick={(e) => {
              e.stopPropagation()
            }}
            onFocus={(e) => {
              e.stopPropagation()
            }}
            onChange={(e: Event) => {
              e.preventDefault()
              e.stopPropagation()
              const target = e.target as HTMLInputElement
              if (target?.files && target?.files.length > 0) {
                this.klevuImageSelected.emit({ image: target.files[0], name: target.files[0].name })
              }
            }}
          />
          <p class="info">
            <klevu-icon name="info" />
            <klevu-typography variant="body-xs">
              Your privacy is of utmost importance to us. Any images uploaded will only be used to provide relevant
              results and improve the general search experience. However, we recommend not uploading images containing
              people or sensitive information.
            </klevu-typography>
          </p>
          <klevu-accordion>
            <span slot="header">How does this work?</span>
            <div slot="content">
              <klevu-typography variant="body-xs">
                After you take or upload a photo, we'll analyse it and recommend the closest matches.
              </klevu-typography>
            </div>
          </klevu-accordion>
        </div>
      </Host>
    )
  }
}
