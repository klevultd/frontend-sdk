# klevu-pagination

<!-- Auto Generated Below -->


## Overview

Pagination component. Either provide numbers or query result to display the component.

## Properties

| Property      | Attribute | Description                                      | Type                                                                                                                                                                                                                                                                                                                                                                                                          | Default     |
| ------------- | --------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `current`     | `current` | Current page                                     | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                                         | `undefined` |
| `max`         | `max`     | Max page                                         | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                                         | `undefined` |
| `min`         | `min`     | Min page                                         | `number \| undefined`                                                                                                                                                                                                                                                                                                                                                                                         | `undefined` |
| `queryResult` | --        | Query results used to build min, max and current | `undefined \| { id: string; filters?: (KlevuFilterResultOptions \| KlevuFilterResultSlider)[] \| undefined; meta: { apiKey: string; isPersonalised: boolean; qTime: number; noOfResults: number; totalResultsFound: number; offset: number; typeOfSearch: KlevuTypeOfSearch; debuggingInformation: unknown; notificationCode: number; searchedTerm: string; }; records: ({ id: string; } & KlevuRecord)[]; }` | `undefined` |


## Events

| Event                   | Description                | Type                  |
| ----------------------- | -------------------------- | --------------------- |
| `klevuPaginationChange` | Page that was changed into | `CustomEvent<number>` |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"material-icon"` |             |


----------------------------------------------


