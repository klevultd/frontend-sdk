# advancedsorting
      
▸ **advancedSorting**(`sorts`): `KlevuFetchModifer`

Set advanced sorting to request.
Does not apply if sort is something else than AdvancedSort or undefined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sorts` | `undefined` \| { `key`: `string` ; `order`: [`AdvancedSortingDiretion`](enums/AdvancedSortingDiretion.md) ; `type`: ``"FIELD"``  }[] | Array of sorts to apply to the query. |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/advancedSorting/advancedSorting.ts:13](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/modifiers/advancedSorting/advancedSorting.ts#L13)

