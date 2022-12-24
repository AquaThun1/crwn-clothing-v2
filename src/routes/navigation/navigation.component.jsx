import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../contexts/cart.context";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { showCartDropdown } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to='/shop'>Shop</NavLink>
          <NavLink to='/contact'>Contact</NavLink>
          {currentUser ? (
            <NavLink onClick={signOutUser}>{"Sign-out"}</NavLink>
          ) : (
            <NavLink to={"/auth"}>{"Sign-in"}</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {showCartDropdown && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
