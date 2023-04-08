import { useReducer, useMemo } from "react"
import { createContext, ReactElement, useEffect } from "react"

export type CartItemType = {
  sku: string,
  name: string,
  price: number,
  quantity: number,
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

// CartState 를 위한 reducer정의
const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE 

export type ReducerAction = {
  type: string,
  payload?: CartItemType,
}

const cartReducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  // filteredCart를 payload의 sku와 다른 item으로 구성한다. 이때 payload가 없었으면 Error처리됨.
  if ( !action.payload ) throw new Error ( 'action.payload missing in ADD action' )      
  const filteredCart = state.cart.filter( item => item.sku !== action.payload!.sku )

  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD:
      // new item을 payload의 값으로 구성한다.
      const newItem = action.payload
      // item의 sku가 cart에서 찾아서 itemExit에 할당한다. 
      const itemExist = state.cart.find( item => item.sku === action.payload!.sku )
      // itemExist가 있으면 newItem에 quantity를 1 증가시키고 없으면 1로 set한다.
      newItem.quantity = itemExist ? itemExist.quantity + 1 : 1

      // filternedCart에 newItem을 추가형 return한다.
      return { cart: [...filteredCart, newItem] }

    case REDUCER_ACTION_TYPE.REMOVE:      
      return { cart: [...filteredCart] }

    case REDUCER_ACTION_TYPE.QUANTITY:
      // payload의 sku와 같은 item을 찾는다.  
      const item = state.cart.find( item => item.sku === action.payload!.sku )
      // item이 없으면 Error처리한다.
      if ( !item ) throw new Error ( 'item not found in QUANTITY action' )

      // item의 quantity를 payload의 quantity의 값으로 치환한다.
      item.quantity = action.payload!.quantity
      // filternedCart에 item을 추가형 return한다.
      return { cart: [...filteredCart, item] }

    case REDUCER_ACTION_TYPE.SUBMIT:
      return { cart: [] }
    default:  
      throw new Error ( 'Unidentified reducer action type')

  }
}

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(cartReducer, initCartState)

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE
  }, [])

  // total Item 개수를 구한다.
  const totalItems =state.cart.reduce( (acc, item) => acc + item.quantity, 0 )
  
  // total price를 구한다.
  const totalPrice = ( state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0 ) )
                    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  
  // cart의 item을 가격 역순으로 정렬한다.
  const sortedCart = state.cart.sort( (a, b) => b.price - a.price )
  

  return { dispatch, REDUCER_ACTIONS, totalItems,  totalPrice, sortedCart }
  
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems:  0,
  totalPrice: '',
  sortedCart: [],
}

export const CartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  const context = useCartContext(initCartState)
  return <CartContext.Provider value={context}>{children}</CartContext.Provider>
}

export default CartContext