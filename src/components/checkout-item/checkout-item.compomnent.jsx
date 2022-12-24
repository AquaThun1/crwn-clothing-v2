import Incrementer from "../quantity-adjuster/quantity-adjuster.component";
import RemoveButton from "../remove/remove.component";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, price, imageUrl, id } = cartItem;

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <div className='quantity'>
        <Incrementer checkoutItem={cartItem} />
      </div>
      <span className='price'>{price}</span>
      <RemoveButton id={id} />
    </div>
  );
};

export default CheckoutItem;
