# applyfilters
    ?` | { `filters`: { `key`: `string` ; `settings?`: { `singleSelect`: `boolean`  } ; `values`: `string`[] \| [`number`, `number`]  }[]  } |
| `applyFilters.filters` | { `key`: `string` ; `settings?`: { `singleSelect`: `boolean`  } ; `values`: `string`[] \| [`number`, `number`]  }[] |

#### Defined in

[models/KlevuApplyFilter.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApplyFilter.ts#L4)



▸ **applyFilters**(`filters`): `KlevuFetchModifer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`ApplyFilter`](modules.md#applyfilter)[] |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/applyFilter/applyFilter.ts:21](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/applyFilter/applyFilter.ts#L21)

