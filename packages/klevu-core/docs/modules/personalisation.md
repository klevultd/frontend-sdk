# personalisation
      
▸ **personalisation**(`options?`): `KlevuFetchModifer`

Enable personlisation to the query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` |  |
| `options.fields?` | [`KlevuRecordFields`](klevurecordfields.md)[] | This is an optional field. By default, Klevu will analyse all attributes of the records the customer has interacted with, in order to determine the common patterns. If you prefer to focus on particular aspects, for example brand or price, specify those attributes within this object. |
| `options.lastClickedProductIds?` | `string`[] | Override last clicked product id's with your own selection. First item should be the latest product clicked. By default @klevu/core uses internal store to keep track of last clicked products. It is important use KlevuEvent class to store all interactions. |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/personalisation/personalisation.ts:12](https://github.com/klevultd/frontend-sdk/blob/0515b77/packages/klevu-core/src/modifiers/personalisation/personalisation.ts#L12)

