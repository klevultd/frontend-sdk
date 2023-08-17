import React, { useCallback, useEffect, useState } from "react"
import { useCart } from "./cartContext"
import { useParams } from "react-router-dom"
import { KlevuConfig, KlevuFetch, KlevuRecord, products } from "@klevu/core"
import { KlevuButton } from "@klevu/ui-react"

const ProductPage = () => {
  const [product, setProduct] = useState<KlevuRecord>()
  const params = useParams()
  const cart = useCart()
  const addToCart: React.MouseEventHandler<HTMLKlevuButtonElement> = (
    event,
  ) => {
    cart.add(product)
    event.preventDefault()
    event.stopPropagation()
    return false
  }
  const fetchProduct = useCallback(async () => {
    // console.log({
    //   id: params.id,
    //   products: products([params.id]),
    //   config: KlevuConfig,
    // })
    const res = await KlevuFetch(products([params.id]))

    const product = res.queriesById("products")?.records?.[0]
    setProduct(product)
  }, [params.id])

  useEffect(() => {
    console.log("ProductPage useEffect")
    fetchProduct()
  }, [params.id])

  console.log({ product })

  if (!product) {
    return <span>Loading...</span>
  }
  return (
    <div>
      <div className="productInfo">
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "50%", width: "50%" }}
        />
        <div>
          {product.shortDesc.length > 0 ? (
            <p>{product.shortDesc}</p>
          ) : (
            <>
              <p>
                Perfect for leveling up your ecommerce style. Klevu Product
                Discovery Platform captures e-commerce shoppers’ intent and then
                leverages AI to provide highly relevant, personalized online
                search and discovery experiences that go well beyond keywords
                typed into the search box.
              </p>
              <p>
                Using Klevu on your customer-facing ecommerce interfaces can
                help you improve revenue per web session by 37%.
              </p>
              <p>
                The Klevu Product Discovery Suite is equipped with the
                following:
              </p>
              <ul>
                <li>
                  Harness the power of real-time shopper intent with Smart
                  Search
                </li>
                <li>
                  Balance AI magic and strategic control with Smart Category
                  Merchandising
                </li>
                <li>
                  Delight shoppers with hyper-relevant Smart Product
                  Recommendations
                </li>
              </ul>
              <p>
                Using Klevu on your ecommerce website may cause product
                discovery superpowers.
              </p>
            </>
          )}
          <KlevuButton onClick={addToCart}>Add to cart</KlevuButton>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
