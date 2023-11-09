[@klevu/core]() / [Exports](../modules.md) / KlevuSearchPreference

# Enumeration: KlevuSearchPreference

## Table of contents

### Enumeration Members

- [debugQuery](KlevuSearchPreference.md#debugquery)
- [disableFuzzyMatch](KlevuSearchPreference.md#disablefuzzymatch)
- [disableORSearch](KlevuSearchPreference.md#disableorsearch)
- [disableStockSorting](KlevuSearchPreference.md#disablestocksorting)
- [disableWildcard](KlevuSearchPreference.md#disablewildcard)
- [disableWordShingles](KlevuSearchPreference.md#disablewordshingles)
- [enableBoostingOriginalTermsInSynonyms](KlevuSearchPreference.md#enableboostingoriginaltermsinsynonyms)
- [enableScores](KlevuSearchPreference.md#enablescores)
- [excludeIds](KlevuSearchPreference.md#excludeids)
- [hideOutOfStockProducts](KlevuSearchPreference.md#hideoutofstockproducts)
- [ignoreManualBoosting](KlevuSearchPreference.md#ignoremanualboosting)
- [includeCategoryFilterInCatNav](KlevuSearchPreference.md#includecategoryfilterincatnav)
- [includeDescription](KlevuSearchPreference.md#includedescription)
- [includeStopwords](KlevuSearchPreference.md#includestopwords)
- [partialMatch](KlevuSearchPreference.md#partialmatch)
- [partialMatchForAllWords](KlevuSearchPreference.md#partialmatchforallwords)
- [searchCompoundsAsAndQuery](KlevuSearchPreference.md#searchcompoundsasandquery)
- [showDisabledFacets](KlevuSearchPreference.md#showdisabledfacets)
- [showFiltersWithSmallCount](KlevuSearchPreference.md#showfilterswithsmallcount)
- [showOutOfStockProducts](KlevuSearchPreference.md#showoutofstockproducts)

## Enumeration Members

### debugQuery

• **debugQuery** = ``"debugQuery"``

Use this flag to include additional information about the query execution.
This information is populated in the meta object of the response.

Please note that it is not recommended to enable this flag in your
Production environment, as performance will be impacted.

#### Defined in

[models/KlevuSearchPreference.ts:133](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L133)

___

### disableFuzzyMatch

• **disableFuzzyMatch** = ``"disableFuzzyMatch"``

This flag can be used in conjunction with the typeOfSearch 'DEFAULT' to
	disable the FUZZY_AND and FUZZY_OR search types from being attempted.

#### Defined in

[models/KlevuSearchPreference.ts:39](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L39)

___

### disableORSearch

• **disableORSearch** = ``"disableORSearch"``

This flag can be used in conjunction with the typeOfSearch 'DEFAULT' to
	disable the WILDCARD_OR and FUZZY_OR search types from being attempted.

#### Defined in

[models/KlevuSearchPreference.ts:50](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L50)

___

### disableStockSorting

• **disableStockSorting** = ``"disableStockSorting"``

This can be used in conjunction with showOutOfStockProducts. If your store
	is configured to display out of stock products, they will be displayed at
	the very end of the search results after all in stock products have been
	displayed. By using this flag you can disable this logic, and cause all
	products to be ranked in an order that disregards their stock status.

#### Defined in

[models/KlevuSearchPreference.ts:17](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L17)

___

### disableWildcard

• **disableWildcard** = ``"disableWildcard"``

This flag can be used in conjunction with the typeOfSearch 'DEFAULT' to
	disable the WILDCARD_AND and WILDCARD_OR search types from being
	attempted.

#### Defined in

[models/KlevuSearchPreference.ts:45](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L45)

___

### disableWordShingles

• **disableWordShingles** = ``"disableWordShingles"``

For a query longer than one word, all the possible bigrams and trigrams
	(i.e. formed out of query terms) are looked up in records and the ones
	having one or more of them are boosted higher up in the search results.
	You can use this flag to disable such boosting.

#### Defined in

[models/KlevuSearchPreference.ts:78](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L78)

___

### enableBoostingOriginalTermsInSynonyms

• **enableBoostingOriginalTermsInSynonyms** = ``"enableBoostingOriginalTermsInSynonyms"``

By default, synonyms are treated equally to their query term. Should you
	wish to give higher priority to the actual terms your customer entered in
	the query over their synonyms, please include this flag in your search
	preferences.

#### Defined in

[models/KlevuSearchPreference.ts:100](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L100)

___

### enableScores

• **enableScores** = ``"enableScores"``

Include the score information with the response fields: score,
klevu_manual_boosting, klevu_bulk_boosting and klevu_selflearning_boosting.

#### Defined in

[models/KlevuSearchPreference.ts:125](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L125)

___

### excludeIds

• **excludeIds** = ``"excludeIds"``

Use this flag to disable the searching of record IDs.

#### Defined in

[models/KlevuSearchPreference.ts:27](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L27)

___

### hideOutOfStockProducts

• **hideOutOfStockProducts** = ``"hideOutOfStockProducts"``

Whether or not your store should include 'Out of Stock' products in search
	results by default can be configured within the Klevu Merchant Centre.
	However, if you would like to override this for a particular query, please
	include one of these flags.

#### Defined in

[models/KlevuSearchPreference.ts:9](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L9)

___

### ignoreManualBoosting

• **ignoreManualBoosting** = ``"ignoreManualBoosting"``

@TODO: Most probably ignores manual boostin. Needs proper documentation

#### Defined in

[models/KlevuSearchPreference.ts:138](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L138)

___

### includeCategoryFilterInCatNav

• **includeCategoryFilterInCatNav** = ``"includeCategoryFilterInCatNav"``

When the typeOfRequest is 'CATNAV', the filter for 'Category' is
automatically excluded since you are already within the context of a
category. Use this flag to override this logic and return the category
filters even for CatNav requests.

#### Defined in

[models/KlevuSearchPreference.ts:120](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L120)

___

### includeDescription

• **includeDescription** = ``"includeDescription"``

, excludeDescription Whether or not a record's 'description' is considered
for search results can be configured by Klevu Support on a store by store
basis, however if you would like to override this for a particular query,
please include one of these flags.

#### Defined in

[models/KlevuSearchPreference.ts:34](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L34)

___

### includeStopwords

• **includeStopwords** = ``"includeStopwords"``

By default, functional words such as prepositions, pronouns, articles,
	etc. are excluded from searches. Add this flag to include these stopwords
	in your search.

#### Defined in

[models/KlevuSearchPreference.ts:23](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L23)

___

### partialMatch

• **partialMatch** = ``"partialMatch"``

Enable partial match for the last word of a query, where the last word
searched can be a substring of any other word found in a record. This can
be useful for non-English languages.

For example let's say a product has the name "rödvinsglas" (red wine
glass). If searching for "högt glas" (tall glass) it may not match since
the record has no words starting with 'glas'. By providing this flag, the
search would become "högt *glas*" meaning it would match the record since
it contains a word which ends with 'glas'.

#### Defined in

[models/KlevuSearchPreference.ts:63](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L63)

___

### partialMatchForAllWords

• **partialMatchForAllWords** = ``"partialMatchForAllWords"``

Similar to partialMatch, but for all words rather than just the last. In
	the same "rödvinsglas" example, a search for "högt glas" would become
	"*högt* *glas*", so any records containing words containing 'högt' or
	'glas' would result in a match.

#### Defined in

[models/KlevuSearchPreference.ts:71](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L71)

___

### searchCompoundsAsAndQuery

• **searchCompoundsAsAndQuery** = ``"searchCompoundsAsAndQuery"``

When a compound word is searched for, i.e. two or more individual words
joined together as one word, Klevu automatically disjoints them if the
de-compounding feature is enabled for your store.

For example, a search for "fairylights" would be treated as "fairy lights",
but with the added condition that those words must appear within 5 words of
each other in a matching record.

If you would prefer that the words "fairy" and "light" could be found
anywhere within the record, not necessarily near one another, then please
include this flag.

#### Defined in

[models/KlevuSearchPreference.ts:92](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L92)

___

### showDisabledFacets

• **showDisabledFacets** = ``"showDisabledFacets"``

It is possible to configure which facets or filters should be enabled or
disabled within the Klevu Merchant Centre. By including this flag, all
facets will be returned regardless of whether they have been disabled in
the KMC.

#### Defined in

[models/KlevuSearchPreference.ts:107](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L107)

___

### showFiltersWithSmallCount

• **showFiltersWithSmallCount** = ``"showFiltersWithSmallCount"``

By default some filters are excluded from the results if they only have a
small number of results. Please use this flag to override this logic and
include all filters in the response.

#### Defined in

[models/KlevuSearchPreference.ts:113](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L113)

___

### showOutOfStockProducts

• **showOutOfStockProducts** = ``"showOutOfStockProducts"``

#### Defined in

[models/KlevuSearchPreference.ts:2](https://github.com/klevultd/frontend-sdk/blob/492d3760/packages/klevu-core/src/models/KlevuSearchPreference.ts#L2)
