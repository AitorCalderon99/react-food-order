import { createContext, useReducer } from 'react'

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
})

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      )
      const updatedItems =
        existingCartItemIndex > -1
          ? state.items.map((item, index) =>
              index === existingCartItemIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.items, { ...action.item, quantity: 1 }]

      return { ...state, items: updatedItems }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.id
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item
          )
          .filter((item) => item.quantity > 0),
      }

    default:
      return state
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

  const cartContext = {
    items: cart.items,
    addItem: (item) => dispatchCartAction({ type: 'ADD_ITEM', item }),
    removeItem: (id) => dispatchCartAction({ type: 'REMOVE_ITEM', id }),
  }

  return <CartContext value={cartContext}>{children}</CartContext>
}

export default CartContext
