# klevuresultevent
      
Ƭ **KlevuResultEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getCategoryMerchandisingClickSendEvent?` | () => (`productId`: `string`, `categoryTitle`: `string`, `variantId?`: `string`, `override?`: `Partial`<`KlevuV1CategoryProductsView`\>) => `void` |
| `getRecommendationClickSendEvent?` | () => (`productId`: `string`, `variantId?`: `string`, `override?`: `Partial`<`KlevuEventV2Data`\>) => `void` |
| `getSearchClickSendEvent?` | () => (`productId`: `string`, `variantId?`: `string`, `override?`: `Partial`<`V1SearchEvent`\>) => `void` |

#### Defined in

[models/KlevuResultEvent.ts:7](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/models/KlevuResultEvent.ts#L7)

