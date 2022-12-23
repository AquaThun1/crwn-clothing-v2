import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;

  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={`${name}`} className />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>{`${quantity} x R ${price}`}</span>
      </div>
    </div>
  );
};

export default CartItem;
