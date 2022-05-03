# klevuresultevent
    `](modules.md#klevuresultevent) | Get query result by id |
| `suggestionsById` | (`id`: `string`) => `undefined` \| [`KlevuSuggestionResult`](modules.md#klevusuggestionresult) | Get suggestion by Id |

#### Defined in

[models/KlevuFetchResponse.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuFetchResponse.ts#L9)



Ƭ **KlevuResultEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getCategoryMerchandisingClickSendEvent?` | () => (`productId`: `string`, `categoryTitle`: `string`, `variantId?`: `string`) => `void` |
| `getRecommendationClickSendEvent?` | () => (`productId`: `string`, `variantId?`: `string`) => `void` |
| `getSearchClickSendEvent?` | () => (`productId`: `string`, `variantId?`: `string`) => `void` |

#### Defined in

[models/KlevuResultEvent.ts:1](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuResultEvent.ts#L1)

