import React, { ReactElement, memo } from 'react'
import { CartItemType } from '../context/CartProvider'
import { ReducerAction, ReducerActionType } from '../context/CartProvider'

type PropsType = {
  item: CartItemType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType

}
const CartItem = ({item, dispatch, REDUCER_ACTIONS} : PropsType) => {

  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

  const lineTotal: number = (item.quantity * item.price)
  const hightestQuantity: number = 20 > item.quantity ? 20 : item.quantity 
  const optionValues: number[] = [...Array(hightestQuantity).keys()].map( i => i + 1 )

  const options: ReactElement[] = optionValues.map ( val => 
    <option key={val} value={val}>{val}</option>)

  const onChangeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch( {
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, quantity: parseInt(e.target.value)}
    })
  }

  const onRemoveItem = () => {
    dispatch( {
      type: REDUCER_ACTIONS.REMOVE,
      payload: item
    })
  }

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Item Price">{new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'USD'}).format( item.price)}</div>
      <label htmlFor="itemQuantity">Item Quantity</label>
      <select 
        name="itemQuantity" 
        id="itemQuantity" 
        aria-label="Item Quantity"
        value={item.quantity} 
        onChange={onChangeQuantity}
        className="cart__select"
      >
        {options}
      </select>
      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
      {new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'USD'}).format( lineTotal)}
      </div>

      <button className="cart__button"
        aria-label="Remove Item From cart"
        title="Remove Item From cart"
        onClick={onRemoveItem}
      >❌</button>
    </li>

  )


  return content
}
function areItemsEqual({item: prevItem}: PropsType, {item: nextItem}: PropsType) {
  
  return Object.keys( prevItem).every( key => 
    prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType])
  
}
const MemoizedCartItem = memo<typeof CartItem>(CartItem, areItemsEqual)
export default MemoizedCartItem
