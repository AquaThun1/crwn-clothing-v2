import { useContext } from "react";
import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const { showCartDropdown, setShowCartDropdown, cartCount } =
    useContext(CartContext);

  return (
    <CartIconContainer onClick={() => setShowCartDropdown(!showCartDropdown)}>
      <ShoppingBagIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
