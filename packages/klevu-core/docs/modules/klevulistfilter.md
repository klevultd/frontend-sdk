# klevulistfilter
    `](modules.md#klevulistfilter) & [`KlevuApplyFilter`](modules.md#klevuapplyfilter) | - |
| `id` | `string` | - |
| `isFallbackQuery?` | `boolean` | - |
| `settings?` | [`KlevuBaseQuerySettings`](modules.md#klevubasequerysettings) | - |
| `typeOfRequest` | [`KlevuTypeOfRequest`](enums/KlevuTypeOfRequest.md) | - |

#### Defined in

[models/KlevuBaseQuery.ts:11](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuBaseQuery.ts#L11)



Ƭ **KlevuListFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `filtersToReturn?` | { `enabled`: `boolean` ; `exclude?`: `string`[] ; `include?`: `string`[] ; `options`: { `limit?`: `number` ; `mincount?`: `number` ; `order`: [`KlevuFilterOrder`](enums/KlevuFilterOrder.md)  } ; `rangeFilterSettings?`: [`KlevuRangeFilterSettings`](modules.md#klevurangefiltersettings)[]  } |
| `filtersToReturn.enabled` | `boolean` |
| `filtersToReturn.exclude?` | `string`[] |
| `filtersToReturn.include?` | `string`[] |
| `filtersToReturn.options` | { `limit?`: `number` ; `mincount?`: `number` ; `order`: [`KlevuFilterOrder`](enums/KlevuFilterOrder.md)  } |
| `filtersToReturn.options.limit?` | `number` |
| `filtersToReturn.options.mincount?` | `number` |
| `filtersToReturn.options.order` | [`KlevuFilterOrder`](enums/KlevuFilterOrder.md) |
| `filtersToReturn.rangeFilterSettings?` | [`KlevuRangeFilterSettings`](modules.md#klevurangefiltersettings)[] |

#### Defined in

[models/KlevuListFilter.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuListFilter.ts#L4)

