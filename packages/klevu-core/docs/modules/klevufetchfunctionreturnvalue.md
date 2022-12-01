# klevufetchfunctionreturnvalue
      
Ƭ **KlevuFetchFunctionReturnValue**: `Object`

What functions passed to KlevuFetch should implement

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `configOverride?` | [`KlevuConfig`](classes/KlevuConfig.md) | Pass down the if config has been overridden. |
| `klevuFunctionId` | `KlevuFetchTypeId` | Id of function. Used only internally |
| `modifiers?` | `KlevuFetchModifer`[] | List of modifiers set for this function |
| `params?` | [`KlevuFecthFunctionParams`](klevufecthfunctionparams.md) | Some of the functions pass metadata that can be used in other places |
| `queries?` | [`KlevuAllRecordQueries`](klevuallrecordqueries.md)[] | What queries should KlevuFetch do to backend |
| `suggestions?` | [`KlevuSuggestionQuery`](klevusuggestionquery.md)[] | What suggestions queries should do to backend |

#### Defined in

[queries/index.ts:51](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/queries/index.ts#L51)

