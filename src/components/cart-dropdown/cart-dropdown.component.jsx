import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  DropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems, setShowCartDropdown } = useContext(CartContext);

  return (
    <DropdownContainer>
      {cartItems.length > 0 ? (
        <>
          <CartItems>
            {cartItems.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))}
          </CartItems>
          <Link to={"/checkout"} onClick={() => setShowCartDropdown(false)}>
            <Button>Go to Checkout</Button>
          </Link>
        </>
      ) : (
        <EmptyMessage>Your cart is empty</EmptyMessage>
      )}
    </DropdownContainer>
  );
};

export default CartDropdown;
