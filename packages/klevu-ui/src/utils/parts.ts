// base part of the components
let internalParts = {
  "klevu-button": "button-base",
  "klevu-product": "product-image,product-container,product-swatch",
  "klevu-popup": "popup-content, popup-origin",
  "klevu-product-query-popup":
    "product-query-header, product-query-footer, product-query-feedback, product-query-open-button",
}

// inherited parts of the components
internalParts["klevu-product-query-popup"] += "," + internalParts["klevu-popup"]

export const parts = internalParts
