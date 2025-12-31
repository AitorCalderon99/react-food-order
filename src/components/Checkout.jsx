import Modal from './UI/Modal.jsx'
import { useContext, useActionState } from 'react'
import CartContext from '../store/CartContext.jsx'
import { currencyFormatter } from '../util/formatting.js'
import Input from './UI/Input.jsx'
import Button from './UI/Button.jsx'
import UserProgressContext from '../store/UserProgressContext.jsx'
import useHttp from '../hooks/useHttp.jsx'
import Error from './Error.jsx'

const requestConfig = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}

export default function Checkout() {
  const cartContext = useContext(CartContext)
  const userProgressContext = useContext(UserProgressContext)

  const cartTotal = currencyFormatter.format(
    cartContext.items.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price
    }, 0)
  )

  const { data, error, sendRequest, clearData } = useHttp(
    'http://localhost:3000/orders',
    requestConfig
  )

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries())

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    )
  }

  const [formState, formAction, pending] = useActionState(checkoutAction, null)

  function handleFinish() {
    userProgressContext.hideCheckout()
    cartContext.clearCart()
    clearData()
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={userProgressContext.hideCheckout}>
        Close
      </Button>
      <Button>Submit order</Button>
    </>
  )

  if (pending) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressContext.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order has been submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    )
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
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total amount: {cartTotal}</p>
        <Input label="Full name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error message={error} title="Failed to submit" />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  )
}
