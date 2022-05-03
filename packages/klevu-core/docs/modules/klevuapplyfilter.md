# klevuapplyfilter
    

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

