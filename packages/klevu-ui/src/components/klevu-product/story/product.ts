import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"

export const singleProduct = (args: HTMLKlevuProductElement) => html` <klevu-product
  style="--klevu-product-width: 300px"
  variant=${args.variant}
  .product=${args.product}
  fixed-width=${ifDefined(args.fixedWidth)}
  hide-brand=${ifDefined(args.hideBrand)}
  hide-description=${ifDefined(args.hideDescription)}
  hide-image=${ifDefined(args.hideImage)}
  hide-price=${ifDefined(args.hidePrice)}
  hide-name=${ifDefined(args.hideName)}
  hide-swatches=${ifDefined(args.hideSwatches)}
  key-brand=${ifDefined(args.keyBrand)}
  key-name=${ifDefined(args.keyName)}
  key-description=${ifDefined(args.keyDescription)}
></klevu-product>`

export const productWithCustomizedProduct = (args: HTMLKlevuProductElement) => html`<div>
  ${singleProduct(args)}
  <klevu-product
    style="--klevu-product-width: 300px; --klevu-product-image-aspect-ratio: 1 / 1.3"
    variant=${args.variant}
    .product=${args.product}
    fixed-width=${ifDefined(args.fixedWidth)}
    hide-brand=${ifDefined(args.hideBrand)}
    hide-description=${ifDefined(args.hideDescription)}
    hide-image=${ifDefined(args.hideImage)}
    hide-price=${ifDefined(args.hidePrice)}
    hide-name=${ifDefined(args.hideName)}
    hide-swatches=${ifDefined(args.hideSwatches)}
    key-brand=${ifDefined(args.keyBrand)}
    key-name=${ifDefined(args.keyName)}
    key-description=${ifDefined(args.keyDescription)}
  ></klevu-product>
  <klevu-product
    id="modified"
    variant=${args.variant}
    .product=${args.product}
    fixed-width=${ifDefined(args.fixedWidth)}
    hide-brand=${ifDefined(args.hideBrand)}
    hide-description=${ifDefined(args.hideDescription)}
    hide-image=${ifDefined(args.hideImage)}
    hide-price=${ifDefined(args.hidePrice)}
    hide-name=${ifDefined(args.hideName)}
    hide-swatches=${ifDefined(args.hideSwatches)}
    key-brand=${ifDefined(args.keyBrand)}
    key-name=${ifDefined(args.keyName)}
    key-description=${ifDefined(args.keyDescription)}
  ></klevu-product>
  <style>
    #modified {
      --klevu-product-width: 300px;
    }
    klevu-product#modified::part(product-container) {
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.35);
    }
  </style>
</div>`
