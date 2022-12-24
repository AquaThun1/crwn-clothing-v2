import { useContext } from "react";
import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { showCartDropdown, setShowCartDropdown, cartCount } =
    useContext(CartContext);

  return (
    <div
      className='cart-icon-container'
      onClick={() => setShowCartDropdown(!showCartDropdown)}
    >
      <ShoppingBagIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
