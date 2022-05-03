# klevufetchfunctionreturnvalue
      
Ƭ **KlevuFetchFunctionReturnValue**: `Object`

What functions passed to KlevuFetch should implement

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `configOverride?` | [`KlevuConfig`](classes/KlevuConfig.md) | Pass down the if config has been overridden. |
| `klevuFunctionId` | `KlevuFetchTypeId` | Id of function. Used only internally |
| `modifiers?` | `KlevuFetchModifer`[] | List of modifiers set for this function |
| `params?` | `unknown` | Anything you wish to pass down as params incoming to function |
| `queries?` | [`KlevuAllRecordQueries`](klevuallrecordqueries.md)[] | What queries should KlevuFetch do to backend |
| `suggestions?` | [`KlevuSuggestionQuery`](klevusuggestionquery.md)[] | What suggestions queries should do to backend |

#### Defined in

[queries/index.ts:22](https://github.com/klevultd/frontend-sdk/blob/0515b77/packages/klevu-core/src/queries/index.ts#L22)

