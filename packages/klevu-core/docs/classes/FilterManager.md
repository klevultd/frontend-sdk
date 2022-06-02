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

[store/filterManager.ts:15](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/store/filterManager.ts#L15)

___

### sliders

• **sliders**: [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider)[] = `[]`

#### Defined in

[store/filterManager.ts:16](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/store/filterManager.ts#L16)

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

[store/filterManager.ts:144](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/store/filterManager.ts#L144)

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

[store/filterManager.ts:18](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/store/filterManager.ts#L18)

___

### sort

▸ `Private` **sort**(): `void`

#### Returns

`void`

#### Defined in

[store/filterManager.ts:33](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/store/filterManager.ts#L33)

___

### toApplyFilters

▸ **toApplyFilters**(): [`ApplyFilter`](../modules.md#applyfilter)[]

#### Returns

[`ApplyFilter`](../modules.md#applyfilter)[]

#### Defined in

[store/filterManager.ts:111](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/store/filterManager.ts#L111)

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

[store/filterManager.ts:47](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/store/filterManager.ts#L47)

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

[store/filterManager.ts:89](https://github.com/klevultd/frontend-sdk/blob/6dc6e86/packages/klevu-core/src/store/filterManager.ts#L89)
