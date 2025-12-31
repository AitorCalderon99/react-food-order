import Modal from './UI/Modal.jsx'
import { useContext } from 'react'
import CartContext from '../store/CartContext.jsx'
import { currencyFormatter } from '../util/formatting.js'
import Input from './UI/Input.jsx'
import Button from './UI/Button.jsx'
import UserProgressContext from '../store/UserProgressContext.jsx'

export default function Checkout() {
  const cartContext = useContext(CartContext)
  const userProgressContext = useContext(UserProgressContext)

  const cartTotal = currencyFormatter.format(
    cartContext.items.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price
    }, 0)
  )

  function handleSubmit(event) {
    event.preventDefault()

    const fd = new FormData(event.target)
    const customerData = Object.fromEntries(fd.entries())

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      }),
    })
  }

  return (
    <Modal
      open={userProgressContext.progress === 'checkout'}
      onClose={
        userProgressContext.progress === 'checkout'
          ? userProgressContext.hideCheckout
          : null
      }
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {cartTotal}</p>
        <Input label="Full name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button
            type="button"
            textOnly
            onClick={userProgressContext.hideCheckout}
          >
            Close
          </Button>
          <Button>Submit order</Button>
        </p>
      </form>
    </Modal>
  )
}
