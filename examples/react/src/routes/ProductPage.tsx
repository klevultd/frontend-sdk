import { KlevuFetch, KlevuRecord, products, similarProducts } from "@klevu/core"
import { CircularProgress, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../components/product"

export function ProductPage() {
  const [product, setProduct] = useState<KlevuRecord>()
  const [similar, setSimilar] = useState<KlevuRecord[]>([])
  const params = useParams()

  const fetchProduct = useCallback(async () => {
    const res = await KlevuFetch(products([params.id]))
    const product = res.queriesById("products")?.records?.[0]
    setProduct(product)

    const similarRes = await KlevuFetch(similarProducts([product]))

    setSimilar(similarRes.queriesById("similar")?.records)
  }, [params.id])

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  if (!product) {
    return <CircularProgress variant="indeterminate" />
  }

  return (
    <div>
      <Typography variant="h1">{product.name}</Typography>
      <img src={product.image} alt={product.name} />
      <p>{product.shortDesc}</p>

      <Typography variant="h2">Similar products</Typography>
      {similar.map((p) => (
        <Product product={p} />
      ))}
    </div>
  )
}
