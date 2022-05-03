# suggestions
    ?` | [`KlevuSuggestionQuery`](modules.md#klevusuggestionquery)[] | What suggestions queries should do to backend |

#### Defined in

[queries/index.ts:22](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/index.ts#L22)

ById` | (`id`: `string`) => `undefined` \| [`KlevuSuggestionResult`](modules.md#klevusuggestionresult) | Get suggestion by Id |

#### Defined in

[models/KlevuFetchResponse.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuFetchResponse.ts#L9)

?` | [`KlevuSuggestionQuery`](modules.md#klevusuggestionquery)[] |

#### Defined in

[models/KlevuPayload.ts:4](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuPayload.ts#L4)

` | { `suggest`: `string`  }[] |

#### Defined in

[models/KlevuSuggestionResult.ts:1](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuSuggestionResult.ts#L1)



▸ **suggestions**(`term`, `options?`): [`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

Return suggestion on given search term

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `term` | `string` | search term |
| `options?` | `Partial`<`Options`\> |  |

#### Returns

[`KlevuFetchFunctionReturnValue`](modules.md#klevufetchfunctionreturnvalue)

#### Defined in

[queries/suggestions/suggestions.ts:24](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/queries/suggestions/suggestions.ts#L24)

