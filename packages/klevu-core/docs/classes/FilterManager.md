[@klevu/core]() / [Exports](../modules.md) / FilterManager

# Class: FilterManager

## Table of contents

### Constructors

- [constructor](FilterManager.md#constructor)

### Properties

- [options](FilterManager.md#options)
- [sliders](FilterManager.md#sliders)

### Methods

- [currentSelection](FilterManager.md#currentselection)
- [initFromListFilters](FilterManager.md#initfromlistfilters)
- [sort](FilterManager.md#sort)
- [toApplyFilters](FilterManager.md#toapplyfilters)
- [toggleOption](FilterManager.md#toggleoption)
- [updateSlide](FilterManager.md#updateslide)

## Constructors

### constructor

• **new FilterManager**()

## Properties

### options

• **options**: [`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions)[] = `[]`

#### Defined in

[store/filterManager.ts:11](https://github.com/klevultd/frontend-sdk/blob/8bfa7d3/packages/klevu-core/src/store/filterManager.ts#L11)

___

### sliders

• **sliders**: [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider)[] = `[]`

#### Defined in

[store/filterManager.ts:12](https://github.com/klevultd/frontend-sdk/blob/8bfa7d3/packages/klevu-core/src/store/filterManager.ts#L12)

## Methods

### currentSelection

▸ **currentSelection**(`key`): `undefined` \| `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| `string`[]

#### Defined in

[store/filterManager.ts:140](https://github.com/klevultd/frontend-sdk/blob/8bfa7d3/packages/klevu-core/src/store/filterManager.ts#L140)

___

### initFromListFilters

▸ **initFromListFilters**(`filters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | ([`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider))[] |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:14](https://github.com/klevultd/frontend-sdk/blob/8bfa7d3/packages/klevu-core/src/store/filterManager.ts#L14)

___

### sort

▸ `Private` **sort**(): `void`

#### Returns

`void`

#### Defined in

[store/filterManager.ts:29](https://github.com/klevultd/frontend-sdk/blob/8bfa7d3/packages/klevu-core/src/store/filterManager.ts#L29)

___

### toApplyFilters

▸ **toApplyFilters**(): [`ApplyFilter`](../modules.md#applyfilter)[]

#### Returns

[`ApplyFilter`](../modules.md#applyfilter)[]

#### Defined in

[store/filterManager.ts:107](https://github.com/klevultd/frontend-sdk/blob/8bfa7d3/packages/klevu-core/src/store/filterManager.ts#L107)

___

### toggleOption

▸ **toggleOption**(`key`, `name`): `void`

Function to select filters in filter manager

Sends a Dom event on change

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of option |
| `name` | `string` | Name of value |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:43](https://github.com/klevultd/frontend-sdk/blob/8bfa7d3/packages/klevu-core/src/store/filterManager.ts#L43)

___

### updateSlide

▸ **updateSlide**(`key`, `min`, `max`): `void`

Function to update slide in filter manager

Sends a Dom event on change

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of slide |
| `min` | `number` | Min value of slide |
| `max` | `number` | Max value of slide |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:85](https://github.com/klevultd/frontend-sdk/blob/8bfa7d3/packages/klevu-core/src/store/filterManager.ts#L85)
