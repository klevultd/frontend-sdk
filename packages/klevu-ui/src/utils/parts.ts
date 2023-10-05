/* Automatically generated by generateParts.js - Do not modify by hand - Use "npm run generate:parts" to update */
export const parts = {
  "klevu-accordion": {
    local: ["accordion-base", "accordion-header", "accordion-content", "accordion-icon"],
    exportedcomponents: {},
  },
  "klevu-badge": {
    local: ["badge-content", "badge-base"],
    exportedcomponents: {},
  },
  "klevu-button": {
    local: ["button-base"],
    exportedcomponents: {},
  },
  "klevu-chat-bubble": {
    local: [
      "chat-bubble-base",
      "chat-bubble-positive-feedback",
      "chat-bubble-negative-feedback",
      "chat-bubble-feedback-reasons",
    ],
    exportedcomponents: { "klevu-button": ["button-base"] },
  },
  "klevu-checkbox": {
    local: ["checkbox-base", "checkbox-box", "checkbox-content"],
    exportedcomponents: {},
  },
  "klevu-chip": {
    local: ["chip-base", "chip-icon", "chip-content"],
    exportedcomponents: {},
  },
  "klevu-cms-list": {
    local: ["cms-list-caption"],
    exportedcomponents: { "klevu-list": ["list-base", "list-icon", "list-image", "list-content", "list-button"] },
  },
  "klevu-drawer": {
    local: ["drawer-base", "drawer-origin", "drawer-content"],
    exportedcomponents: {},
  },
  "klevu-dropdown": {
    local: ["dropdown-base", "dropdown-select"],
    exportedcomponents: {},
  },
  "klevu-facet": {
    local: ["facet-heading", "facet-radio", "facet-more-button", "facet-option-count"],
    exportedcomponents: {
      "klevu-accordion": ["accordion-base", "accordion-header", "accordion-content", "accordion-icon"],
      "klevu-rating": ["rating-base", "rating-star"],
      "klevu-checkbox": ["checkbox-base", "checkbox-box", "checkbox-content"],
      "klevu-button": ["button-base"],
    },
  },
  "klevu-latest-searches": {
    local: ["latest-searches-caption"],
    exportedcomponents: { "klevu-list": ["list-base", "list-icon", "list-image", "list-content", "list-button"] },
  },
  "klevu-list": {
    local: ["list-base", "list-icon", "list-image", "list-content", "list-button"],
    exportedcomponents: {},
  },
  "klevu-loading-indicator": {
    local: ["loading-indicator-base"],
    exportedcomponents: {},
  },
  "klevu-modal": {
    local: ["modal-base", "modal-header", "modal-dialog", "modal-body"],
    exportedcomponents: {},
  },
  "klevu-pagination": {
    local: ["pagination-base", "pagination-navigation-previous", "pagination-navigation-next"],
    exportedcomponents: {},
  },
  "klevu-popular-searches": {
    local: ["popular-searches-base", "popular-searches-caption", "popular-searches-list-item"],
    exportedcomponents: { "klevu-list": ["list-base", "list-icon", "list-image", "list-content", "list-button"] },
  },
  "klevu-popup": {
    local: ["popup-base", "popup-content"],
    exportedcomponents: {},
  },
  "klevu-product": {
    local: [
      "product-image",
      "product-base",
      "product-swatch",
      "product-brandname",
      "product-name",
      "product-description",
      "product-price",
      "product-vatcaption",
      "product-ooscaption",
      "product-variants-count",
      "product-addtocart",
    ],
    exportedcomponents: { "klevu-button": ["button-base"], "klevu-rating": ["rating-base", "rating-star"] },
  },
  "klevu-product-grid": {
    local: ["product-grid-base"],
    exportedcomponents: {},
  },
  "klevu-product-query": {
    local: ["product-query-open-button"],
    exportedcomponents: {
      "klevu-button": ["button-base"],
      "klevu-product-query-popup": [
        "product-query-popup-header",
        "product-query-popup-footer",
        "product-query-popup-feedback",
      ],
      "klevu-popup": ["popup-base", "popup-content"],
      "klevu-loading-indicator": ["loading-indicator-base"],
      "klevu-textfield": ["textfield-base", "textfield-icon", "textfield-input", "textfield-clearbutton"],
      "klevu-chat-bubble": [
        "chat-bubble-base",
        "chat-bubble-positive-feedback",
        "chat-bubble-negative-feedback",
        "chat-bubble-feedback-reasons",
      ],
      "klevu-slides": ["slides-base", "slides-heading", "slides-previous-button", "slides-next-button"],
      "klevu-product": [
        "product-image",
        "product-base",
        "product-swatch",
        "product-brandname",
        "product-name",
        "product-description",
        "product-price",
        "product-vatcaption",
        "product-ooscaption",
        "product-variants-count",
        "product-addtocart",
      ],
      "klevu-rating": ["rating-base", "rating-star"],
    },
  },
  "klevu-product-query-popup": {
    local: ["product-query-popup-header", "product-query-popup-footer", "product-query-popup-feedback"],
    exportedcomponents: {
      "klevu-popup": ["popup-base", "popup-content"],
      "klevu-loading-indicator": ["loading-indicator-base"],
      "klevu-textfield": ["textfield-base", "textfield-icon", "textfield-input", "textfield-clearbutton"],
      "klevu-button": ["button-base"],
      "klevu-chat-bubble": [
        "chat-bubble-base",
        "chat-bubble-positive-feedback",
        "chat-bubble-negative-feedback",
        "chat-bubble-feedback-reasons",
      ],
      "klevu-slides": ["slides-base", "slides-heading", "slides-previous-button", "slides-next-button"],
      "klevu-product": [
        "product-image",
        "product-base",
        "product-swatch",
        "product-brandname",
        "product-name",
        "product-description",
        "product-price",
        "product-vatcaption",
        "product-ooscaption",
        "product-variants-count",
        "product-addtocart",
      ],
      "klevu-rating": ["rating-base", "rating-star"],
    },
  },
  "klevu-rating": {
    local: ["rating-base", "rating-star"],
    exportedcomponents: {},
  },
  "klevu-slides": {
    local: ["slides-base", "slides-heading", "slides-previous-button", "slides-next-button"],
    exportedcomponents: { "klevu-button": ["button-base"] },
  },
  "klevu-suggestions-list": {
    local: ["suggestions-list-caption"],
    exportedcomponents: { "klevu-list": ["list-base", "list-icon", "list-image", "list-content", "list-button"] },
  },
  "klevu-tab": {
    local: ["tab-base", "tab-caption"],
    exportedcomponents: {},
  },
  "klevu-textfield": {
    local: ["textfield-base", "textfield-icon", "textfield-input", "textfield-clearbutton"],
    exportedcomponents: {},
  },
}
