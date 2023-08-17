import { MoiSavedFeedback } from "@klevu/core"
import { Component, Event, EventEmitter, Host, Prop, h } from "@stencil/core"
import { getTranslation } from "../../utils/getTranslation"

export type KlevuMessageFeedbackReasonDetails = {
  reason: string
  feedback: MoiSavedFeedback
}

/**
 * Container for chat items. Very simple component, just a wrapper.
 *
 * @cssprop --klevu-chat-bubble-background --klevu-color-neutral-2 Background color of the bubble
 * @cssprop --klevu-chat-bubble-background-remote --klevu-color-primary Background color of the bubble when remote
 * @cssprop --klevu-chat-bubble-text-color inherit Text color of the bubble
 * @cssprop --klevu-chat-bubble-text-color-remote --klevu-color-neutral-1 Text color of the bubble when remote
 */
@Component({
  tag: "klevu-chat-bubble",
  styleUrl: "klevu-chat-bubble.css",
  shadow: true,
})
export class KlevuChatBubble {
  /**
   * Is the message from the user or from the bot
   */
  @Prop() remote?: boolean

  /**
   * Has user given feedback to this message
   */
  @Prop() feedback?: MoiSavedFeedback

  /**
   * List of feedback reasons to show after the message
   */
  @Prop() feedbackReasons?: string[]

  /**
   * Text for rating reason title
   */
  @Prop() tRatingReason = getTranslation("chatBubble.tRatingReason")

  @Event({
    composed: true,
  })
  klevuMessageFeedbackReason!: EventEmitter<KlevuMessageFeedbackReasonDetails>

  render() {
    return (
      <Host
        class={{
          remote: Boolean(this.remote),
        }}
      >
        <klevu-typography variant="body-s">
          <slot></slot>
        </klevu-typography>
        {this.feedback?.thumbs === "up" && <klevu-icon class="positive_feedback" name="thumb_up" />}
        {this.feedback?.thumbs === "down" && <klevu-icon class="negative_feedback" name="thumb_down" />}
        {!Boolean(this.feedback?.reason) && this.feedbackReasons && (
          <div class="feedback_reasons">
            <span>{this.tRatingReason}</span>
            {this.feedbackReasons.map((reason) => (
              <klevu-button
                size="tiny"
                isSecondary
                onClick={() => {
                  this.klevuMessageFeedbackReason.emit({ reason, feedback: this.feedback! })
                }}
              >
                {reason}
              </klevu-button>
            ))}
          </div>
        )}
      </Host>
    )
  }
}
