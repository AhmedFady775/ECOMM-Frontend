import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Drawer } from "@mui/material";
import { Store } from "../components/Store";

function Navbar() {
  const [isHovering, setIsHovering] = useState(false);
  const { state } = useContext(Store);
  const { cart, userInfo } = state;
  const { dispatch: ctxDispatch } = useContext(Store);

  // hover
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

  const list = () => <div className="w-[80vw] h-full bg-[f7f7f7]">hello</div>;

  const Links = [
    "Cameras",
    "Wires",
    "Books",
    "Deals",
    "Tv",
    "Phone",
    "Mobile",
    "Kitchen",
  ];
  return (
    <div className="flex flex-col">
      <nav className="flex p-2 flex-col bg-black  text-white">
        <section className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <span className="flex lg:hidden mr-4">
              <MenuIcon onClick={toggleDrawer(true)} fontSize="large" />
              <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
                {list()}
              </Drawer>
            </span>
            <Link to="/">
              <span className="flex">
                <img src="https://img.icons8.com/material-rounded/30/FFFFFF/home-page.png" />
              </span>
            </Link>
            <p className="flex ml-4">Deliever to </p>
          </div>
          <section className="w-[70%] hidden lg:flex">
            <input
              className="text-black outline-none flex rounded-l-md px-2 py-2 w-full"
              required
              placeholder="search V2S.."
            />
            <span className="bg-emerald-500 px-2 rounded-r-md py-2">
              <SearchIcon className="text-white" />
            </span>
          </section>
          <div className="flex flex-row items-center">
            <div className="flex mx-4">EN</div>
            {userInfo ? (
              <div className="hidden lg:flex">
                <div
                  onClick={handleOnClick}
                  className="cursor-pointer flex flex-col mx-4"
                >
                  Hello, {userInfo.firstName}!
                  <div className="flex flex-row">
                    My Account
                    <img
                      className="ml-1"
                      src="https://img.icons8.com/material/18/FFFFFF/sort-down--v2.png"
                    />
                    {isHovering && (
                      <div className="flex flex-col bg-white text-black absolute top-[60px] rounded py-2 w-[150px] shadow z-10">
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
                <div className="flex flex-row mx-4">
                  Wishlist
                  <img
                    className="ml-2"
                    src="https://img.icons8.com/material/20/FFFFFF/like--v1.png"
                  />
                </div>
              </div>
            ) : (
              <Link to="/signin">
                <div className="flex flex-row items-center mx-4">
                  Sign in
                  <img
                    className="ml-2"
                    src="https://img.icons8.com/material/20/FFFFFF/person-male.png"
                  />
                </div>
              </Link>
            )}
            <div className="flex flex-row items-center">
              Cart
              <img
                className="ml-2"
                src="https://img.icons8.com/material/20/FFFFFF/shopping-cart--v1.png"
              />
            </div>
          </div>
        </section>
        <section className="flex my-2 lg:hidden">
          <input
            className="text-black outline-none flex rounded-l-md px-2 py-2 w-full"
            required
            placeholder="search V2S.."
          />
          <span className="bg-emerald-500 px-2 rounded-r-md py-2">
            <SearchIcon className="text-white" />
          </span>
        </section>
        <section className="flex overflow-x-scroll w-full space-x-4 scrollbar-hide py-2 lg:hidden">
          {Links.map((item) => (
            <Link to={`/${item}`}>{item}</Link>
          ))}
        </section>
      </nav>
      <section className="lg:flex flex-col text-white hidden bg-slate-800 items-center">
        <p className="lg:hidden">Deliever to </p>
        <section className="flex flex-row items-center w-full">
          <span className="flex py-2 px-4 hover:bg-slate-700 items-center cursor-pointer">
            <img
              src="https://img.icons8.com/material/20/FFFFFF/menu--v1.png"
              className="mr-2"
            />
            ALL CATEGORIES
          </span>
          {Links.map((item) => (
            <Link to={`/${item}`} className="py-2 px-4 hover:bg-slate-700">
              {item}
            </Link>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Navbar;
