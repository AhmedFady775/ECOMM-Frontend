import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { Drawer } from "@mui/material";
import { Store } from "../components/Store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import V2S from "../assets/V2S.png";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

function Navbar1() {
  const [isHovering, setIsHovering] = useState(false);

  const { state } = useContext(Store);
  const { cart, userInfo } = state;
  const { dispatch: ctxDispatch } = useContext(Store);

  const handleOnClick = () => {
    setIsHovering(!isHovering);
  };

  //signout
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const list = () => (
    <div className="w-[80vw] h-full bg-[f7f7f7]">
      <section className="flex-col flex px-6 py-10 text-black space-y-6 text-xl font-medium">
        <ul className="flex flex-col text-black space-y-8">
          <ul className="flex felx-row justify-between">
            <li className="nav-item">
              <NavLink
                onClick={toggleDrawer(false)}
                to="/"
                className={(navData) => (navData.isActive ? "active" : null)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <CloseIcon onClick={toggleDrawer(false)} sx={{ fontSize: 30 }} />
            </li>
          </ul>

          <li className="nav-item">
            <NavLink
              onClick={toggleDrawer(false)}
              to="shop"
              className={(navData) => (navData.isActive ? "active" : null)}
            >
              Shop
            </NavLink>
          </li>

          {userInfo ? null : (
            <li className="nav-item">
              <NavLink
                onClick={toggleDrawer(false)}
                to="/signin"
                className={(navData) => (navData.isActive ? "active" : null)}
              >
                Sign in
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <NavLink
              onClick={toggleDrawer(false)}
              to="/cart"
              className={(navData) => (navData.isActive ? "active" : null)}
            >
              Shopping cart
            </NavLink>
          </li>
          <li className="nav-item">
            <span onClick={toggleDrawer(false)}>Arabic</span>
          </li>
        </ul>
      </section>
    </div>
  );

  return (
    <nav className="flex p-5 lg:px-32 flex-col bg-black  text-white top-0 sticky z-50">
      <section className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center">
          <Link className="hidden lg:flex" to="/">
            <img src={V2S} width={"80px"} />
          </Link>
          <span className="flex lg:hidden">
            <MenuIcon onClick={toggleDrawer(true)} fontSize="large" />
            <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </span>
        </div>
        <div className="hidden lg:flex flex-row items-center">
          <SearchIcon />
          <div className="flex flex-row items-center">
            {userInfo ? (
              <div className="flex">
                <div
                  onClick={handleOnClick}
                  className="cursor-pointer flex flex-col mx-4"
                >
                  <div className="flex flex-row">
                    <PersonIcon />
                    {isHovering && (
                      <div className="flex flex-col bg-white text-black absolute top-[60px] right-[140px] rounded py-2 w-[150px] shadow z-10">
                        <div className="dropDown"> Profile </div>
                        <div className="dropDown"> Orders </div>
                        <div className="dropDown"> Payments </div>
                        <div className="dropDown"> Returns </div>
                        <div
                          onClick={signoutHandler}
                          className="flex justify-center pt-2 hover:text-slate-400 border-slate-300 border-t-[1px] text-sm text-slate-500"
                        >
                          Sign out
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <FavoriteIcon />
              </div>
            ) : (
              <Link to="/signin" className="pl-4">
                <PersonIcon />
              </Link>
            )}
            <Link to="/cart" className="pl-4">
              <ShoppingCartIcon />
            </Link>
          </div>
        </div>
        <Link className="flex lg:hidden" to="/">
          <img src={V2S} width={"60px"} />
        </Link>
      </section>
    </nav>
  );
}

export default Navbar1;
