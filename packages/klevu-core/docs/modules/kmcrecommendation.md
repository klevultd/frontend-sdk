# kmcrecommendation
    s

Ƭ **KlevuKMCRecommendations**: `KlevuKMCHomeRecommendation` \| `KlevuKMCCategoryRecommendation` \| `KlevuKMCProductPageRecommendation` \| `KlevuKMCCheckoutRecommendation`

#### Defined in

[queries/kmcRecommendation/kmcRecommendation.ts:119](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/kmcRecommendation/kmcRecommendation.ts#L119)

s`](modules.md#klevukmcrecommendations)[``"metadata"``], ``"recsKey"`` \| ``"logic"`` \| ``"title"``\>

#### Defined in

[events/KlevuEvents.ts:18](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/events/KlevuEvents.ts#L18)



▸ **kmcRecommendation**(`recommendationId`, `options?`, ...`modifiers`): `Promise`<[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)\>

Fetches products based on

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommendationId` | `string` | Id of recommendation in the backend |
| `options?` | `Partial`<`Options`\> | - |
| `...modifiers` | `KlevuFetchModifer`[] | - |

#### Returns

`Promise`<[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)\>

#### Defined in

[queries/kmcRecommendation/kmcRecommendation.ts:132](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/kmcRecommendation/kmcRecommendation.ts#L132)

