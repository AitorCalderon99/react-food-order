import Modal from './UI/Modal.jsx'
import { useContext } from 'react'
import CartContext from '../store/CartContext.jsx'
import { currencyFormatter } from '../util/formatting.js'
import Button from './UI/Button.jsx'
import UserProgressContext from '../store/UserProgressContext.jsx'

export default function Cart() {
  const cartContext = useContext(CartContext)
  const userProgressContext = useContext(UserProgressContext)

  const cartTotal = cartContext.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price
  }, 0)

  function handleCloseCart() {
    userProgressContext.hideCart()
  }

  return (
    <Modal className="cart" open={userProgressContext.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items?.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        <Button onClick={handleCloseCart}>Go to checkout</Button>
      </p>
    </Modal>
  )
}
