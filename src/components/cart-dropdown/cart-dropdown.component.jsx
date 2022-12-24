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
      {cartItems.length > 0 ? (
        <>
          <div className='cart-items'>
            {cartItems.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))}
          </div>
          <Link to={"/checkout"} onClick={() => setShowCartDropdown(false)}>
            <Button>Go to Checkout</Button>
          </Link>
        </>
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
  );
};

export default CartDropdown;
