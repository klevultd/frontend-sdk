# klevu-init

<!-- Auto Generated Below -->


## Overview

`klevu-init` is the most important component of the whole library. Place one in your document. It should be
one of the first ones in the `<body>` tag. Currently only one `klevu-init` per page is supported. It is used to define
configuration for all components on the page and provide few global settings for all components:

- **onItemClick:** what happens when product is clicked. Typically this places default action of
  _klevu-product_ click. For example you can make your own frontend router to act in this function. Is
  provided with product and click event as attributes. Remember to preventDefault and return false to prevent anchor
  link following.
- **generateProductUrl:** what kind of URL's should be generated for products. If _onItemClick_
  is not used this can be used for it. Has product as attribute.
- **renderPrice:** generic function for price rendering. If you wish to have your own formatting for price
  rendering then this is the place. Has two attribute amount and currency of item.
Initializes components to fetch data from correct Klevu backend

Klevu init also initializes Google Material Icon font. It automatically injects the font to the page.

**Note: All global CSS variables are documented in `klevu-init` even thought they are not defined in it.**

## Properties

| Property              | Attribute | Description                | Type                                                                                                                                                                                                                                                                              | Default     |
| --------------------- | --------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `apiKey` _(required)_ | `api-key` | Read only API key to Klevu | `string`                                                                                                                                                                                                                                                                          | `undefined` |
| `settings`            | --        | Global settings            | `undefined \| ({ onItemClick?: ((item: Partial<KlevuRecord>, event: MouseEvent) => boolean) \| undefined; generateProductUrl?: ((product: Partial<KlevuRecord>) => string) \| undefined; renderPrice?: ((amount: string \| number, currency: string) => string) \| undefined; })` | `undefined` |
| `url` _(required)_    | `url`     | Klevu Server URL           | `string`                                                                                                                                                                                                                                                                          | `undefined` |


## Methods

### `getConfig() => Promise<any>`



#### Returns

Type: `Promise<any>`

KlevuConfig, but due to typescript problems it is any


----------------------------------------------


