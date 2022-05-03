# klevualsoviewedquery
    `](modules.md#klevualsoviewedquery)

All possible record queries that can be used with [KlevuFetch](modules.md#klevufetch) function

#### Defined in

[models/KlevuAllRecordQueries.ts:9](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuAllRecordQueries.ts#L9)

`](modules.md#klevualsoviewedquery) & { `typeOfRequest`: [`AlsoBought`](enums/KlevuTypeOfRequest.md#alsobought)  }

Backend API parameters relevat for Also Bought Recommendation query

#### Defined in

[models/KlevuAlsoBoughtQuery.ts:8](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuAlsoBoughtQuery.ts#L8)



Ƭ **KlevuAlsoViewedQuery**: [`KlevuBaseQuery`](modules.md#klevubasequery) & { `settings?`: { `context?`: { `recentObjects`: { `records`: { `id`: `string`  }[] ; `typeOfRecord`: [`KlevuAnyTypeOfRecord`](modules.md#klevuanytypeofrecord)  }[]  }  } ; `typeOfRequest`: [`AlsoViewed`](enums/KlevuTypeOfRequest.md#alsoviewed)  }

Klevu API query specific for Also Viewed recommendation

#### Defined in

[models/KlevuAlsoViewedQuery.ts:7](https://github.com/klevultd/frontend-sdk/blob/f14d7e9/packages/klevu-core/src/models/KlevuAlsoViewedQuery.ts#L7)

