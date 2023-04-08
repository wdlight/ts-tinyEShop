import { createContext, ReactElement, useEffect } from "react"
import { useState } from "react"

// Type Definitions
// Product Type
export type ProductType = {
  sku: string,
  name: string,
  price: number,
}
// nested children type
type ChildrenType = { children: ReactElement | ReactElement[] }

// Context Type - object with products array
export type UseProductsContextType = { products: ProductType[] }

// Data Definitions
// initial state of ProductsContext
const initState: ProductType[] = [];

const initContextState: UseProductsContextType = { products: [] }
const ProductsContext = createContext<UseProductsContextType>(initContextState)


// Provider Def. start .
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState)

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      // "npx json-server --watch data/products.json --port 3500" 를 사용하여 test data를 제공한다.
      const data = await fetch('http://localhost:3500/products')
      .then ( res => res.json() )
      .catch( err => console.log(err)
      )
      return data      
    }
    fetchProducts().then ( products => setProducts(products))
    console.log ( products)
  }, [])

  return (
    
    <ProductsContext.Provider value={{ products }}> 
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext