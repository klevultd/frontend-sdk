# search
      
▸ **search**(`term`, `options?`, ...`modifiers`): [`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md)

Create a basic search to Klevu backend. Default ID for this query is `search`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | Search term from input |
| `options?` | `Partial`<[`SearchOptions`](searchoptions.md)\> | [SearchOptions](searchoptions.md) |
| `...modifiers` | `KlevuFetchModifer`[] | - |

#### Returns

[`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md)

#### Defined in

[queries/search/search.ts:38](https://github.com/klevultd/frontend-sdk/blob/d712c6c/packages/klevu-core/src/queries/search/search.ts#L38)

