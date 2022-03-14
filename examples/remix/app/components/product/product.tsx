import { KlevuRecord } from "@klevu/core"
import styles from "./product.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

type Props = {
  product: KlevuRecord
}

export function Product(props: Props) {
  return (
    <div className="product">
      <img src={props.product.imageUrl} />
      <p>{props.product.name}</p>
    </div>
  )
}
