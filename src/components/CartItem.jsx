import { currencyFormatter } from '../util/formatting.js'

export default function CartItem({ item, onDecrease, onIncrease }) {
  const formattedPrice = currencyFormatter.format(item.price)

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {formattedPrice}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  )
}
