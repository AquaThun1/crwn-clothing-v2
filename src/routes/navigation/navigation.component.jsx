import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";

import "./navigation.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { showCartDropdown } = useContext(CartContext);

  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>

        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            Shop
          </Link>
          <Link className='nav-link' to='/contact'>
            Contact
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>
              {"Sign-out"}
            </span>
          ) : (
            <Link className='nav-link' to={"/auth"}>
              {"Sign-in"}
            </Link>
          )}
          <CartIcon />
        </div>
        {showCartDropdown && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
