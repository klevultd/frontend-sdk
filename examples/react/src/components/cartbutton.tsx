import { Badge, IconButton } from "@mui/material"
import { useCart } from "../cartContext"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export function CartButton() {
  const cart = useCart()
  const [count, setCount] = useState(cart.items.length)

  useEffect(() => {
    setCount(cart.items.length)
  }, [JSON.stringify(cart.items)])

  return (
    <Badge badgeContent={count} color="primary">
      <Link to="/cart">
        <IconButton>
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Link>
    </Badge>
  )
}
