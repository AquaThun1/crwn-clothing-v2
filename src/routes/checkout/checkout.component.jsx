import { useContext } from "react";

import CheckoutItemList from "../../components/checkout-item-list/checkout-item-list.component";
import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
  const { totalCost } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      <CheckoutItemList />

      <span className='total'>{`Total: R ${totalCost}`}</span>
    </div>
  );
};

export default Checkout;
