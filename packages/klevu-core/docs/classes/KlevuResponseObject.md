[@klevu/core]() / [Exports](../modules.md) / KlevuResponseObject

# Class: KlevuResponseObject

This class is used to access the response data from Klevu API
It builds up the state of the result and it can be used to do various things with the data

## Table of contents

### Constructors

- [constructor](KlevuResponseObject.md#constructor)

### Properties

- [#functions](KlevuResponseObject.md##functions)
- [#queryObjects](KlevuResponseObject.md##queryobjects)
- [apiResponse](KlevuResponseObject.md#apiresponse)

### Methods

- [#buildQueryObjects](KlevuResponseObject.md##buildqueryobjects)
- [queriesById](KlevuResponseObject.md#queriesbyid)
- [queryExists](KlevuResponseObject.md#queryexists)
- [suggestionsById](KlevuResponseObject.md#suggestionsbyid)

## Constructors

### constructor

• **new KlevuResponseObject**(`response`, `functions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`KlevuApiRawResponse`](../modules.md#klevuapirawresponse) |
| `functions` | [`KlevuFetchFunctionReturnValue`](../modules.md#klevufetchfunctionreturnvalue)[] |

#### Defined in

[connection/responseObject.ts:14](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseObject.ts#L14)

## Properties

### #functions

• `Private` **#functions**: [`KlevuFetchFunctionReturnValue`](../modules.md#klevufetchfunctionreturnvalue)[]

#### Defined in

[connection/responseObject.ts:11](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseObject.ts#L11)

___

### #queryObjects

• `Private` **#queryObjects**: `Object` = `{}`

#### Index signature

▪ [id: `string`]: [`KlevuResponseQueryObject`](KlevuResponseQueryObject.md)

#### Defined in

[connection/responseObject.ts:12](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseObject.ts#L12)

___

### apiResponse

• **apiResponse**: [`KlevuApiRawResponse`](../modules.md#klevuapirawresponse)

#### Defined in

[connection/responseObject.ts:10](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseObject.ts#L10)

## Methods

### #buildQueryObjects

▸ `Private` **#buildQueryObjects**(): `void`

#### Returns

`void`

#### Defined in

[connection/responseObject.ts:42](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseObject.ts#L42)

___

### queriesById

▸ **queriesById**(`id`): [`KlevuResponseQueryObject`](KlevuResponseQueryObject.md)

Get query results by id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | query id used |

#### Returns

[`KlevuResponseQueryObject`](KlevuResponseQueryObject.md)

#### Defined in

[connection/responseObject.ts:58](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseObject.ts#L58)

___

### queryExists

▸ **queryExists**(`id`): `boolean`

Check if query exists. This should be used as queriesById can throw an error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | query id used |

#### Returns

`boolean`

#### Defined in

[connection/responseObject.ts:71](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseObject.ts#L71)

___

### suggestionsById

▸ **suggestionsById**(`id`): `undefined` \| [`KlevuSuggestionResult`](../modules.md#klevusuggestionresult)

Get suggestions by id

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| [`KlevuSuggestionResult`](../modules.md#klevusuggestionresult)

#### Defined in

[connection/responseObject.ts:38](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/responseObject.ts#L38)
