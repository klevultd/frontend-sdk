# klevukmcsettings
      
▸ **KlevuKMCSettings**(`ignoreCache?`, `cacheLength?`): `Promise`<{ `banner?`: [`KMCBannerRootObject`](interfaces/KMCBannerRootObject.md) ; `maps?`: [`KMCMapsRootObject`](interfaces/KMCMapsRootObject.md) ; `root?`: [`KMCRootObject`](interfaces/KMCRootObject.md)  }\>

Fetches KMC settings from server. Caches data for a day.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ignoreCache?` | `boolean` | `undefined` | If true, will ignore cache and fetch data from server |
| `cacheLength` | `number` | `ONE_DAY` | How long to cache data in milliseconds |

#### Returns

`Promise`<{ `banner?`: [`KMCBannerRootObject`](interfaces/KMCBannerRootObject.md) ; `maps?`: [`KMCMapsRootObject`](interfaces/KMCMapsRootObject.md) ; `root?`: [`KMCRootObject`](interfaces/KMCRootObject.md)  }\>

#### Defined in

[connection/kmc.ts:21](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/kmc.ts#L21)

