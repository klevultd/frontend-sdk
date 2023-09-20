# klevu-util-dom-events



<!-- Auto Generated Below -->


## Overview

Utility compoenent that simplifies listening Klevu SDK Dom events
https://docs.klevu.com/headless-sdk/events-analytics#dhk6Y

## Events

| Event                        | Description | Type                                                                               |
| ---------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `klevuClickEventSent`        |             | `CustomEvent<{ productId: string; product?: Partial<KlevuRecord> \| undefined; }>` |
| `klevuFiltersApplied`        |             | `CustomEvent<{ filters: FilterManagerFilters[]; }>`                                |
| `klevuFilterSelectionUpdate` |             | `CustomEvent<{ key: string; name: string; selected: boolean; }>`                   |
| `klevuLastSearchUpdate`      |             | `CustomEvent<void>`                                                                |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
