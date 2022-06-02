# kmcrecommendation
      
▸ **kmcRecommendation**(`recommendationId`, `options?`, ...`modifiers`): `Promise`<[`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md)\>

Fetches products based on KMC recommendation. Provide id created in KMC

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recommendationId` | `string` | Id of recommendation in the backend |
| `options?` | `Partial`<`Options`\> | - |
| `...modifiers` | `KlevuFetchModifer`[] | - |

#### Returns

`Promise`<[`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md)\>

#### Defined in

[queries/kmcRecommendation/kmcRecommendation.ts:137](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/queries/kmcRecommendation/kmcRecommendation.ts#L137)

