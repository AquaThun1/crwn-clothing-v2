import { useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.compomnent";
import { CartContext } from "../../contexts/cart.context";

import {
  CheckoutContainer,
  HeaderBlock,
  CheckoutHeader,
  Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
  const { totalCost, cartItems } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem cartItem={cartItem} key={cartItem.id} />
      ))}

      <Total>{`Total: R ${totalCost}`}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
