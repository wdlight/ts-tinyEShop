import React from 'react'
import useCart from '../hooks/useCart'
import { useState } from 'react'
import { CartItemType } from '../context/CartProvider'
import CartItem from './CartItem'




const Cart = () => {
  const [ confirm, setConfirm ] = useState(false)
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, sortedCart } = useCart()

  const onSubmitOrder = () => {
    dispatch( { type: REDUCER_ACTIONS.SUBMIT } )
    setConfirm(true)
  }

  const pageContent = confirm
    ? <p>Thank you for your order!</p>
    : <>
        <h2>Shopping Cart</h2>
        <ul className="cart">
          {sortedCart.map((item: CartItemType) => (
            <CartItem 
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />            
            
          ))}
        </ul>
          
        <div className="cart__totals">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
          <button className="cart__submit" disabled={!totalItems} 
            onClick={onSubmitOrder}> Place Order</button>
        </div>
        
      </>
  const content = ( 
    <main className="main main--cart"> {pageContent} </main>
  )
  return content
}

export default Cart
