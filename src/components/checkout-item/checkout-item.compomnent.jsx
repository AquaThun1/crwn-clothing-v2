import "./checkout-item.styles.scss";
import { IconButton } from "@mui/material";
import Incrementer from "../quantity-adjuster/quantity-adjuster.component";
import RemoveButton from "../remove/remove.component";

const CheckoutItem = ({ checkoutItem }) => {
  const { name, quantity, price, imageUrl, id } = checkoutItem;

  return (
    <div className='checkout-item-container'>
      <img src={imageUrl} alt={`${name}`} />
      <span>{name}</span>
      <Incrementer checkoutItem={checkoutItem} />
      <span>{price}</span>
      <RemoveButton id={id} />
    </div>
  );
};

export default CheckoutItem;
