# klevu-init

<!-- Auto Generated Below -->


## Overview

Initializes components to fetch data from correct Klevu backend


Note: All global CSS variables are documented in `klevu-init` even thought they are not defined in it.

## Properties

| Property              | Attribute | Description                | Type                                                                                                                                                                                                                                                                              | Default     |
| --------------------- | --------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `apiKey` _(required)_ | `api-key` | Read only API key to Klevu | `string`                                                                                                                                                                                                                                                                          | `undefined` |
| `settings`            | --        | Global settings            | `undefined \| ({ onItemClick?: ((item: Partial<KlevuRecord>, event: MouseEvent) => boolean) \| undefined; generateProductUrl?: ((product: Partial<KlevuRecord>) => string) \| undefined; renderPrice?: ((amount: string \| number, currency: string) => string) \| undefined; })` | `undefined` |
| `url` _(required)_    | `url`     | Klevu Server URL           | `string`                                                                                                                                                                                                                                                                          | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
