/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { FilterManager, KlevuFilterResultOptions, KlevuFilterResultSlider, KlevuQueryResult, KlevuRecord, KlevuSearchSorting } from "@klevu/core";
import { KlevuPopupAnchor } from "./components/klevu-popup/klevu-popup";
import { KlevuFacetMode } from "./components/klevu-facet/klevu-facet";
import { KlevuFacetMode as KlevuFacetMode1 } from "./components/klevu-facet/klevu-facet";
import { KlevuHeadingVariant } from "./components/klevu-heading/klevu-heading";
import { KlevuUIGlobalSettings } from "./utils/utils";
import { KlevuProductSlots } from "./components/klevu-product/klevu-product";
import { KlevuPopupAnchor as KlevuPopupAnchor1 } from "./components/klevu-popup/klevu-popup";
import { KlevuProductOnProductClick, KlevuProductVariant } from "./components/klevu-product/klevu-product";
import { AllQueryOptions } from "./components/klevu-query/klevu-query";
import { SearchResultsEventData, SuggestionsEventData } from "./components/klevu-search-field/klevu-search-field";
export namespace Components {
    interface KlevuAccordion {
        /**
          * is accordion open
         */
        "open": boolean;
        /**
          * Should it initially be open
         */
        "startOpen"?: boolean;
    }
    interface KlevuButton {
        /**
          * Is button disabled
         */
        "disabled"?: boolean;
    }
    interface KlevuCheckbox {
        /**
          * Is checkbox checked
         */
        "checked"?: boolean;
        /**
          * Is disabled
         */
        "disabled"?: boolean;
        /**
          * Name of the checkbox
         */
        "name"?: string;
    }
    interface KlevuCmsList {
        /**
          * Caption of the listing
         */
        "caption": string;
        /**
          * Should use url parameter from link to create anchor
         */
        "link"?: boolean;
        /**
          * List of Klevu results records with type of Page
         */
        "pages": Array<Partial<KlevuRecord>>;
    }
    interface KlevuDrawer {
        /**
          * Anchor to right or left side of the page
         */
        "anchor": KlevuPopupAnchor;
        /**
          * Display dim background on top of other content
         */
        "background"?: boolean;
        /**
          * Close by clicking outside of drawer
         */
        "closeAtOutsideClick": boolean;
        "closeModal": () => Promise<void>;
        "openModal": () => Promise<void>;
        /**
          * Start side drawer open
         */
        "startOpen"?: boolean;
    }
    interface KlevuDropdown {
        "disabled"?: boolean;
        "name": string;
        "options": Array<{ value: string; text: String }>;
    }
    interface KlevuFacet {
        /**
          * Should the facet be in accordion
         */
        "accordion"?: boolean;
        /**
          * Start accordion open
         */
        "accordionStartOpen"?: boolean;
        /**
          * Set predefined order for options. Unfound values are in original order in end
         */
        "customOrder"?: string[];
        /**
          * Originating filter manager which to modify
         */
        "manager": FilterManager;
        /**
          * Which mode should facets be in
         */
        "mode": KlevuFacetMode;
        /**
          * From which options to build facet
         */
        "option"?: KlevuFilterResultOptions;
        /**
          * From which slider to build facet
         */
        "slider"?: KlevuFilterResultSlider;
    }
    interface KlevuFacetList {
        /**
          * Should use accordions to for facets
         */
        "accordion"?: boolean;
        /**
          * Custom order keys for every facet
         */
        "customOrder"?: { [key: string]: string[] };
        /**
          * Filter managet from which the list is built from
         */
        "manager": FilterManager;
        /**
          * Set mode for facets or if object is passed then define per key
         */
        "mode"?: KlevuFacetMode1 | { [key: string]: KlevuFacetMode1 };
    }
    interface KlevuHeading {
        "variant": KlevuHeadingVariant;
    }
    interface KlevuInit {
        "apiKey": string;
        "settings"?: KlevuUIGlobalSettings;
        "url": string;
    }
    interface KlevuLatestSearches {
        "caption": string;
    }
    interface KlevuMerchandising {
        /**
          * Which category products
         */
        "category": string;
        /**
          * Category title
         */
        "categoryTitle": string;
        /**
          * How many filters per facet to show
         */
        "filterCount"?: number;
        /**
          * Order filters in given order
         */
        "filterCustomOrder"?: { [key: string]: string[] };
        /**
          * Count of products for page
         */
        "limit": number;
        "renderProductSlot"?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string;
        /**
          * Order of results
         */
        "sort"?: KlevuSearchSorting;
    }
    interface KlevuPagination {
        "current"?: number;
        "max"?: number;
        "min"?: number;
        "nextNext": string;
        "prevText": string;
        "queryResult"?: KlevuQueryResult;
    }
    interface KlevuPopularSearches {
        "caption": string;
    }
    interface KlevuPopup {
        "anchor": KlevuPopupAnchor;
        "closeAtOutsideClick": boolean;
        "closeModal": () => Promise<void>;
        "fullwidthContent": boolean;
        "openAtFocus": boolean;
        "openModal": () => Promise<void>;
        "startOpen"?: boolean;
    }
    interface KlevuProduct {
        /**
          * Force certain width for product. Do not use max-width
         */
        "fixedWidth"?: boolean;
        "hideBrand"?: boolean;
        "hideDescription"?: boolean;
        "hideImage"?: boolean;
        "hideName"?: boolean;
        "hidePrice"?: boolean;
        "hideSwatches"?: boolean;
        "product"?: Partial<KlevuRecord>;
        "variant": KlevuProductVariant;
    }
    interface KlevuProductGrid {
    }
    interface KlevuQuery {
        "category"?: string;
        "categoryTitle"?: string;
        /**
          * Force component to fetch results again
         */
        "fetchAgain": () => Promise<void>;
        /**
          * To how many filters limit results to
         */
        "filterCount"?: number;
        /**
          * What's the limit on page
         */
        "limit"?: number;
        "manager": FilterManager;
        /**
          * Offset of results
         */
        "offset"?: number;
        /**
          * Overriden
         */
        "options"?: AllQueryOptions;
        "recommendationId"?: string;
        "searchTerm"?: string;
        /**
          * How to sort
         */
        "sort"?: KlevuSearchSorting;
        /**
          * What kind of query
         */
        "type": "search" | "merchandising" | "recommendation";
        "updateOnFilterChange"?: boolean;
    }
    interface KlevuQuicksearch {
        "fallbackTerm"?: string;
        "popupAnchor"?: KlevuPopupAnchor;
        "renderProductSlot"?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string;
        "searchCategories"?: boolean;
        "searchCmsPages"?: boolean;
    }
    interface KlevuRecommendations {
        /**
          * For cart recommendation you need to provide product id's in cart
         */
        "cartProductIds"?: string[];
        /**
          * For category product recommendation you need to provide categery path
         */
        "categoryPath"?: string;
        /**
          * For similiar products recommendation you need to provide productId and itemGroupId
         */
        "currentProductId"?: string;
        /**
          * For similiar products recommendation you need to provide productId and itemGroupId
         */
        "itemGroupId"?: string;
        /**
          * The ID of the recommendation
         */
        "recommendationId": string;
        /**
          * Title of the recommendation
         */
        "recommendationTitle": string;
        "renderProductSlot"?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string;
    }
    interface KlevuSearchField {
        /**
          * Fallback term to use if there are no results
         */
        "fallbackTerm"?: string;
        /**
          * Maximum amount of results
         */
        "limit": number;
        /**
          * The placeholder text to display in the search field.
         */
        "placeholder": string;
        /**
          * Should try to find categories as well
         */
        "searchCategories"?: boolean;
        /**
          * Should try to find cms pages as well
         */
        "searchCmsPages"?: boolean;
        /**
          * Search products
         */
        "searchProducts"?: boolean;
        /**
          * Search suggestions
         */
        "searchSuggestions"?: boolean;
    }
    interface KlevuSearchLandingPage {
        "filterCount"?: number;
        "filterCustomOrder"?: { [key: string]: string[] };
        "limit": number;
        "renderProductSlot"?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string;
        "sort"?: KlevuSearchSorting;
        "term": string;
    }
    interface KlevuSimpleSearch {
    }
    interface KlevuSlider {
        "end"?: number;
        "max": number;
        "min": number;
        "showTooltips"?: boolean;
        "start"?: number;
    }
    interface KlevuSlides {
        "height": string;
    }
    interface KlevuSort {
    }
    interface KlevuSuggestionsList {
        "caption": string;
        "suggestions": string[];
    }
    interface KlevuTextfield {
        "disabled": boolean;
        "placeholder"?: string;
        "value": string;
    }
}
export interface KlevuCmsListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuCmsListElement;
}
export interface KlevuDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuDropdownElement;
}
export interface KlevuPaginationCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuPaginationElement;
}
export interface KlevuProductCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuProductElement;
}
export interface KlevuQueryCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuQueryElement;
}
export interface KlevuSearchFieldCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuSearchFieldElement;
}
export interface KlevuSimpleSearchCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuSimpleSearchElement;
}
export interface KlevuSliderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuSliderElement;
}
export interface KlevuSortCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuSortElement;
}
export interface KlevuTextfieldCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKlevuTextfieldElement;
}
declare global {
    interface HTMLKlevuAccordionElement extends Components.KlevuAccordion, HTMLStencilElement {
    }
    var HTMLKlevuAccordionElement: {
        prototype: HTMLKlevuAccordionElement;
        new (): HTMLKlevuAccordionElement;
    };
    interface HTMLKlevuButtonElement extends Components.KlevuButton, HTMLStencilElement {
    }
    var HTMLKlevuButtonElement: {
        prototype: HTMLKlevuButtonElement;
        new (): HTMLKlevuButtonElement;
    };
    interface HTMLKlevuCheckboxElement extends Components.KlevuCheckbox, HTMLStencilElement {
    }
    var HTMLKlevuCheckboxElement: {
        prototype: HTMLKlevuCheckboxElement;
        new (): HTMLKlevuCheckboxElement;
    };
    interface HTMLKlevuCmsListElement extends Components.KlevuCmsList, HTMLStencilElement {
    }
    var HTMLKlevuCmsListElement: {
        prototype: HTMLKlevuCmsListElement;
        new (): HTMLKlevuCmsListElement;
    };
    interface HTMLKlevuDrawerElement extends Components.KlevuDrawer, HTMLStencilElement {
    }
    var HTMLKlevuDrawerElement: {
        prototype: HTMLKlevuDrawerElement;
        new (): HTMLKlevuDrawerElement;
    };
    interface HTMLKlevuDropdownElement extends Components.KlevuDropdown, HTMLStencilElement {
    }
    var HTMLKlevuDropdownElement: {
        prototype: HTMLKlevuDropdownElement;
        new (): HTMLKlevuDropdownElement;
    };
    interface HTMLKlevuFacetElement extends Components.KlevuFacet, HTMLStencilElement {
    }
    var HTMLKlevuFacetElement: {
        prototype: HTMLKlevuFacetElement;
        new (): HTMLKlevuFacetElement;
    };
    interface HTMLKlevuFacetListElement extends Components.KlevuFacetList, HTMLStencilElement {
    }
    var HTMLKlevuFacetListElement: {
        prototype: HTMLKlevuFacetListElement;
        new (): HTMLKlevuFacetListElement;
    };
    interface HTMLKlevuHeadingElement extends Components.KlevuHeading, HTMLStencilElement {
    }
    var HTMLKlevuHeadingElement: {
        prototype: HTMLKlevuHeadingElement;
        new (): HTMLKlevuHeadingElement;
    };
    interface HTMLKlevuInitElement extends Components.KlevuInit, HTMLStencilElement {
    }
    var HTMLKlevuInitElement: {
        prototype: HTMLKlevuInitElement;
        new (): HTMLKlevuInitElement;
    };
    interface HTMLKlevuLatestSearchesElement extends Components.KlevuLatestSearches, HTMLStencilElement {
    }
    var HTMLKlevuLatestSearchesElement: {
        prototype: HTMLKlevuLatestSearchesElement;
        new (): HTMLKlevuLatestSearchesElement;
    };
    interface HTMLKlevuMerchandisingElement extends Components.KlevuMerchandising, HTMLStencilElement {
    }
    var HTMLKlevuMerchandisingElement: {
        prototype: HTMLKlevuMerchandisingElement;
        new (): HTMLKlevuMerchandisingElement;
    };
    interface HTMLKlevuPaginationElement extends Components.KlevuPagination, HTMLStencilElement {
    }
    var HTMLKlevuPaginationElement: {
        prototype: HTMLKlevuPaginationElement;
        new (): HTMLKlevuPaginationElement;
    };
    interface HTMLKlevuPopularSearchesElement extends Components.KlevuPopularSearches, HTMLStencilElement {
    }
    var HTMLKlevuPopularSearchesElement: {
        prototype: HTMLKlevuPopularSearchesElement;
        new (): HTMLKlevuPopularSearchesElement;
    };
    interface HTMLKlevuPopupElement extends Components.KlevuPopup, HTMLStencilElement {
    }
    var HTMLKlevuPopupElement: {
        prototype: HTMLKlevuPopupElement;
        new (): HTMLKlevuPopupElement;
    };
    interface HTMLKlevuProductElement extends Components.KlevuProduct, HTMLStencilElement {
    }
    var HTMLKlevuProductElement: {
        prototype: HTMLKlevuProductElement;
        new (): HTMLKlevuProductElement;
    };
    interface HTMLKlevuProductGridElement extends Components.KlevuProductGrid, HTMLStencilElement {
    }
    var HTMLKlevuProductGridElement: {
        prototype: HTMLKlevuProductGridElement;
        new (): HTMLKlevuProductGridElement;
    };
    interface HTMLKlevuQueryElement extends Components.KlevuQuery, HTMLStencilElement {
    }
    var HTMLKlevuQueryElement: {
        prototype: HTMLKlevuQueryElement;
        new (): HTMLKlevuQueryElement;
    };
    interface HTMLKlevuQuicksearchElement extends Components.KlevuQuicksearch, HTMLStencilElement {
    }
    var HTMLKlevuQuicksearchElement: {
        prototype: HTMLKlevuQuicksearchElement;
        new (): HTMLKlevuQuicksearchElement;
    };
    interface HTMLKlevuRecommendationsElement extends Components.KlevuRecommendations, HTMLStencilElement {
    }
    var HTMLKlevuRecommendationsElement: {
        prototype: HTMLKlevuRecommendationsElement;
        new (): HTMLKlevuRecommendationsElement;
    };
    interface HTMLKlevuSearchFieldElement extends Components.KlevuSearchField, HTMLStencilElement {
    }
    var HTMLKlevuSearchFieldElement: {
        prototype: HTMLKlevuSearchFieldElement;
        new (): HTMLKlevuSearchFieldElement;
    };
    interface HTMLKlevuSearchLandingPageElement extends Components.KlevuSearchLandingPage, HTMLStencilElement {
    }
    var HTMLKlevuSearchLandingPageElement: {
        prototype: HTMLKlevuSearchLandingPageElement;
        new (): HTMLKlevuSearchLandingPageElement;
    };
    interface HTMLKlevuSimpleSearchElement extends Components.KlevuSimpleSearch, HTMLStencilElement {
    }
    var HTMLKlevuSimpleSearchElement: {
        prototype: HTMLKlevuSimpleSearchElement;
        new (): HTMLKlevuSimpleSearchElement;
    };
    interface HTMLKlevuSliderElement extends Components.KlevuSlider, HTMLStencilElement {
    }
    var HTMLKlevuSliderElement: {
        prototype: HTMLKlevuSliderElement;
        new (): HTMLKlevuSliderElement;
    };
    interface HTMLKlevuSlidesElement extends Components.KlevuSlides, HTMLStencilElement {
    }
    var HTMLKlevuSlidesElement: {
        prototype: HTMLKlevuSlidesElement;
        new (): HTMLKlevuSlidesElement;
    };
    interface HTMLKlevuSortElement extends Components.KlevuSort, HTMLStencilElement {
    }
    var HTMLKlevuSortElement: {
        prototype: HTMLKlevuSortElement;
        new (): HTMLKlevuSortElement;
    };
    interface HTMLKlevuSuggestionsListElement extends Components.KlevuSuggestionsList, HTMLStencilElement {
    }
    var HTMLKlevuSuggestionsListElement: {
        prototype: HTMLKlevuSuggestionsListElement;
        new (): HTMLKlevuSuggestionsListElement;
    };
    interface HTMLKlevuTextfieldElement extends Components.KlevuTextfield, HTMLStencilElement {
    }
    var HTMLKlevuTextfieldElement: {
        prototype: HTMLKlevuTextfieldElement;
        new (): HTMLKlevuTextfieldElement;
    };
    interface HTMLElementTagNameMap {
        "klevu-accordion": HTMLKlevuAccordionElement;
        "klevu-button": HTMLKlevuButtonElement;
        "klevu-checkbox": HTMLKlevuCheckboxElement;
        "klevu-cms-list": HTMLKlevuCmsListElement;
        "klevu-drawer": HTMLKlevuDrawerElement;
        "klevu-dropdown": HTMLKlevuDropdownElement;
        "klevu-facet": HTMLKlevuFacetElement;
        "klevu-facet-list": HTMLKlevuFacetListElement;
        "klevu-heading": HTMLKlevuHeadingElement;
        "klevu-init": HTMLKlevuInitElement;
        "klevu-latest-searches": HTMLKlevuLatestSearchesElement;
        "klevu-merchandising": HTMLKlevuMerchandisingElement;
        "klevu-pagination": HTMLKlevuPaginationElement;
        "klevu-popular-searches": HTMLKlevuPopularSearchesElement;
        "klevu-popup": HTMLKlevuPopupElement;
        "klevu-product": HTMLKlevuProductElement;
        "klevu-product-grid": HTMLKlevuProductGridElement;
        "klevu-query": HTMLKlevuQueryElement;
        "klevu-quicksearch": HTMLKlevuQuicksearchElement;
        "klevu-recommendations": HTMLKlevuRecommendationsElement;
        "klevu-search-field": HTMLKlevuSearchFieldElement;
        "klevu-search-landing-page": HTMLKlevuSearchLandingPageElement;
        "klevu-simple-search": HTMLKlevuSimpleSearchElement;
        "klevu-slider": HTMLKlevuSliderElement;
        "klevu-slides": HTMLKlevuSlidesElement;
        "klevu-sort": HTMLKlevuSortElement;
        "klevu-suggestions-list": HTMLKlevuSuggestionsListElement;
        "klevu-textfield": HTMLKlevuTextfieldElement;
    }
}
declare namespace LocalJSX {
    interface KlevuAccordion {
        /**
          * is accordion open
         */
        "open"?: boolean;
        /**
          * Should it initially be open
         */
        "startOpen"?: boolean;
    }
    interface KlevuButton {
        /**
          * Is button disabled
         */
        "disabled"?: boolean;
    }
    interface KlevuCheckbox {
        /**
          * Is checkbox checked
         */
        "checked"?: boolean;
        /**
          * Is disabled
         */
        "disabled"?: boolean;
        /**
          * Name of the checkbox
         */
        "name"?: string;
    }
    interface KlevuCmsList {
        /**
          * Caption of the listing
         */
        "caption"?: string;
        /**
          * Should use url parameter from link to create anchor
         */
        "link"?: boolean;
        "onKlevuCmsPageClick"?: (event: KlevuCmsListCustomEvent<Partial<KlevuRecord>>) => void;
        /**
          * List of Klevu results records with type of Page
         */
        "pages": Array<Partial<KlevuRecord>>;
    }
    interface KlevuDrawer {
        /**
          * Anchor to right or left side of the page
         */
        "anchor"?: KlevuPopupAnchor;
        /**
          * Display dim background on top of other content
         */
        "background"?: boolean;
        /**
          * Close by clicking outside of drawer
         */
        "closeAtOutsideClick"?: boolean;
        /**
          * Start side drawer open
         */
        "startOpen"?: boolean;
    }
    interface KlevuDropdown {
        "disabled"?: boolean;
        "name": string;
        "onKlevuDropdownChanged"?: (event: KlevuDropdownCustomEvent<string>) => void;
        "options": Array<{ value: string; text: String }>;
    }
    interface KlevuFacet {
        /**
          * Should the facet be in accordion
         */
        "accordion"?: boolean;
        /**
          * Start accordion open
         */
        "accordionStartOpen"?: boolean;
        /**
          * Set predefined order for options. Unfound values are in original order in end
         */
        "customOrder"?: string[];
        /**
          * Originating filter manager which to modify
         */
        "manager": FilterManager;
        /**
          * Which mode should facets be in
         */
        "mode"?: KlevuFacetMode;
        /**
          * From which options to build facet
         */
        "option"?: KlevuFilterResultOptions;
        /**
          * From which slider to build facet
         */
        "slider"?: KlevuFilterResultSlider;
    }
    interface KlevuFacetList {
        /**
          * Should use accordions to for facets
         */
        "accordion"?: boolean;
        /**
          * Custom order keys for every facet
         */
        "customOrder"?: { [key: string]: string[] };
        /**
          * Filter managet from which the list is built from
         */
        "manager": FilterManager;
        /**
          * Set mode for facets or if object is passed then define per key
         */
        "mode"?: KlevuFacetMode1 | { [key: string]: KlevuFacetMode1 };
    }
    interface KlevuHeading {
        "variant"?: KlevuHeadingVariant;
    }
    interface KlevuInit {
        "apiKey": string;
        "settings"?: KlevuUIGlobalSettings;
        "url": string;
    }
    interface KlevuLatestSearches {
        "caption"?: string;
    }
    interface KlevuMerchandising {
        /**
          * Which category products
         */
        "category": string;
        /**
          * Category title
         */
        "categoryTitle": string;
        /**
          * How many filters per facet to show
         */
        "filterCount"?: number;
        /**
          * Order filters in given order
         */
        "filterCustomOrder"?: { [key: string]: string[] };
        /**
          * Count of products for page
         */
        "limit"?: number;
        "renderProductSlot"?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string;
        /**
          * Order of results
         */
        "sort"?: KlevuSearchSorting;
    }
    interface KlevuPagination {
        "current"?: number;
        "max"?: number;
        "min"?: number;
        "nextNext"?: string;
        /**
          * Page that was changed into
         */
        "onKlevuPaginationChange"?: (event: KlevuPaginationCustomEvent<number>) => void;
        "prevText"?: string;
        "queryResult"?: KlevuQueryResult;
    }
    interface KlevuPopularSearches {
        "caption"?: string;
    }
    interface KlevuPopup {
        "anchor"?: KlevuPopupAnchor;
        "closeAtOutsideClick"?: boolean;
        "fullwidthContent"?: boolean;
        "openAtFocus"?: boolean;
        "startOpen"?: boolean;
    }
    interface KlevuProduct {
        /**
          * Force certain width for product. Do not use max-width
         */
        "fixedWidth"?: boolean;
        "hideBrand"?: boolean;
        "hideDescription"?: boolean;
        "hideImage"?: boolean;
        "hideName"?: boolean;
        "hidePrice"?: boolean;
        "hideSwatches"?: boolean;
        "onKlevuProductClick"?: (event: KlevuProductCustomEvent<KlevuProductOnProductClick>) => void;
        "product"?: Partial<KlevuRecord>;
        "variant"?: KlevuProductVariant;
    }
    interface KlevuProductGrid {
    }
    interface KlevuQuery {
        "category"?: string;
        "categoryTitle"?: string;
        /**
          * To how many filters limit results to
         */
        "filterCount"?: number;
        /**
          * What's the limit on page
         */
        "limit"?: number;
        "manager"?: FilterManager;
        /**
          * Offset of results
         */
        "offset"?: number;
        "onKlevuQueryResult"?: (event: KlevuQueryCustomEvent<{
    result: KlevuQueryResult
    manager: FilterManager
  }>) => void;
        /**
          * Overriden
         */
        "options"?: AllQueryOptions;
        "recommendationId"?: string;
        "searchTerm"?: string;
        /**
          * How to sort
         */
        "sort"?: KlevuSearchSorting;
        /**
          * What kind of query
         */
        "type": "search" | "merchandising" | "recommendation";
        "updateOnFilterChange"?: boolean;
    }
    interface KlevuQuicksearch {
        "fallbackTerm"?: string;
        "popupAnchor"?: KlevuPopupAnchor;
        "renderProductSlot"?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string;
        "searchCategories"?: boolean;
        "searchCmsPages"?: boolean;
    }
    interface KlevuRecommendations {
        /**
          * For cart recommendation you need to provide product id's in cart
         */
        "cartProductIds"?: string[];
        /**
          * For category product recommendation you need to provide categery path
         */
        "categoryPath"?: string;
        /**
          * For similiar products recommendation you need to provide productId and itemGroupId
         */
        "currentProductId"?: string;
        /**
          * For similiar products recommendation you need to provide productId and itemGroupId
         */
        "itemGroupId"?: string;
        /**
          * The ID of the recommendation
         */
        "recommendationId": string;
        /**
          * Title of the recommendation
         */
        "recommendationTitle": string;
        "renderProductSlot"?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string;
    }
    interface KlevuSearchField {
        /**
          * Fallback term to use if there are no results
         */
        "fallbackTerm"?: string;
        /**
          * Maximum amount of results
         */
        "limit"?: number;
        /**
          * When user clicks search button. Returns the search term.
         */
        "onKlevuSearchClick"?: (event: KlevuSearchFieldCustomEvent<string>) => void;
        /**
          * When results come from after typing in the search field. This is debounced to avoid excessive requests.
         */
        "onKlevuSearchResults"?: (event: KlevuSearchFieldCustomEvent<SearchResultsEventData>) => void;
        "onKlevuSearchSuggestions"?: (event: KlevuSearchFieldCustomEvent<SuggestionsEventData>) => void;
        /**
          * The placeholder text to display in the search field.
         */
        "placeholder"?: string;
        /**
          * Should try to find categories as well
         */
        "searchCategories"?: boolean;
        /**
          * Should try to find cms pages as well
         */
        "searchCmsPages"?: boolean;
        /**
          * Search products
         */
        "searchProducts"?: boolean;
        /**
          * Search suggestions
         */
        "searchSuggestions"?: boolean;
    }
    interface KlevuSearchLandingPage {
        "filterCount"?: number;
        "filterCustomOrder"?: { [key: string]: string[] };
        "limit"?: number;
        "renderProductSlot"?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string;
        "sort"?: KlevuSearchSorting;
        "term": string;
    }
    interface KlevuSimpleSearch {
        "onKlevuSuggestionClick"?: (event: KlevuSimpleSearchCustomEvent<string>) => void;
    }
    interface KlevuSlider {
        "end"?: number;
        "max": number;
        "min": number;
        "onKlevuSliderChange"?: (event: KlevuSliderCustomEvent<[number, number]>) => void;
        "showTooltips"?: boolean;
        "start"?: number;
    }
    interface KlevuSlides {
        "height"?: string;
    }
    interface KlevuSort {
        "onKlevuSortChanged"?: (event: KlevuSortCustomEvent<KlevuSearchSorting>) => void;
    }
    interface KlevuSuggestionsList {
        "caption"?: string;
        "suggestions": string[];
    }
    interface KlevuTextfield {
        "disabled"?: boolean;
        "onKlevuTextChanged"?: (event: KlevuTextfieldCustomEvent<string>) => void;
        "onKlevuTextFocused"?: (event: KlevuTextfieldCustomEvent<void>) => void;
        "placeholder"?: string;
        "value": string;
    }
    interface IntrinsicElements {
        "klevu-accordion": KlevuAccordion;
        "klevu-button": KlevuButton;
        "klevu-checkbox": KlevuCheckbox;
        "klevu-cms-list": KlevuCmsList;
        "klevu-drawer": KlevuDrawer;
        "klevu-dropdown": KlevuDropdown;
        "klevu-facet": KlevuFacet;
        "klevu-facet-list": KlevuFacetList;
        "klevu-heading": KlevuHeading;
        "klevu-init": KlevuInit;
        "klevu-latest-searches": KlevuLatestSearches;
        "klevu-merchandising": KlevuMerchandising;
        "klevu-pagination": KlevuPagination;
        "klevu-popular-searches": KlevuPopularSearches;
        "klevu-popup": KlevuPopup;
        "klevu-product": KlevuProduct;
        "klevu-product-grid": KlevuProductGrid;
        "klevu-query": KlevuQuery;
        "klevu-quicksearch": KlevuQuicksearch;
        "klevu-recommendations": KlevuRecommendations;
        "klevu-search-field": KlevuSearchField;
        "klevu-search-landing-page": KlevuSearchLandingPage;
        "klevu-simple-search": KlevuSimpleSearch;
        "klevu-slider": KlevuSlider;
        "klevu-slides": KlevuSlides;
        "klevu-sort": KlevuSort;
        "klevu-suggestions-list": KlevuSuggestionsList;
        "klevu-textfield": KlevuTextfield;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "klevu-accordion": LocalJSX.KlevuAccordion & JSXBase.HTMLAttributes<HTMLKlevuAccordionElement>;
            "klevu-button": LocalJSX.KlevuButton & JSXBase.HTMLAttributes<HTMLKlevuButtonElement>;
            "klevu-checkbox": LocalJSX.KlevuCheckbox & JSXBase.HTMLAttributes<HTMLKlevuCheckboxElement>;
            "klevu-cms-list": LocalJSX.KlevuCmsList & JSXBase.HTMLAttributes<HTMLKlevuCmsListElement>;
            "klevu-drawer": LocalJSX.KlevuDrawer & JSXBase.HTMLAttributes<HTMLKlevuDrawerElement>;
            "klevu-dropdown": LocalJSX.KlevuDropdown & JSXBase.HTMLAttributes<HTMLKlevuDropdownElement>;
            "klevu-facet": LocalJSX.KlevuFacet & JSXBase.HTMLAttributes<HTMLKlevuFacetElement>;
            "klevu-facet-list": LocalJSX.KlevuFacetList & JSXBase.HTMLAttributes<HTMLKlevuFacetListElement>;
            "klevu-heading": LocalJSX.KlevuHeading & JSXBase.HTMLAttributes<HTMLKlevuHeadingElement>;
            "klevu-init": LocalJSX.KlevuInit & JSXBase.HTMLAttributes<HTMLKlevuInitElement>;
            "klevu-latest-searches": LocalJSX.KlevuLatestSearches & JSXBase.HTMLAttributes<HTMLKlevuLatestSearchesElement>;
            "klevu-merchandising": LocalJSX.KlevuMerchandising & JSXBase.HTMLAttributes<HTMLKlevuMerchandisingElement>;
            "klevu-pagination": LocalJSX.KlevuPagination & JSXBase.HTMLAttributes<HTMLKlevuPaginationElement>;
            "klevu-popular-searches": LocalJSX.KlevuPopularSearches & JSXBase.HTMLAttributes<HTMLKlevuPopularSearchesElement>;
            "klevu-popup": LocalJSX.KlevuPopup & JSXBase.HTMLAttributes<HTMLKlevuPopupElement>;
            "klevu-product": LocalJSX.KlevuProduct & JSXBase.HTMLAttributes<HTMLKlevuProductElement>;
            "klevu-product-grid": LocalJSX.KlevuProductGrid & JSXBase.HTMLAttributes<HTMLKlevuProductGridElement>;
            "klevu-query": LocalJSX.KlevuQuery & JSXBase.HTMLAttributes<HTMLKlevuQueryElement>;
            "klevu-quicksearch": LocalJSX.KlevuQuicksearch & JSXBase.HTMLAttributes<HTMLKlevuQuicksearchElement>;
            "klevu-recommendations": LocalJSX.KlevuRecommendations & JSXBase.HTMLAttributes<HTMLKlevuRecommendationsElement>;
            "klevu-search-field": LocalJSX.KlevuSearchField & JSXBase.HTMLAttributes<HTMLKlevuSearchFieldElement>;
            "klevu-search-landing-page": LocalJSX.KlevuSearchLandingPage & JSXBase.HTMLAttributes<HTMLKlevuSearchLandingPageElement>;
            "klevu-simple-search": LocalJSX.KlevuSimpleSearch & JSXBase.HTMLAttributes<HTMLKlevuSimpleSearchElement>;
            "klevu-slider": LocalJSX.KlevuSlider & JSXBase.HTMLAttributes<HTMLKlevuSliderElement>;
            "klevu-slides": LocalJSX.KlevuSlides & JSXBase.HTMLAttributes<HTMLKlevuSlidesElement>;
            "klevu-sort": LocalJSX.KlevuSort & JSXBase.HTMLAttributes<HTMLKlevuSortElement>;
            "klevu-suggestions-list": LocalJSX.KlevuSuggestionsList & JSXBase.HTMLAttributes<HTMLKlevuSuggestionsListElement>;
            "klevu-textfield": LocalJSX.KlevuTextfield & JSXBase.HTMLAttributes<HTMLKlevuTextfieldElement>;
        }
    }
}
