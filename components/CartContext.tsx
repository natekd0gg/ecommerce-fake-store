'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

type Props = {
  children?: ReactNode;
};

export interface CartItem extends Product {
  quantity: number;
}

type CartContextType = {
  products: Product[];
  loading: boolean;
  cart: CartItem[];
  addItemToCart: (product: Product, quantity: number) => void;
  removeItemFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  removeAllItemsFromCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('api/products');
        const products = await response.json();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cartData) {
      setCart(cartData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (product: Product, quantity: number) => {
    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find(
        (item: CartItem) => item.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item: CartItem) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });

    toast.success('Item added to cart.');
  };

  const removeItemFromCart = (productId: number) => {
    setCart((prevCart: CartItem[]) => {
      return prevCart.filter((item: CartItem) => item.id !== productId);
    });

    toast.success('Item removed from cart.');
  };

  const updateCartItemQuantity = (productId: number, newQuantity: number) => {
    setCart((prevCart: CartItem[]) => {
      return prevCart.map((item: CartItem) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeAllItemsFromCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        loading,
        cart,
        addItemToCart,
        removeItemFromCart,
        removeAllItemsFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used within a CartProvider. Make sure your component is wrapped in CartProvider.'
    );
  }

  return context;
};
