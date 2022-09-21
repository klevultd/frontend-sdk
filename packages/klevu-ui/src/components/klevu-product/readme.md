# klevu-product



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Default     |
| ----------------- | ------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `hideBrand`       | `hide-brand`       |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined` |
| `hideDescription` | `hide-description` |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined` |
| `hideImage`       | `hide-image`       |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined` |
| `hideName`        | `hide-name`        |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined` |
| `hidePrice`       | `hide-price`       |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined` |
| `hideSwatches`    | `hide-swatches`    |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined` |
| `product`         | --                 |             | `{ [key: string]: any; brand: string; category: string; currency: string; deliveryInfo: string; discount: string; freeShipping: string; groupPrices: string; hideAddToCart: string; hideGroupPrices: string; id: string; image: string; imageHover: string; imageUrl: string; inStock: string; itemGroupId: string; klevu_category: string; klevu_manual_boosting: number; klevu_bulk_boosting: number; klevu_selflearning_boosting: number; name: string; price: string; rating: number; salePrice: string; shortDesc: string; sku: string; score: number; startPrice: string; storeBaseCurrency: string; swatchesInfo: string; tags: string; toPrice: string; totalVariants: number; type: string; typeOfRecord: KlevuAnyTypeOfRecord; url: string; weight: string; swatches?: { id: string; color: string; swatchImage: string; image: string; numberOfAdditionalVariants: string; }[]; }` | `undefined` |
| `variant`         | `variant`          |             | `"default" \| "line" \| "small"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `"default"` |


## Events

| Event               | Description | Type                                                                |
| ------------------- | ----------- | ------------------------------------------------------------------- |
| `klevuProductClick` |             | `CustomEvent<{ product: KlevuRecord; originalEvent: MouseEvent; }>` |


## Shadow Parts

| Part      | Description |
| --------- | ----------- |
| `"image"` |             |


## Dependencies

### Used by

 - [klevu-product-grid](../klevu-product-grid)
 - [klevu-recommendations](../klevu-recommendations)

### Graph
```mermaid
graph TD;
  klevu-product-grid --> klevu-product
  klevu-recommendations --> klevu-product
  style klevu-product fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
