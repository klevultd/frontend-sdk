# moisession
      
Ƭ **MoiSession**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clear` | () => `void` |
| `genericOptions` | `MoiResponseGenericOptions`[``"genericOptions"``] |
| `menu` | `MoiMenuOptions`[``"menuOptions"``] |
| `messages` | (`MoiResponseText` \| `MoiResponseFilter` \| `MoiProducts` \| `MoiLocalMessage`)[] |
| `query` | (`request`: `Omit`<[`MoiRequest`](moirequest.md), ``"context"``\>) => `Promise`<[`MoiResponse`](moiresponse.md)\> |

#### Defined in

[connection/moi/moi.ts:137](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/connection/moi/moi.ts#L137)

