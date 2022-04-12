import { Badge, IconButton } from "@mui/material"
import { useCart } from "../cartContext"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { Link } from "react-router-dom"
import { useEffect } from "react"

export function CartButton() {
  const cart = useCart()

  return (
    <Badge badgeContent={cart.items.length} color="primary">
      <Link to="/cart">
        <IconButton>
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Link>
    </Badge>
  )
}
