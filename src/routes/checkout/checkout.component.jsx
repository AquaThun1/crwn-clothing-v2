import { useContext } from "react";
import CheckoutItemList from "../../components/checkout-item-list/checkout-item-list.component";
import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
  const { totalCost } = useContext(CartContext);

  return (
    <div className='checkout-page'>
      <div className='item-descriptions'>
        <span>Product</span>
        <span>Description</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Remove</span>
      </div>
      <div className='checkout-items'>
        <CheckoutItemList />
      </div>
      <div className='total-cost'>
        <span>{`Total: R ${totalCost}`}</span>
      </div>
    </div>
  );
};

export default Checkout;
