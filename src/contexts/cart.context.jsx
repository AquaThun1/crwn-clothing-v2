import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  let existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  showCartDropdown: Boolean,
  setShowCartDropdown: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartCount: null,
});

export const CartProvider = ({ children }) => {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const updatedCartItems = addCartItem(cartItems, productToAdd);
    setCartCount(updatedCartItems.length);
    setCartItems(updatedCartItems);
  };

  const value = {
    showCartDropdown,
    setShowCartDropdown,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
