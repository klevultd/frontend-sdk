# klevukmcrecommendationoptions
      
Ƭ **KlevuKMCRecommendationOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartProductIds?` | `string`[] | If KMC recommendation is Checkout page based then its required to provide productIds that are currently in the cart |
| `categoryPath?` | `string` | If KMC recommendation is category based then category path is required. Requires categories to be separated with semicolon. For example "Mens;Shoes" |
| `currentProductId?` | `string` | If KMC recommendation is Product based then it is required to pass current pages product id |
| `id` | `string` | - |
| `itemGroupId?` | `string` | If KMC recommendation is Product based then Item group id (the parent id) is required information. |

#### Defined in

[queries/kmcRecommendation/kmcRecommendation.ts:12](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/queries/kmcRecommendation/kmcRecommendation.ts#L12)

