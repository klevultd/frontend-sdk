import { KlevuRecord, KlevuFetch, products } from "@klevu/core"
import { KlevuButton, KlevuRecommendations } from "@klevu/ui-react"
import React, { useState, useCallback, Fragment, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../cartContext"

export function ProductPage() {
  const [product, setProduct] = useState<KlevuRecord>()
  const params = useParams()
  const cart = useCart()

  const fetchProduct = useCallback(async () => {
    const res = await KlevuFetch(products([params.id]))

    const product = res.queriesById("products")?.records?.[0]
    setProduct(product)
  }, [params.id])

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const addToCart: React.MouseEventHandler<HTMLKlevuButtonElement> = (
    event
  ) => {
    cart.add(product)
    event.preventDefault()
    event.stopPropagation()
    return false
  }

  if (!product) {
    return <span>Loading...</span>
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <div className="productInfo">
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", width: "100%" }}
        />
        <div>
          {product.shortDesc.length > 0 ? (
            <p>{product.shortDesc}</p>
          ) : (
            <Fragment>
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
            </Fragment>
          )}
          <KlevuButton onClick={addToCart}>Add to cart</KlevuButton>
        </div>
      </div>

      <KlevuRecommendations
        recommendationTitle="Also viewed KMC recommendation"
        recommendationId="k-efd5337c-051e-44a2-810c-e23de2be513f"
        currentProductId={params.id}
        itemGroupId={params.groupId}
      ></KlevuRecommendations>
    </div>
  )
}
