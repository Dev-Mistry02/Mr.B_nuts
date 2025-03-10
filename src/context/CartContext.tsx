import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  gallery?: string[];
  quantity?: number;
}

// Define cart context type
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
});

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex >= 0) {
        // If product exists, increase quantity
        const updatedCart = [...prevCart];
        const existingProduct = updatedCart[existingProductIndex];
        updatedCart[existingProductIndex] = {
          ...existingProduct,
          quantity: (existingProduct.quantity || 1) + 1
        };
        return updatedCart;
      } else {
        // If product doesn't exist, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  // Get total number of items in cart
  const getCartCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};