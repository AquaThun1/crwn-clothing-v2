import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems, setShowCartDropdown } = useContext(CartContext);

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} />
        ))}
      </div>
      <Link to={"/checkout"} onClick={() => setShowCartDropdown(false)}>
        <Button>Go to Checkout</Button>
      </Link>
    </div>
  );
};

export default CartDropdown;
