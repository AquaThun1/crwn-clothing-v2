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
  adjustQuantity: () => null,
  removeItem: () => null,
  totalCost: null,
});

export const CartProvider = ({ children }) => {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCost = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    setTotalCost(newCost);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const updatedCartItems = addCartItem(cartItems, productToAdd);
    setCartCount(updatedCartItems.length);
    setCartItems(updatedCartItems);
  };

  const adjustQuantity = (increment, productId) => {
    const newCartItems = cartItems.map((cartItem) =>
      cartItem.id === productId
        ? increment
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

    setCartItems(newCartItems.filter((item) => item.quantity > 0));
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const value = {
    showCartDropdown,
    setShowCartDropdown,
    cartItems,
    addItemToCart,
    cartCount,
    adjustQuantity,
    removeItem,
    totalCost,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
