[@klevu/core]() / [Exports](../modules.md) / MoiSession

# Class: MoiSession

## Table of contents

### Constructors

- [constructor](MoiSession.md#constructor)

### Properties

- [config](MoiSession.md#config)
- [context](MoiSession.md#context)
- [feedbacks](MoiSession.md#feedbacks)
- [genericOptions](MoiSession.md#genericoptions)
- [menu](MoiSession.md#menu)
- [messages](MoiSession.md#messages)
- [options](MoiSession.md#options)

### Methods

- [addFeedback](MoiSession.md#addfeedback)
- [clear](MoiSession.md#clear)
- [query](MoiSession.md#query)
- [save](MoiSession.md#save)

## Constructors

### constructor

• **new MoiSession**(`state`, `options`, `context`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `Object` |
| `state.feedbacks` | [`MoiSavedFeedback`](../modules.md#moisavedfeedback)[] |
| `state.genericOptions` | `undefined` \| { `options`: { `chat`: `string` ; `name`: `string` ; `type`: ``"message"`` \| ``"clearChat"``  }[]  } |
| `state.menu` | `undefined` \| { `options`: { `chat`: `string` ; `name`: `string` ; `options`: { `key`: `string` ; `validations`: `string` ; `value`: `string`  }[] ; `type`: ``"message"`` \| ``"customerSupport"``  }[]  } |
| `state.messages` | [`MoiMessages`](../modules.md#moimessages) |
| `options` | [`MoiStartOptions`](../modules.md#moistartoptions) |
| `context` | [`MoiContext`](../modules.md#moicontext) |
| `config` | [`KlevuConfig`](KlevuConfig.md) |

#### Defined in

[connection/moi/moi.ts:322](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L322)

## Properties

### config

• **config**: [`KlevuConfig`](KlevuConfig.md)

#### Defined in

[connection/moi/moi.ts:354](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L354)

___

### context

• **context**: [`MoiContext`](../modules.md#moicontext)

#### Defined in

[connection/moi/moi.ts:353](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L353)

___

### feedbacks

• **feedbacks**: [`MoiSavedFeedback`](../modules.md#moisavedfeedback)[]

#### Defined in

[connection/moi/moi.ts:351](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L351)

___

### genericOptions

• `Optional` **genericOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `options` | { `chat`: `string` ; `name`: `string` ; `type`: ``"message"`` \| ``"clearChat"``  }[] |

#### Defined in

[connection/moi/moi.ts:350](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L350)

___

### menu

• **menu**: `undefined` \| { `options`: { `chat`: `string` ; `name`: `string` ; `options`: { `key`: `string` ; `validations`: `string` ; `value`: `string`  }[] ; `type`: ``"message"`` \| ``"customerSupport"``  }[]  }

#### Defined in

[connection/moi/moi.ts:349](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L349)

___

### messages

• **messages**: [`MoiMessages`](../modules.md#moimessages)

#### Defined in

[connection/moi/moi.ts:348](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L348)

___

### options

• **options**: [`MoiStartOptions`](../modules.md#moistartoptions)

#### Defined in

[connection/moi/moi.ts:352](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L352)

## Methods

### addFeedback

▸ **addFeedback**(`messageId`, `thumbs`, `reason?`): `Promise`<[`MoiResponse`](../modules.md#moiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageId` | `string` |
| `thumbs` | ``"up"`` \| ``"down"`` |
| `reason?` | `string` |

#### Returns

`Promise`<[`MoiResponse`](../modules.md#moiresponse)\>

#### Defined in

[connection/moi/moi.ts:456](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L456)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[connection/moi/moi.ts:417](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L417)

___

### query

▸ **query**(`request`, `target?`): `Promise`<[`MoiResponse`](../modules.md#moiresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Omit`<[`MoiRequest`](../modules.md#moirequest), ``"context"``\> |
| `target?` | `MoiAPITarget` |

#### Returns

`Promise`<[`MoiResponse`](../modules.md#moiresponse)\>

#### Defined in

[connection/moi/moi.ts:356](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L356)

___

### save

▸ **save**(): `void`

#### Returns

`void`

#### Defined in

[connection/moi/moi.ts:423](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/connection/moi/moi.ts#L423)
