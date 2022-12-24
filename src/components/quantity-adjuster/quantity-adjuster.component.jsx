import { IconButton } from "@mui/material";
import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./quantity-adjustor.styles.scss";

const Incrementer = ({ checkoutItem }) => {
  const { adjustQuantity } = useContext(CartContext);

  const { quantity, id } = checkoutItem;

  return (
    <div className='incrementor'>
      <IconButton onClick={() => adjustQuantity(false, id)}>{"<"}</IconButton>
      <span>{quantity}</span>
      <IconButton onClick={() => adjustQuantity(true, id)}>{">"}</IconButton>
    </div>
  );
};

export default Incrementer;
