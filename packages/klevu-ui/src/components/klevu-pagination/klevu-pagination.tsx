import { KlevuQueryResult } from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

/**
 * Pagination component. Either provide numbers or query result to display the component.
 *
 * @cssprop --klevu-pagination-background-color --klevu-color-dim-background background color of item
 * @cssprop --klevu-pagination-text-color - text color of item
 * @cssprop --klevu-pagination-selected-background-color --klevu-color-primary background color of selected item
 * @cssprop --klevu-pagination-selected-text-color --klevu-color-primary-text text color of selected item
 */
@Component({
  tag: "klevu-pagination",
  styleUrl: "klevu-pagination.css",
  shadow: true,
})
export class KlevuPagination {
  /**
   * Current page
   */
  @Prop() current?: number
  /**
   * Min page
   */
  @Prop() min?: number
  /**
   * Max page
   * */
  @Prop() max?: number
  /**
   * Query results used to build min, max and current
   */
  @Prop() queryResult?: KlevuQueryResult

  /**
   * Page that was changed into
   */
  @Event({
    composed: true,
  })
  klevuPaginationChange!: EventEmitter<number>

  render() {
    let min: number, max: number, current: number
    if (this.queryResult) {
      min = 1
      max = Math.floor(this.queryResult.meta.totalResultsFound / this.queryResult.meta.noOfResults) + 1
      current = Math.floor(this.queryResult.meta.offset / this.queryResult.meta.noOfResults) + 1
    } else {
      if ([this.current, this.max, this.min].some((i) => i === undefined)) {
        throw new Error("queryResult or current, min & max needs to be defined")
      }
      min = this.min!
      max = this.max!
      current = this.current!
    }

    let pages: number[] = []
    for (let i = min; i <= max; i++) {
      pages.push(i)
    }

    if (pages.length > 8) {
      let startIndex = min + 1
      let endIndex = max - 1
      let currentStartIndex = current > 3 ? current - 1 : 0
      let currentEndIndex = current < endIndex - 1 ? currentStartIndex + 2 : endIndex - 1

      if (currentStartIndex < startIndex) {
        currentStartIndex = startIndex + 1
        currentEndIndex = currentStartIndex + 2
      }

      pages = []
      for (let i = min; i <= startIndex; i++) {
        pages.push(i)
      }
      if (startIndex + 1 < currentStartIndex) {
        pages.push(-1)
      }
      for (let i = currentStartIndex; i <= currentEndIndex; i++) {
        pages.push(i)
      }
      if (currentEndIndex + 1 < endIndex) {
        pages.push(-1)
      }
      for (let i = endIndex; i <= max; i++) {
        pages.push(i)
      }
    }

    return (
      <Host>
        <span
          class={{
            disabled: current === min,
          }}
          onClick={() => current !== min && this.klevuPaginationChange.emit(current - 1)}
          part="material-icon"
        >
          navigate_before
        </span>
        {pages.map((i) => {
          if (i == -1) {
            return <span class="disabled">...</span>
          }

          return (
            <span
              class={{
                current: current === i,
              }}
              onClick={() => current !== i && this.klevuPaginationChange.emit(i)}
            >
              {i}
            </span>
          )
        })}
        <span
          class={{
            disabled: current === max,
          }}
          onClick={() => current !== max && this.klevuPaginationChange.emit(current + 1)}
          part="material-icon"
        >
          navigate_next
        </span>
      </Host>
    )
  }
}
