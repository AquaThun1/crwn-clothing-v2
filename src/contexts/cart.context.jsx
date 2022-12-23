import { createContext, useState } from "react";

export const CartContext = createContext({
  showCartDropdown: Boolean,
  setShowCartDropdown: () => null,
});

export const CartProvider = ({ children }) => {
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  const value = { showCartDropdown, setShowCartDropdown };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
