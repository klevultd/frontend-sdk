[@klevu/core]() / [Exports](../modules.md) / FilterManager

# Class: FilterManager

Filter manager is used to store and handle filters (facets) in the results easily.
It can be easily used with applyFilterWithFilterManager() and listFilters() modifiers

## Table of contents

### Constructors

- [constructor](FilterManager.md#constructor)

### Properties

- [options](FilterManager.md#options)
- [sliders](FilterManager.md#sliders)

### Methods

- [clear](FilterManager.md#clear)
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

[store/filterManager.ts:16](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/store/filterManager.ts#L16)

___

### sliders

• **sliders**: [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider)[] = `[]`

#### Defined in

[store/filterManager.ts:17](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/store/filterManager.ts#L17)

## Methods

### clear

▸ **clear**(): `void`

clear current options and sliders

#### Returns

`void`

#### Defined in

[store/filterManager.ts:54](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/store/filterManager.ts#L54)

___

### currentSelection

▸ **currentSelection**(`key`): `undefined` \| `string`[]

Get current selection by key

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| `string`[]

#### Defined in

[store/filterManager.ts:174](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/store/filterManager.ts#L174)

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

[store/filterManager.ts:19](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/store/filterManager.ts#L19)

___

### sort

▸ `Private` **sort**(): `void`

#### Returns

`void`

#### Defined in

[store/filterManager.ts:45](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/store/filterManager.ts#L45)

___

### toApplyFilters

▸ **toApplyFilters**(): [`ApplyFilter`](../modules.md#applyfilter)[]

Populate filter manager with filters from Klevu API

#### Returns

[`ApplyFilter`](../modules.md#applyfilter)[]

#### Defined in

[store/filterManager.ts:135](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/store/filterManager.ts#L135)

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

[store/filterManager.ts:67](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/store/filterManager.ts#L67)

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

[store/filterManager.ts:109](https://github.com/klevultd/frontend-sdk/blob/db7f697/packages/klevu-core/src/store/filterManager.ts#L109)
