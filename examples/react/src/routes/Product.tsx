import { KlevuFetch, KlevuRecord, products } from "@klevu/core"
import { CircularProgress, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function Product() {
  const [product, setProduct] = useState<KlevuRecord>()
  const params = useParams()

  const fetchProduct = useCallback(async () => {
    const res = await KlevuFetch(products([params.id]))
    setProduct(res.queriesById("search")?.records?.[0])
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
    </div>
  )
}
