# boostwithfiltermanager
      
▸ **boostWithFilterManager**(`manager`, `weights`): `KlevuFetchModifer`

Boost query with currect selection of filter manager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `manager` | [`FilterManager`](classes/FilterManager.md) | Instance of filter manager to use for selection of current values |
| `weights` | { `key`: `string` ; `weight`: `number`  }[] | Tell the weight of each filter |

#### Returns

`KlevuFetchModifer`

KlevuModifier that be used to modify query

#### Defined in

[modifiers/boostWithFilterManager/boostWithFilterManager.ts:13](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/modifiers/boostWithFilterManager/boostWithFilterManager.ts#L13)

