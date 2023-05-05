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
- [setState](FilterManager.md#setstate)
- [toApplyFilters](FilterManager.md#toapplyfilters)
- [toURLParams](FilterManager.md#tourlparams)
- [toggleOption](FilterManager.md#toggleoption)
- [updateSlide](FilterManager.md#updateslide)
- [isKlevuFilterResultOptions](FilterManager.md#isklevufilterresultoptions)
- [isKlevuFilterResultSlider](FilterManager.md#isklevufilterresultslider)

## Constructors

### constructor

• **new FilterManager**(`initialValues?`)

Manager can be initialized with existing options and sliders

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialValues?` | `Object` | initialize manager with values |
| `initialValues.filters?` | `FilterManagerFilters`[] | Given set of filters |

#### Defined in

[store/filterManager.ts:48](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L48)

## Properties

### filters

• **filters**: `FilterManagerFilters`[] = `[]`

#### Defined in

[store/filterManager.ts:21](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L21)

## Accessors

### options

• `get` **options**(): [`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions)[]

**`Deprecated`**

use filters instead. This doesn't take into account order of options and sliders

#### Returns

[`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions)[]

#### Defined in

[store/filterManager.ts:26](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L26)

___

### sliders

• `get` **sliders**(): [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider)[]

**`Deprecated`**

use filters instead. This doesn't take into account order of options and sliders

#### Returns

[`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider)[]

#### Defined in

[store/filterManager.ts:36](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L36)

## Methods

### clear

▸ **clear**(): `void`

clear current options and sliders

#### Returns

`void`

#### Defined in

[store/filterManager.ts:74](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L74)

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

[store/filterManager.ts:173](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L173)

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

[store/filterManager.ts:287](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L287)

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

[store/filterManager.ts:150](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L150)

___

### getCurrentState

▸ **getCurrentState**(): `FilterManagerState`

Gets current state of filters

#### Returns

`FilterManagerState`

current state

#### Defined in

[store/filterManager.ts:83](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L83)

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

[store/filterManager.ts:363](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L363)

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

[store/filterManager.ts:55](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L55)

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

[store/filterManager.ts:340](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L340)

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

[store/filterManager.ts:126](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L126)

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

[store/filterManager.ts:89](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L89)

___

### toApplyFilters

▸ **toApplyFilters**(): [`ApplyFilter`](../modules.md#applyfilter)[]

Populate filter manager with filters from Klevu API

#### Returns

[`ApplyFilter`](../modules.md#applyfilter)[]

#### Defined in

[store/filterManager.ts:247](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L247)

___

### toURLParams

▸ **toURLParams**(): `string`

Changes current selection of filters to a URL param string

#### Returns

`string`

string of URL params

#### Defined in

[store/filterManager.ts:313](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L313)

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

[store/filterManager.ts:101](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L101)

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

[store/filterManager.ts:204](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L204)

___

### isKlevuFilterResultOptions

▸ `Static` **isKlevuFilterResultOptions**(`filter`): filter is KlevuFilterResultOptions

Is given variable an option filter

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider) |

#### Returns

filter is KlevuFilterResultOptions

#### Defined in

[store/filterManager.ts:416](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L416)

___

### isKlevuFilterResultSlider

▸ `Static` **isKlevuFilterResultSlider**(`filter`): filter is KlevuFilterResultSlider

Is given variable a slider filter

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`KlevuFilterResultOptions`](../modules.md#klevufilterresultoptions) \| [`KlevuFilterResultSlider`](../modules.md#klevufilterresultslider) |

#### Returns

filter is KlevuFilterResultSlider

#### Defined in

[store/filterManager.ts:405](https://github.com/klevultd/frontend-sdk/blob/f1babb6/packages/klevu-core/src/store/filterManager.ts#L405)
