import logoImg from '../assets/logo.jpg'
import Button from './UI/Button.jsx'
import { useContext } from 'react'
import CartContext from '../store/CartContext.jsx'

export default function Header() {
  const cartContext = useContext(CartContext)
  const totalCartItems = cartContext.items.reduce(
    (totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity
    },
    0
  )

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo image" />
        <h1>ReactFOOD</h1>
      </div>
      <nav>
        <Button textOnly>Carty ({totalCartItems})</Button>
      </nav>
    </header>
  )
}
