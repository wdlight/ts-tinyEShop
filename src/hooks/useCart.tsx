import { useContext } from 'react';
import CartContext from '../context/CartProvider';
import { UseCartContextType } from '../context/CartProvider';

const useCart = (): UseCartContextType => {
  const context = useContext(CartContext);
  return context;
}

export default useCart