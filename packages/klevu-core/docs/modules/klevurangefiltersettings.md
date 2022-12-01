# klevurangefiltersettings
      
Ƭ **KlevuRangeFilterSettings**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | This is the identifier of your numerical attribute, eg. 'klevu_price'. |
| `minMax` | `boolean` | If set to true, the Klevu Search engine calculates the minimum and maximum values for this filter for use with a slider. |
| `rangeInterval?` | `number` | If a positive value is provided, the Klevu Search engine will calculate ranges for this value. For example a value of 100 would give ranges from 0 to 99, 100 to 299, etc. |

#### Defined in

[models/KlevuRangeFilterSettings.ts:1](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/models/KlevuRangeFilterSettings.ts#L1)

