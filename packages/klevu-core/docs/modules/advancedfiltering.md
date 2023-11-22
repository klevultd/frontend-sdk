# advancedfiltering
      
▸ **advancedFiltering**(`conditions`, `filterType?`): `KlevuFetchModifer`

Create advanced filtering to the query.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `conditions` | { `excludeValuesInResult?`: `boolean` ; `key`: `string` ; `singleSelect`: `boolean` ; `valueOperator`: ``"INCLUDE"`` \| ``"EXCLUDE"`` ; `values`: `string`[]  }[] | `undefined` | Array of conditions to apply to the query. |
| `filterType` | ``"ALL_OF"`` \| ``"ANY_OF"`` \| ``"NONE_OF"`` | `"ALL_OF"` | How conditions should be applied. Default is ALL_OF |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/advancedFiltering/advancedFiltering.ts:12](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/modifiers/advancedFiltering/advancedFiltering.ts#L12)

