# applyfilter
    

Ƭ **ApplyFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `settings?` | { `singleSelect`: `boolean`  } |
| `settings.singleSelect` | `boolean` |
| `values` | `string`[] \| [`number`, `number`] |

#### Defined in

[modifiers/applyFilter/applyFilter.ts:5](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/applyFilter/applyFilter.ts#L5)



Ƭ **KlevuApplyFilter**: `Object`

Apply Filter type for Klevu base query

#### Type declaration

| Name | Type |
| :------ | :------ |
| `applyFilters?` | { `filters`: { `key`: `string` ; `settings?`: { `singleSelect`: `boolean`  } ; `values`: `string`[] \| [`number`, `number`]  }[]  } |
| `applyFilters.filters` | { `key`: `string` ; `settings?`: { `singleSelect`: `boolean`  } ; `values`: `string`[] \| [`number`, `number`]  }[] |

#### Defined in

[models/KlevuApplyFilter.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApplyFilter.ts#L4)

`](modules.md#klevuapplyfilter) | - |
| `id` | `string` | - |
| `isFallbackQuery?` | `boolean` | - |
| `settings?` | [`KlevuBaseQuerySettings`](modules.md#klevubasequerysettings) | - |
| `typeOfRequest` | [`KlevuTypeOfRequest`](enums/KlevuTypeOfRequest.md) | - |

#### Defined in

[models/KlevuBaseQuery.ts:11](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuBaseQuery.ts#L11)

WithManager

▸ **applyFilterWithManager**(`manager`): `KlevuFetchModifer`

Apply filters to query based on Filter Manager

#### Parameters

| Name | Type |
| :------ | :------ |
| `manager` | [`FilterManager`](classes/FilterManager.md) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/applyFilterWithManager/applyFilterWithManager.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/applyFilterWithManager/applyFilterWithManager.ts#L12)

s

▸ **applyFilters**(`filters`): `KlevuFetchModifer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`ApplyFilter`](modules.md#applyfilter)[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/applyFilter/applyFilter.ts:21](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/applyFilter/applyFilter.ts#L21)

