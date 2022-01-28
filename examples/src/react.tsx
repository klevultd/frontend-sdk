import React, { useMemo, useEffect } from "react"
import ReactDOM from "react-dom"
import debounce from "lodash.debounce"

import { KlevuConfig, search, KlevuTypeOfRecord } from "@klevu/core"

KlevuConfig.init({
  url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-156925593843210765",
})

ReactDOM.render(<App />, document.getElementById("reactroot"))

function App() {
  const [products, setProducts] = React.useState(undefined)

  const changeHandler = async (event) => {
    if (event.target.length < 3) {
      return
    }

    const result = await search({
      query: {
        term: event.target.value,
      },
      limit: 5,
      typeOfRecords: [KlevuTypeOfRecord.Product],
    })
    setProducts(result.queryResults[0].records)
  }

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [])

  return (
    <React.Fragment>
      <input
        type="text"
        onChange={debouncedChangeHandler}
        placeholder="Search"
      />

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

function useState(undefined: undefined): [any, any] {
  throw new Error("Function not implemented.")
}
