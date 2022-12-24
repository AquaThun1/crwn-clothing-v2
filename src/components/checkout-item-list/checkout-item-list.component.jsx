import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.compomnent";

const CheckoutItemList = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      {cartItems.map((cartItem) => (
        <CheckoutItem checkoutItem={cartItem} />
      ))}
    </div>
  );
};

export default CheckoutItemList;
