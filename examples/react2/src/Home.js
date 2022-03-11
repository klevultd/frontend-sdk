import React, { useEffect, useMemo, useState } from "react"
import {
  KlevuDomEvents,
  KlevuFetch,
  KlevuLastSearches,
  KlevuTypeOfRecord,
  search,
  suggestions,
  trendingProducts,
} from "@klevu/core"
import logo from "./cropped-klevu-icon-32x32.png"
import "./Home.css"

function Home() {
  const [searchValue, setSearchValue] = useState("")
  const [products, setProducts] = useState([])
  const [trendProducts, setTrendingProducts] = useState([])
  const [lastSearches, setLastSearches] = useState(KlevuLastSearches.get())
  const [sugs, setSuggestions] = useState([])
  const onSearchChange = (event) => {
    setSearchValue(event.target.value)
  }
  const doSearch = (event) => {}
  return (
    <div className="Home">
      <header className="App-header flex justify-between items-center p-3 bg-blue-700 text-white">
        <div className="flex items-center">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link text-white"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
        <div>
          <input
            type="text"
            value={searchValue}
            onChange={onSearchChange}
            onKeyUp={onSearchChange}
          />
        </div>
      </header>
    </div>
  )
}

export default Home
