# klevu-recommendations



<!-- Auto Generated Below -->


## Properties

| Property                           | Attribute              | Description                  | Type     | Default     |
| ---------------------------------- | ---------------------- | ---------------------------- | -------- | ----------- |
| `recommendationId` _(required)_    | `recommendation-id`    | The ID of the recommendation | `string` | `undefined` |
| `recommendationTitle` _(required)_ | `recommendation-title` | Title of the recommendation  | `string` | `undefined` |


## Dependencies

### Depends on

- [klevu-slides](../klevu-slides)
- [klevu-product](../klevu-product)

### Graph
```mermaid
graph TD;
  klevu-recommendations --> klevu-slides
  klevu-recommendations --> klevu-product
  style klevu-recommendations fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
