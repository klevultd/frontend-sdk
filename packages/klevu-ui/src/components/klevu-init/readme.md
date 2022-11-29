# klevu-init

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                | Type                                                                                                                                                                                                                                                                                    | Default     |
| --------------------- | --------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `apiKey` _(required)_ | `api-key` | Read only API key to Klevu | `string`                                                                                                                                                                                                                                                                                | `undefined` |
| `settings`            | --        | Global settings            | `undefined \| ({ onProductClick?: ((product: Partial<KlevuRecord>, event: MouseEvent) => boolean) \| undefined; generateProductUrl?: ((product: Partial<KlevuRecord>) => string) \| undefined; renderPrice?: ((amount: string \| number, currency: string) => string) \| undefined; })` | `undefined` |
| `url` _(required)_    | `url`     | Klevu Server URL           | `string`                                                                                                                                                                                                                                                                                | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
