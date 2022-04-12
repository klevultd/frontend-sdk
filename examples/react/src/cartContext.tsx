import { KlevuRecord } from "@klevu/core"
import React, { useContext, useState } from "react"

type Context = {
  items: KlevuRecord[]
  add: (product: KlevuRecord) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = React.createContext<Context>({} as any)

export function useCart() {
  return useContext(CartContext)
}

export function CartContextProvider(props: { children: any }) {
  const [items, setItems] = useState<KlevuRecord[]>([])

  const add = (product: KlevuRecord) => {
    items.push(product)
    setItems(items)
  }

  const remove = (id: string) => {
    items.splice(
      items.findIndex((p) => p.id === id),
      1
    )
    setItems(items)
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
