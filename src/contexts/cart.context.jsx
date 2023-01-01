import { createContext, useReducer } from "react";

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

//Reducers

export const CART_ACTION_TYPES = {
  SHOW_CART_DROPDOWN: "SHOW_CART_DROPDOWN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SHOW_CART_DROPDOWN:
      return { ...state, showCartDropdown: !state.showCartDropdown };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in the CartReducer`);
  }
};

const CART_INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  totalCost: 0,
  showCartDropdown: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

  const { cartItems, showCartDropdown, cartCount, totalCost } = state;

  const setShowCartDropdown = () => {
    dispatch({ type: CART_ACTION_TYPES.SHOW_CART_DROPDOWN });
  };

  const updateCartReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCost = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        ...state,
        cartItems: newCartItems,
        cartCount: newCartCount,
        totalCost: newCost,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    updateCartReducer(newCartItems);
  };

  const adjustQuantity = (increment, productId) => {
    const newCartItems = cartItems.map((cartItem) =>
      cartItem.id === productId
        ? increment
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

    updateCartReducer(newCartItems.filter((item) => item.quantity > 0));
  };

  const removeItem = (productId) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId);

    updateCartReducer(newCartItems);
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
