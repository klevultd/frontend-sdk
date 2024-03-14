import { KlevuRecord } from "@klevu/core"
import React, { useContext, useState } from "react"

export type CartItem = KlevuRecord & {
  klevu_product_boosting: number
  klevu_applied_filter_boosts: string
  klevu_applied_keyword_boosts: string
}

type Context = {
  items: CartItem[]
  add: (product: CartItem) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = React.createContext<Context>({} as any)

export function useCart() {
  return useContext(CartContext)
}

export function CartContextProvider(props: { children: any }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add = (product: CartItem) => {
    items.push(product)
    setItems(Array.from(items))
  }

  const remove = (id: string) => {
    items.splice(
      items.findIndex((p) => p.id === id),
      1
    )
    setItems(Array.from(items))
  }

  const clear = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        clear,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}
