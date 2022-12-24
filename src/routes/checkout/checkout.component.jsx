import CheckoutItemList from "../../components/checkout-item-list/checkout-item-list.component";

import "./checkout.styles.scss";

const Checkout = () => {
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
    </div>
  );
};

export default Checkout;
