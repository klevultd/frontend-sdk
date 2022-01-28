import React, { useMemo, useEffect, useState } from "react"
import debounce from "lodash.debounce"

import {
  applyFilters,
  KlevuFetch,
  listFilters,
  newArrivals,
  search,
  suggestions,
  trending,
} from "@klevu/core"
import { merchendising } from "@klevu/core/src/query/merchendising/merchendising"

export function Search() {
  const [products, setProducts] = useState(undefined)
  const [sugs, setSuggestions] = useState<string[]>([])

  const changeHandler = async (event) => {
    if (event.target.length < 3) {
      return
    }

    const result = await KlevuFetch(
      applyFilters([
        {
          key: "category",
          settings: {
            singleSelect: true,
          },
          values: [],
        },
      ]),
      listFilters(["category"]),
      search(event.target.value, {
        fields: ["sku", "tags"],
      }),
      suggestions(event.target.value),
      newArrivals(),
      trending()
    )
    setProducts(result.queryResults.search.records)
    setSuggestions(
      result.suggestionResults.suggestions.suggestions.map((i) => i.suggest)
    )
  }

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [])

  return (
    <React.Fragment>
      <input onChange={debouncedChangeHandler} />

      <div>suggestions: [{sugs.join(",")}]</div>

      <div className="productGrid">
        {products &&
          products.map((p) => (
            <div key={p.id} className="product">
              <img src={p.imageUrl} />
              <p>{p.name}</p>
              <a href={p.url}>Buy now</a>
            </div>
          ))}
      </div>
    </React.Fragment>
  )
}
