# klevufetchfunctionparams
      
Ƭ **KlevuFetchFunctionParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `abtest?` | { `abTestId`: `string` ; `abTestVariantId`: `string`  } | A/B test information of request |
| `abtest.abTestId` | `string` | - |
| `abtest.abTestVariantId` | `string` | - |
| `category?` | `string` | Which category merchandising was called |
| `id?` | `string` | Current id of function |
| `kmcConfig?` | [`KlevuKMCRecommendations`](klevukmcrecommendations.md) | KMC recommendation information |
| `searchSendEventSent?` | `boolean` | If true modifier has sent a search event already |
| `term?` | `string` | term used in the search |

#### Defined in

[queries/index.ts:18](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/queries/index.ts#L18)

