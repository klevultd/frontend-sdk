[@klevu/core]() / [Exports](../modules.md) / KMCRootObject

# Interface: KMCRootObject

## Table of contents

### Properties

- [klevuLayoutVersion](KMCRootObject.md#klevulayoutversion)
- [klevu\_abTestActive](KMCRootObject.md#klevu_abtestactive)
- [klevu\_addToCartEnabled](KMCRootObject.md#klevu_addtocartenabled)
- [klevu\_apiDomain](KMCRootObject.md#klevu_apidomain)
- [klevu\_categorySearchEnabled](KMCRootObject.md#klevu_categorysearchenabled)
- [klevu\_cmsAnalyticsDomain](KMCRootObject.md#klevu_cmsanalyticsdomain)
- [klevu\_cmsApiKey](KMCRootObject.md#klevu_cmsapikey)
- [klevu\_cmsEnabled](KMCRootObject.md#klevu_cmsenabled)
- [klevu\_cmsSearchDomain](KMCRootObject.md#klevu_cmssearchdomain)
- [klevu\_filtersEnabled](KMCRootObject.md#klevu_filtersenabled)
- [klevu\_filtersOnLeft](KMCRootObject.md#klevu_filtersonleft)
- [klevu\_fluidLayoutEnabled](KMCRootObject.md#klevu_fluidlayoutenabled)
- [klevu\_isSearchActive](KMCRootObject.md#klevu_issearchactive)
- [klevu\_layoutType](KMCRootObject.md#klevu_layouttype)
- [klevu\_layoutView](KMCRootObject.md#klevu_layoutview)
- [klevu\_loadMapFile](KMCRootObject.md#klevu_loadmapfile)
- [klevu\_logoFreeSearch](KMCRootObject.md#klevu_logofreesearch)
- [klevu\_lookForDataInSameFeed](KMCRootObject.md#klevu_lookfordatainsamefeed)
- [klevu\_multiSelectFilters](KMCRootObject.md#klevu_multiselectfilters)
- [klevu\_popularProductsOfSite](KMCRootObject.md#klevu_popularproductsofsite)
- [klevu\_productsToShowInSlimLayout](KMCRootObject.md#klevu_productstoshowinslimlayout)
- [klevu\_showBannerAds](KMCRootObject.md#klevu_showbannerads)
- [klevu\_showOutOfStock](KMCRootObject.md#klevu_showoutofstock)
- [klevu\_showPopularSearches](KMCRootObject.md#klevu_showpopularsearches)
- [klevu\_showPopuralTerms](KMCRootObject.md#klevu_showpopuralterms)
- [klevu\_showPriceSlider](KMCRootObject.md#klevu_showpriceslider)
- [klevu\_showPrices](KMCRootObject.md#klevu_showprices)
- [klevu\_showProductCode](KMCRootObject.md#klevu_showproductcode)
- [klevu\_showRecentSerches](KMCRootObject.md#klevu_showrecentserches)
- [klevu\_uc\_userOptions](KMCRootObject.md#klevu_uc_useroptions)
- [klevu\_userAnalyticsDomain](KMCRootObject.md#klevu_useranalyticsdomain)
- [klevu\_userJavascriptDomain](KMCRootObject.md#klevu_userjavascriptdomain)
- [klevu\_userSearchDomain](KMCRootObject.md#klevu_usersearchdomain)
- [klevu\_webstorePopularTerms](KMCRootObject.md#klevu_webstorepopularterms)

## Properties

### klevuLayoutVersion

• **klevuLayoutVersion**: `string`

**`Deprecated`**

not in use , used by jsv1 for loading version of layout , could
not be expanded in kmc to support jsv2 theme versions

#### Defined in

[models/KMCRoot.ts:107](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L107)

___

### klevu\_abTestActive

• **klevu\_abTestActive**: `boolean`

Is A/B test active

#### Defined in

[models/KMCRoot.ts:5](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L5)

___

### klevu\_addToCartEnabled

• **klevu\_addToCartEnabled**: `boolean`

activates the display of add to cart button

#### Defined in

[models/KMCRoot.ts:53](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L53)

___

### klevu\_apiDomain

• **klevu\_apiDomain**: `string`

used by ab test to define the domain of the api, in plan to move all apis
to the same domain

#### Defined in

[models/KMCRoot.ts:77](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L77)

___

### klevu\_categorySearchEnabled

• **klevu\_categorySearchEnabled**: `boolean`

**`Deprecated`**

not in use , enable category search

#### Defined in

[models/KMCRoot.ts:125](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L125)

___

### klevu\_cmsAnalyticsDomain

• **klevu\_cmsAnalyticsDomain**: `string`

Domain to send cms analytics to

#### Defined in

[models/KMCRoot.ts:21](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L21)

___

### klevu\_cmsApiKey

• **klevu\_cmsApiKey**: `string`

**`Deprecated`**

not in use, originally used for different api key for cms
content

#### Defined in

[models/KMCRoot.ts:121](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L121)

___

### klevu\_cmsEnabled

• **klevu\_cmsEnabled**: `boolean`

activates the tab cms content

#### Defined in

[models/KMCRoot.ts:62](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L62)

___

### klevu\_cmsSearchDomain

• **klevu\_cmsSearchDomain**: `string`

**`Deprecated`**

not in use , similar to klevu_userAnalyticsDomain

#### Defined in

[models/KMCRoot.ts:98](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L98)

___

### klevu\_filtersEnabled

• **klevu\_filtersEnabled**: `boolean`

used to activate the filters

#### Defined in

[models/KMCRoot.ts:86](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L86)

___

### klevu\_filtersOnLeft

• **klevu\_filtersOnLeft**: `boolean`

activates the filters on the left for quick grid view layout, defaults to
true

#### Defined in

[models/KMCRoot.ts:67](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L67)

___

### klevu\_fluidLayoutEnabled

• **klevu\_fluidLayoutEnabled**: `boolean`

**`Deprecated`**

not in use , used by jsv1 to enable extra file loading

#### Defined in

[models/KMCRoot.ts:94](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L94)

___

### klevu\_isSearchActive

• **klevu\_isSearchActive**: `boolean`

**`Deprecated`**

not in use , used by jsv1 to load extra files

#### Defined in

[models/KMCRoot.ts:90](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L90)

___

### klevu\_layoutType

• **klevu\_layoutType**: `string`

**`Deprecated`**

quick search layout type, basic or slim, defaults to basic

#### Defined in

[models/KMCRoot.ts:116](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L116)

___

### klevu\_layoutView

• **klevu\_layoutView**: `string`

used to switch between grid or list view of the quick basic view

#### Defined in

[models/KMCRoot.ts:34](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L34)

___

### klevu\_loadMapFile

• **klevu\_loadMapFile**: `boolean`

**`Deprecated`**

not in use , used by jsv1 to know if the url map file should be
loaded

#### Defined in

[models/KMCRoot.ts:112](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L112)

___

### klevu\_logoFreeSearch

• **klevu\_logoFreeSearch**: `boolean`

**`Deprecated`**

not in use, during trial used to have klevu watermark, no
longer a option so not used

#### Defined in

[models/KMCRoot.ts:147](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L147)

___

### klevu\_lookForDataInSameFeed

• **klevu\_lookForDataInSameFeed**: `boolean`

**`Deprecated`**

unknown

#### Defined in

[models/KMCRoot.ts:102](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L102)

___

### klevu\_multiSelectFilters

• **klevu\_multiSelectFilters**: `boolean`

#### Defined in

[models/KMCRoot.ts:133](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L133)

___

### klevu\_popularProductsOfSite

• **klevu\_popularProductsOfSite**: `KlevuPopularProductsOfSite`[]

Most popular products of the store

#### Defined in

[models/KMCRoot.ts:17](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L17)

___

### klevu\_productsToShowInSlimLayout

• **klevu\_productsToShowInSlimLayout**: `string`

the limit for the query of products and category for the slim quick view
design(cms is hardcoded to 3)

#### Defined in

[models/KMCRoot.ts:58](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L58)

___

### klevu\_showBannerAds

• **klevu\_showBannerAds**: `boolean`

**`Deprecated`**

not in use, used to control if banner are displayed or not,
currently control via the return of banner list

#### Defined in

[models/KMCRoot.ts:131](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L131)

___

### klevu\_showOutOfStock

• **klevu\_showOutOfStock**: `boolean`

**`Deprecated`**

not in use, as its controlled from search BE

#### Defined in

[models/KMCRoot.ts:142](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L142)

___

### klevu\_showPopularSearches

• **klevu\_showPopularSearches**: `boolean`

activates popular products section of quicksearch (documented under the
popular-searches theme component)

#### Defined in

[models/KMCRoot.ts:44](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L44)

___

### klevu\_showPopuralTerms

• **klevu\_showPopuralTerms**: `boolean`

**`Deprecated`**

not in use , because of no results redesign, it was to show the
popular terms in the no results pannel.

#### Defined in

[models/KMCRoot.ts:152](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L152)

___

### klevu\_showPriceSlider

• **klevu\_showPriceSlider**: `boolean`

activates the price slider

#### Defined in

[models/KMCRoot.ts:49](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L49)

___

### klevu\_showPrices

• **klevu\_showPrices**: `boolean`

activates the display of price filter and price block in product card

#### Defined in

[models/KMCRoot.ts:71](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L71)

___

### klevu\_showProductCode

• **klevu\_showProductCode**: `boolean`

used for displaying product sku in the product cards as part of the name

#### Defined in

[models/KMCRoot.ts:39](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L39)

___

### klevu\_showRecentSerches

• **klevu\_showRecentSerches**: `boolean`

activates recent search's section of quick (documented under the
recent-searches theme component)

#### Defined in

[models/KMCRoot.ts:82](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L82)

___

### klevu\_uc\_userOptions

• **klevu\_uc\_userOptions**: `KlevuUcUserOptions`

Messages and banners created by user in KMC

#### Defined in

[models/KMCRoot.ts:9](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L9)

___

### klevu\_userAnalyticsDomain

• **klevu\_userAnalyticsDomain**: `string`

**`Deprecated`**

not in use, controlled the domain of the analytics calls , not
in use as analytics live now under same doamin

#### Defined in

[models/KMCRoot.ts:138](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L138)

___

### klevu\_userJavascriptDomain

• **klevu\_userJavascriptDomain**: `string`

Domain where JSv2 is hosted on

#### Defined in

[models/KMCRoot.ts:29](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L29)

___

### klevu\_userSearchDomain

• **klevu\_userSearchDomain**: `string`

Domain to send search analytics to

#### Defined in

[models/KMCRoot.ts:25](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L25)

___

### klevu\_webstorePopularTerms

• **klevu\_webstorePopularTerms**: `string`[]

Popular terms in the store

#### Defined in

[models/KMCRoot.ts:13](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KMCRoot.ts#L13)
