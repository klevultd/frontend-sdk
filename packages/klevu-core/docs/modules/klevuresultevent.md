# klevuresultevent
      
Ƭ **KlevuResultEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `categoryMerchandisingClickEvent?` | (`params`: { `categoryTitle`: `string` ; `override?`: `Partial`<`KlevuV1CategoryProductsView`\> ; `productId`: `string` ; `variantId?`: `string`  }) => `void` |
| `hooks` | [`KlevuResultEventOnResult`](klevuresulteventonresult.md)[] |
| `recommendationBannerClickEvent?` | (`params`: { `resolution`: ``"desktop"`` \| ``"mobile"``  }) => `void` |
| `recommendationClickEvent?` | (`params`: { `override?`: `Partial`<`KlevuRecommendationsEventV2Data`\> ; `productId`: `string` ; `variantId?`: `string`  }) => `void` |
| `searchClickEvent?` | (`params`: { `autoSendViewEvent?`: `boolean` ; `override?`: `Partial`<`V1SearchEvent`\> ; `productId`: `string` ; `variantId?`: `string`  }) => `void` |

#### Defined in

[models/KlevuResultEvent.ts:7](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuResultEvent.ts#L7)

