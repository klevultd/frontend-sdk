# klevuannotations
      
Ƭ **KlevuAnnotations**: `Object`

Fetch query results

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `annotations?` | { `fullTerm?`: `string` ; `subjects?`: `string`[]  } | Object containing the processed data |
| `annotations.fullTerm?` | `string` | Full term extracted from query |
| `annotations.subjects?` | `string`[] | Subjects extracted from query |
| `apiKey?` | `string` | Api key that was used |
| `qTime?` | `number` | Query time for error processing |
| `responseMessage?` | `string` | Response Message to for error processing |

#### Defined in

[models/KlevuFetchResponse.ts:45](https://github.com/klevultd/frontend-sdk/blob/1b37b18/packages/klevu-core/src/models/KlevuFetchResponse.ts#L45)

