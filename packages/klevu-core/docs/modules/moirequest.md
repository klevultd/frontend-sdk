# moirequest
      
Ƭ **MoiRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `context` | [`MoiContext`](moicontext.md) |
| `feedback?` | { `messageId`: `string` ; `reason?`: `string` ; `thumbs?`: ``"UP"`` \| ``"DOWN"``  } |
| `feedback.messageId` | `string` |
| `feedback.reason?` | `string` |
| `feedback.thumbs?` | ``"UP"`` \| ``"DOWN"`` |
| `filter?` | { `value`: `string`  } |
| `filter.value` | `string` |
| `klevuSettings?` | `Omit`<[`KlevuBaseQuerySettings`](klevubasequerysettings.md), ``"query"``\> |
| `message?` | `string` |
| `product?` | { `context`: { `url`: `string`  } ; `id`: `string` ; `intent`: `string`  } |
| `product.context` | { `url`: `string`  } |
| `product.context.url` | `string` |
| `product.id` | `string` |
| `product.intent` | `string` |

#### Defined in

[connection/moi/moi.ts:19](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L19)

