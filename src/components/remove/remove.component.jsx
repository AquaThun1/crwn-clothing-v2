import { IconButton } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const RemoveButton = ({ id }) => {
  const { removeItem } = useContext(CartContext);

  return <IconButton onClick={() => removeItem(id)}>x</IconButton>;
};

export default RemoveButton;
