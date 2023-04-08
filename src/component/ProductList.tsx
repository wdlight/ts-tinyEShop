import useCart from '../hooks/useCart'
import useProducts from '../hooks/useProducts'
import React, { ReactElement } from 'react'
import Product from './Product'

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, sortedCart } = useCart()
  const { products } = useProducts()

  //q: instead of <p>loading</p> , use a spinner. give me a spinner example below
  // a: https://www.npmjs.com/package/react-spinners
  // a: https://www.npmjs.com/package/react-loader-spinner

  





  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  if ( products?.length){
    pageContent = products.map( product => {
      const inCart: boolean = sortedCart.some( item => item.sku === product.sku)
      return (
        <Product 
          key = {product.sku}
          product = {product}
          dispatch = {dispatch}
          REDUCER_ACTIONS = {REDUCER_ACTIONS}
          inCart = {inCart}
        />
      )
    })
  }

  const content = (
    <main className="main main--products">
      {pageContent}
    </main>
  )
  return content
}

export default ProductList
