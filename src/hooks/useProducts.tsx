import { useContext } from 'react';
import ProductsContext from '../context/ProductsProvider';
import { UseProductsContextType } from '../context/ProductsProvider';

const useProducts = (): UseProductsContextType => {
  const context = useContext(ProductsContext);
  return context;
}

export default useProducts