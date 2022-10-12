# klevuqueryresult
      
Ƭ **KlevuQueryResult**: `Object`

Raw query object from api

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filters?` | ([`KlevuFilterResultOptions`](klevufilterresultoptions.md) \| [`KlevuFilterResultSlider`](klevufilterresultslider.md))[] | Currently available filters |
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
| `records` | { `id`: `string`  } & [`KlevuRecord`](klevurecord.md)[] | - |

#### Defined in

[models/KlevuApiRawResponse.ts:81](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/models/KlevuApiRawResponse.ts#L81)

