# klevukmcrecommendations
      
Ƭ **KlevuKMCRecommendations**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `metadata` | { `action?`: ``"STATIC_CONTENT"`` \| ``"HIDE_RECOMMENDATION"`` \| ``"FILTER"`` \| ``null`` ; `enabled`: `boolean` ; `logic`: [`KMCRecommendationLogic`](enums/KMCRecommendationLogic.md) ; `maxProducts`: `number` ; `pageType`: `KMCRecommendationPagetype` ; `productThreshold`: `number` ; `recsKey`: `string` ; `segmentKey`: `string` \| ``null`` ; `segmentName`: `string` \| ``null`` ; `spotKey`: `string` ; `spotName`: `string` ; `title`: `string`  } |
| `metadata.action?` | ``"STATIC_CONTENT"`` \| ``"HIDE_RECOMMENDATION"`` \| ``"FILTER"`` \| ``null`` |
| `metadata.enabled` | `boolean` |
| `metadata.logic` | [`KMCRecommendationLogic`](enums/KMCRecommendationLogic.md) |
| `metadata.maxProducts` | `number` |
| `metadata.pageType` | `KMCRecommendationPagetype` |
| `metadata.productThreshold` | `number` |
| `metadata.recsKey` | `string` |
| `metadata.segmentKey` | `string` \| ``null`` |
| `metadata.segmentName` | `string` \| ``null`` |
| `metadata.spotKey` | `string` |
| `metadata.spotName` | `string` |
| `metadata.title` | `string` |
| `scripts` | { `recsObject?`: `unknown`  } |
| `scripts.recsObject?` | `unknown` |
| `search` | { `basePath`: `string` ; `payload`: `string` ; `recsAction?`: ``"STATIC_CONTENT"`` \| ``"HIDE_RECOMMENDATION"`` \| ``"FILTER"``  } |
| `search.basePath` | `string` |
| `search.payload` | `string` |
| `search.recsAction?` | ``"STATIC_CONTENT"`` \| ``"HIDE_RECOMMENDATION"`` \| ``"FILTER"`` |
| `staticContent?` | { `contentType`: ``"image"`` ; `image`: { `altTag`: `string` ; `maxWidth`: `number` ; `resolution`: `string` ; `url`: `string`  }[] ; `targetUrl`: `string`  }[] |
| `styles` | { `base`: `string`  } |
| `styles.base` | `string` |
| `templates` | { `base`: `string`  } |
| `templates.base` | `string` |

#### Defined in

[queries/kmcRecommendation/kmcRecommendation.ts:61](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/queries/kmcRecommendation/kmcRecommendation.ts#L61)

