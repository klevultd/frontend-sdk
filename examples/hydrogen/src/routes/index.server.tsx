import React from "react"
import { Header } from "../components/header.client"

export default function Home(props: { pathname: string }) {
  return (
    <div>
      <Header pathname={props.pathname} />

      <h1>Welcome to Klevu Hydrogen demo</h1>
      <p>
        Top right corner you have a quicksearch box to find products. Pressing
        enter there takes you to search landing page.
      </p>
      <p>
        And then there is <a href="/category/women">category pages.</a>
      </p>
    </div>
  )
}
