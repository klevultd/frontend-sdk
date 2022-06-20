# klevufetchresponse
      
Ƭ **KlevuFetchResponse**: `Object`

Tools for operating results in easier way.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiResponse` | ``null`` \| [`KlevuApiRawResponse`](klevuapirawresponse.md) | Raw response from Klevu API |
| `queriesById` | (`id`: `string`) => `undefined` \| `KlevuFetchQueryResult` | Get query result by id |
| `suggestionsById` | (`id`: `string`) => `undefined` \| [`KlevuSuggestionResult`](klevusuggestionresult.md) | Get suggestion by Id |

#### Defined in

[models/KlevuFetchResponse.ts:39](https://github.com/klevultd/frontend-sdk/blob/4665e27/packages/klevu-core/src/models/KlevuFetchResponse.ts#L39)

