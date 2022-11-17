import { KlevuSearchLandingPage } from "@klevu/ui-react"
import React from "react"
import { useLocation } from "react-router-dom"

function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export function SearchResultPage() {
  const query = useQuery()
  return <KlevuSearchLandingPage term={query.get("q")}></KlevuSearchLandingPage>
}
