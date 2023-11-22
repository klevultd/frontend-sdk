# imagesearch
      
▸ **imageSearch**(`image`, `options?`, `...modifiers`): `Promise`<[`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md)\>

Uploads the image if blob passed or uses url to perform search

**`Throws`**

Error when image upload fails or when no url/blob is passed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `string` \| `Blob` | Pass a url or the image blob for search |
| `options?` | `Partial`<[`KlevuSearchOptions`](klevusearchoptions.md)\> | [KlevuSearchOptions](klevusearchoptions.md) |
| `...modifiers` | `KlevuFetchModifer`[] | - |

#### Returns

`Promise`<[`KlevuFetchFunctionReturnValue`](klevufetchfunctionreturnvalue.md)\>

#### Defined in

[queries/imageSearch/imageSearch.ts:18](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/queries/imageSearch/imageSearch.ts#L18)

