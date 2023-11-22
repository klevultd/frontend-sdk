# sendrecommendationviewevent
      
▸ **sendRecommendationViewEvent**(`eventData?`, `override?`): `KlevuFetchModifer`

This modifier should be used with all recommendation requests. It sends
correct event data to klevu backend on recommendation view

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventData?` | `Partial`<{ `action?`: ``null`` \| ``"STATIC_CONTENT"`` \| ``"HIDE_RECOMMENDATION"`` \| ``"FILTER"`` ; `enabled`: `boolean` ; `logic`: [`KMCRecommendationLogic`](enums/KMCRecommendationLogic.md) ; `maxProducts`: `number` ; `pageType`: `KMCRecommendationPagetype` ; `productThreshold`: `number` ; `recsKey`: `string` ; `segmentKey`: ``null`` \| `string` ; `segmentName`: ``null`` \| `string` ; `spotKey`: `string` ; `spotName`: `string` ; `title`: `string`  }\> & `Pick`<{ `action?`: ``null`` \| ``"STATIC_CONTENT"`` \| ``"HIDE_RECOMMENDATION"`` \| ``"FILTER"`` ; `enabled`: `boolean` ; `logic`: [`KMCRecommendationLogic`](enums/KMCRecommendationLogic.md) ; `maxProducts`: `number` ; `pageType`: `KMCRecommendationPagetype` ; `productThreshold`: `number` ; `recsKey`: `string` ; `segmentKey`: ``null`` \| `string` ; `segmentName`: ``null`` \| `string` ; `spotKey`: `string` ; `spotName`: `string` ; `title`: `string`  }, ``"logic"`` \| ``"recsKey"`` \| ``"title"``\> |
| `override?` | `Partial`<`KlevuRecommendationsEventV2Data`\> |

#### Returns

`KlevuFetchModifer`

#### Defined in

[modifiers/sendRecommendationViewEvent/sendRecommendationViewEvent.ts:25](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/modifiers/sendRecommendationViewEvent/sendRecommendationViewEvent.ts#L25)

