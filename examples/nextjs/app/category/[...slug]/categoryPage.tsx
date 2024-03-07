"use client"

import { KlevuInit, KlevuMerchandising } from "@klevu/ui-react"
import "@klevu/ui/dist/klevu-ui/klevu-ui.css"

type Props = {
  categorySlug: string[]
}

export default function CategoryPage(props: Props) {
  console.log(props)
  const category = props.categorySlug.join("/")

  return (
    <KlevuInit
      url="https://eucs29v2.ksearchnet.com/cs/v2/search"
      apiKey="klevu-164651914788114877"
    >
      <KlevuMerchandising
        category={category}
        categoryTitle="Men's wear" // this needs to implemented in real solution
      />
    </KlevuInit>
  )
}
