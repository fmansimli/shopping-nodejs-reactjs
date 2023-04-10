import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { authState } from "../../store/auth.state";
import { statisticSelector } from "../../store/cart.state";

import logo from "../../assets/logo.svg";

import NavItem from "./NavItem";

interface INavbar {
  //
}

const Navbar: FC<INavbar> = props => {
  const [auth, setAuth] = useRecoilState(authState);

  const { totalItemsCount, totalPrice } = useRecoilValue(statisticSelector);

  const logoutHandler = () => {
    setAuth({ user: null, auth: { accessToken: "" } });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="fixed mx-auto w-full bg-gray-800 px-20 py-2">
      <div className="flex items-center">
        <div className="pt-2">
          <NavItem to="/">
            <img src={logo} alt="Logo" width={50} height={50} />
          </NavItem>
        </div>
        <div className="ml-20 space-x-10 md:flex md:space-x-16 ">
          <NavItem to="/">Home</NavItem>
          {auth.auth.accessToken && <NavItem to="/products">Products</NavItem>}
        </div>
        {auth.auth.accessToken ? (
          <div className="ml-auto flex items-center gap-10">
            <NavItem to="/admin">Admin</NavItem>
            <NavItem to="/" onClick={logoutHandler}>
              Logout
            </NavItem>
            <NavItem
              className="rounded-full bg-red-500 px-5 py-3 text-white shadow-sm hover:cursor-pointer md:px-8"
              to="/shop/shopping-cart"
            >
              {totalItemsCount} in cart ({totalPrice}) $
            </NavItem>
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-5">
            <NavItem to="/auth/login">Login</NavItem>
            <NavItem to="/auth/register">Register</NavItem>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
