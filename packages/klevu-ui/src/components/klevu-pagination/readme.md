# klevu-pagination

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute   | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                          | Default      |
| ------------- | ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `current`     | `current`   |             | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                                         | `undefined`  |
| `max`         | `max`       |             | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                                         | `undefined`  |
| `min`         | `min`       |             | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                                         | `undefined`  |
| `nextNext`    | `next-next` |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                      | `"Next"`     |
| `prevText`    | `prev-text` |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                      | `"Previous"` |
| `queryResult` | --          |             | `undefined \| { id: string; filters?: (KlevuFilterResultOptions \| KlevuFilterResultSlider)[] \| undefined; meta: { apiKey: string; isPersonalised: boolean; qTime: number; noOfResults: number; totalResultsFound: number; offset: number; typeOfSearch: KlevuTypeOfSearch; debuggingInformation: unknown; notificationCode: number; searchedTerm: string; }; records: ({ id: string; } & KlevuRecord)[]; }` | `undefined`  |


## Events

| Event                   | Description                | Type                  |
| ----------------------- | -------------------------- | --------------------- |
| `klevuPaginationChange` | Page that was changed into | `CustomEvent<number>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
