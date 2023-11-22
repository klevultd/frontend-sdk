# klevuapirawresponse
      
Ƭ **KlevuApiRawResponse**: `Object`

Raw response from Klevu API

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta` | { `error?`: `any` ; `qTime`: `number` ; `responseCode`: `number`  } |
| `meta.error?` | `any` |
| `meta.qTime` | `number` |
| `meta.responseCode` | `number` |
| `queryResults?` | [`KlevuQueryResult`](klevuqueryresult.md)[] |
| `suggestionResults?` | [`KlevuSuggestionResult`](klevusuggestionresult.md)[] |

#### Defined in

[models/KlevuApiRawResponse.ts:185](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L185)

