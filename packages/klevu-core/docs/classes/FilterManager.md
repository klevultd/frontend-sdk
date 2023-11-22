[@klevu/core]() / [Exports](../modules.md) / FilterManager

# Class: FilterManager

Filter manager is used to store and handle filters (facets) in the results easily.
It can be easily used with applyFilterWithFilterManager() and listFilters() modifiers

## Table of contents

### Constructors

- [constructor](FilterManager.md#constructor)

### Properties

- [filters](FilterManager.md#filters)

### Accessors

- [options](FilterManager.md#options)
- [sliders](FilterManager.md#sliders)

### Methods

- [clear](FilterManager.md#clear)
- [clearOptionSelections](FilterManager.md#clearoptionselections)
- [currentSelection](FilterManager.md#currentselection)
- [deselectOption](FilterManager.md#deselectoption)
- [getCurrentState](FilterManager.md#getcurrentstate)
- [getOptionByKeyCreateIfNotExists](FilterManager.md#getoptionbykeycreateifnotexists)
- [initFromListFilters](FilterManager.md#initfromlistfilters)
- [readFromURLParams](FilterManager.md#readfromurlparams)
- [selectOption](FilterManager.md#selectoption)
- [selectedFilters](FilterManager.md#selectedfilters)
- [setState](FilterManager.md#setstate)
- [toApplyFilters](FilterManager.md#toapplyfilters)
- [toURLParams](FilterManager.md#tourlparams)
- [toggleOption](FilterManager.md#toggleoption)
- [updateSlide](FilterManager.md#updateslide)
- [isKlevuFilterResultOptions](FilterManager.md#isklevufilterresultoptions)
- [isKlevuFilterResultRating](FilterManager.md#isklevufilterresultrating)
- [isKlevuFilterResultSlider](FilterManager.md#isklevufilterresultslider)

## Constructors

### constructor

• **new FilterManager**(`initialValues?`)

Manager can be initialized with existing options and sliders

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValues?` | `Object` | initialize manager with values |
| `initialValues.filters?` | [`FilterManagerFilters`](../modules.md#filtermanagerfilters)[] | Given set of filters |

#### Defined in

[store/filterManager.ts:52](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L52)

## Properties

### filters

• **filters**: [`FilterManagerFilters`](../modules.md#filtermanagerfilters)[] = `[]`

#### Defined in

[store/filterManager.ts:25](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L25)

## Accessors

### options

• `get` **options**(): [`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions)[]

**`Deprecated`**

use filters instead. This doesn't take into account order of options and sliders

#### Returns

[`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions)[]

#### Defined in

[store/filterManager.ts:30](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L30)

___

### sliders

• `get` **sliders**(): [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider)[]

**`Deprecated`**

use filters instead. This doesn't take into account order of options and sliders

#### Returns

[`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider)[]

#### Defined in

[store/filterManager.ts:40](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L40)

## Methods

### clear

▸ **clear**(): `void`

clear current options and sliders

#### Returns

`void`

#### Defined in

[store/filterManager.ts:82](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L82)

___

### clearOptionSelections

▸ **clearOptionSelections**(`key?`): `void`

Sets `selected` key of all options to false

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | Optional key to lmit clearing to one option |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:181](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L181)

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

[store/filterManager.ts:298](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L298)

___

### deselectOption

▸ **deselectOption**(`key`, `value`): `void`

Deselect given option

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | key of filter to deselect |
| `value` | `string` | value of option to deselect |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:158](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L158)

___

### getCurrentState

▸ **getCurrentState**(): `FilterManagerState`

Gets current state of filters

#### Returns

`FilterManagerState`

current state

#### Defined in

[store/filterManager.ts:91](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L91)

___

### getOptionByKeyCreateIfNotExists

▸ `Private` **getOptionByKeyCreateIfNotExists**(`key`, `value`): `Object`

Get option by key and sub option name. If doesn't exist, create it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` |  |
| `name` | `string` | Name / label of filter |
| `selected` | `boolean` | Was this filter selected on the query |
| `value` | `string` | Value of filter. That will be sent to backend |

#### Defined in

[store/filterManager.ts:428](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L428)

___

### initFromListFilters

▸ **initFromListFilters**(`filters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | ([`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider) \| [`KlevuFilterResultRating`](../modules.md#klevufilterresultrating))[] |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:59](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L59)

___

### readFromURLParams

▸ **readFromURLParams**(`params`): `void`

Set current selection of filters from a URL param string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `URLSearchParams` | URLSearchParams to read from |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:358](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L358)

___

### selectOption

▸ **selectOption**(`key`, `value`): `void`

Select given option

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | key of filter to select |
| `value` | `string` | value of option to select |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:134](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L134)

___

### selectedFilters

▸ **selectedFilters**(): { `key`: `string` ; `label`: `string` ; `type`: [`KlevuFilterType`](../enums/KlevuFilterType.md) ; `value`: `string`  }[]

Quickly get all selected options and sliders

#### Returns

{ `key`: `string` ; `label`: `string` ; `type`: [`KlevuFilterType`](../enums/KlevuFilterType.md) ; `value`: `string`  }[]

Array of selected filters, with key, label, type and value

#### Defined in

[store/filterManager.ts:380](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L380)

___

### setState

▸ **setState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `FilterManagerState` |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:97](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L97)

___

### toApplyFilters

▸ **toApplyFilters**(): [`ApplyFilter`](../modules.md#applyfilter)[]

Populate filter manager with filters from Klevu API

#### Returns

[`ApplyFilter`](../modules.md#applyfilter)[]

#### Defined in

[store/filterManager.ts:255](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L255)

___

### toURLParams

▸ **toURLParams**(): `string`

Changes current selection of filters to a URL param string

#### Returns

`string`

string of URL params

#### Defined in

[store/filterManager.ts:328](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L328)

___

### toggleOption

▸ **toggleOption**(`key`, `value`): `void`

Function to select filters in filter manager

Sends a Dom event on change

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key of option |
| `value` | `string` | value of option to toggle |

#### Returns

`void`

#### Defined in

[store/filterManager.ts:109](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L109)

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

[store/filterManager.ts:212](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L212)

___

### isKlevuFilterResultOptions

▸ `Static` **isKlevuFilterResultOptions**(`filter`): filter is KlevuFilterResultOptions

Is given variable an option filter

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider) \| [`KlevuFilterResultRating`](../modules.md#klevufilterresultrating) |

#### Returns

filter is KlevuFilterResultOptions

#### Defined in

[store/filterManager.ts:485](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L485)

___

### isKlevuFilterResultRating

▸ `Static` **isKlevuFilterResultRating**(`filter`): filter is KlevuFilterResultRating

Is given variable an rating filter

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider) \| [`KlevuFilterResultRating`](../modules.md#klevufilterresultrating) |

#### Returns

filter is KlevuFilterResultRating

#### Defined in

[store/filterManager.ts:499](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L499)

___

### isKlevuFilterResultSlider

▸ `Static` **isKlevuFilterResultSlider**(`filter`): filter is KlevuFilterResultSlider

Is given variable a slider filter

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider) \| [`KlevuFilterResultRating`](../modules.md#klevufilterresultrating) |

#### Returns

filter is KlevuFilterResultSlider

#### Defined in

[store/filterManager.ts:471](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/store/filterManager.ts#L471)
