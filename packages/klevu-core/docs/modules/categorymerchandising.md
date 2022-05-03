# categorymerchandising
    ClickSendEvent?` | () => (`productId`: `string`, `categoryTitle`: `string`, `variantId?`: `string`) => `void` |
| `getRecommendationClickSendEvent?` | () => (`productId`: `string`, `variantId?`: `string`) => `void` |
| `getSearchClickSendEvent?` | () => (`productId`: `string`, `variantId?`: `string`) => `void` |

#### Defined in

[models/KlevuResultEvent.ts:1](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuResultEvent.ts#L1)



▸ **categoryMerchandising**(`category`, `options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

Fetch products for a category listing page.

#### Parameters

| Name | Type |
| :------ | :------ |
| `category` | `undefined` \| `string` |
| `options?` | `Partial`<`Options`\> |
| `...modifiers` | `KlevuFetchModifer`[] |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/categoryMerchandising/categoryMerchandising.ts:28](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/categoryMerchandising/categoryMerchandising.ts#L28)

