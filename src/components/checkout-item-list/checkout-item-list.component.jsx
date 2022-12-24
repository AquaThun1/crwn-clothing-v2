import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.compomnent";

import "./checkout-item-list.styles.scss";

const CheckoutItemList = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className='checkout-items-list'>
      {cartItems.map((cartItem) => (
        <CheckoutItem checkoutItem={cartItem} />
      ))}
    </div>
  );
};

export default CheckoutItemList;
