# klevuqueryresult
    `](modules.md#klevuqueryresult)[] |
| `suggestionResults?` | [`KlevuSuggestionResult`](modules.md#klevusuggestionresult)[] |

#### Defined in

[models/KlevuApiRawResponse.ts:140](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L140)

`](modules.md#klevuqueryresult) & [`KlevuResultEvent`](modules.md#klevuresultevent) | Get query result by id |
| `suggestionsById` | (`id`: `string`) => `undefined` \| [`KlevuSuggestionResult`](modules.md#klevusuggestionresult) | Get suggestion by Id |

#### Defined in

[models/KlevuFetchResponse.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuFetchResponse.ts#L9)



Ƭ **KlevuQueryResult**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filters?` | ([`KlevuFilterResultOptions`](modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](modules.md#klevufilterresultslider))[] | Currently available filters |
| `id` | `string` | Id used when defining query |
| `meta` | { `apiKey`: `string` ; `debuggingInformation`: `unknown` ; `isPersonalised`: `boolean` ; `noOfResults`: `number` ; `notificationCode`: `number` ; `offset`: `number` ; `qTime`: `number` ; `searchedTerm`: `string` ; `totalResultsFound`: `number` ; `typeOfSearch`: [`KlevuTypeOfSearch`](enums/KlevuTypeOfSearch.md)  } | - |
| `meta.apiKey` | `string` | Klevu API key |
| `meta.debuggingInformation` | `unknown` | Information that can be useful for debugging the query. For example, the actual query that was fired by the Klevu Search engine, inclusive of any synonyms or de-compounded words taken into consideration. |
| `meta.isPersonalised` | `boolean` | - |
| `meta.noOfResults` | `number` | The number of results requested to be returned for this query. |
| `meta.notificationCode` | `number` | This may be populated with a code if any actions were taken on the record. Possible values are: 1: Nothing to report. 2: The price of the record is using the base currency. |
| `meta.offset` | `number` | The index of the first result returned in this response. |
| `meta.qTime` | `number` | The time taken by the Klevu Search engine to fetch the response. |
| `meta.searchedTerm` | `string` | The search term submitted for this query. |
| `meta.totalResultsFound` | `number` | The total number of results found for this query. |
| `meta.typeOfSearch` | [`KlevuTypeOfSearch`](enums/KlevuTypeOfSearch.md) | The query type that was executed by Klevu to retrieve the results. |
| `records` | { `id`: `string`  } & [`KlevuRecord`](modules.md#klevurecord)[] | - |

#### Defined in

[models/KlevuApiRawResponse.ts:75](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L75)

`](modules.md#klevuqueryresult) |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/injectFilterResult/injectFilterResult.ts:12](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/modifiers/injectFilterResult/injectFilterResult.ts#L12)

