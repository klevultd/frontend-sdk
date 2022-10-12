# klevukmcsettings
      
▸ **KlevuKMCSettings**(`ignoreCache?`): `Promise`<{ `banner?`: [`KMCBannerRootObject`](interfaces/KMCBannerRootObject.md) ; `maps?`: [`KMCMapsRootObject`](interfaces/KMCMapsRootObject.md) ; `root?`: [`KMCRootObject`](interfaces/KMCRootObject.md)  }\>

Fetches KMC settings from server. Caches data for a day.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ignoreCache?` | `boolean` | If true, will ignore cache and fetch data from server |

#### Returns

`Promise`<{ `banner?`: [`KMCBannerRootObject`](interfaces/KMCBannerRootObject.md) ; `maps?`: [`KMCMapsRootObject`](interfaces/KMCMapsRootObject.md) ; `root?`: [`KMCRootObject`](interfaces/KMCRootObject.md)  }\>

#### Defined in

[connection/kmc.ts:20](https://github.com/klevultd/frontend-sdk/blob/58d63d7/packages/klevu-core/src/connection/kmc.ts#L20)

