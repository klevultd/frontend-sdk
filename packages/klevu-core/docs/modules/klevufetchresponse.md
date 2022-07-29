# klevufetchresponse
      
Ƭ **KlevuFetchResponse**: `Object`

Tools for operating results in easier way.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiResponse` | ``null`` \| [`KlevuApiRawResponse`](klevuapirawresponse.md) | Raw response from Klevu API |
| `queriesById` | (`id`: `string`) => `KlevuFetchQueryResult` \| `undefined` | Get query result by id |
| `suggestionsById` | (`id`: `string`) => [`KlevuSuggestionResult`](klevusuggestionresult.md) \| `undefined` | Get suggestion by Id |

#### Defined in

[models/KlevuFetchResponse.ts:39](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/models/KlevuFetchResponse.ts#L39)

