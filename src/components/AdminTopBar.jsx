import React from "react";
import { useState, useContext } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import PIC1 from "../assets/2.png";
import { Store } from "./Store";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AdminTopBar() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { dispatch: ctxDispatch } = useContext(Store);
  const [user, setUser] = useState(false);

  const [products, setProducts] = useState(false);
  const [users, setUsers] = useState(false);
  const [orders, setOrders] = useState(false);

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  const handelDropDown = () => {
    setUser(!user);
  };

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const location = useLocation();

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

          {userInfo.isAdmin ? (
            <li className="nav-item">
              <NavLink
                onClick={toggleDrawer(false)}
                to="/dashboard"
                className={
                  location.pathname === "/dashboard" ||
                  "/users" ||
                  "/orders" ||
                  "/products"
                    ? "active"
                    : null
                }
              >
                Admin
              </NavLink>
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );

  return (
    <nav className="flex p-6 bg-slate-800 shadow text-white">
      <ul className="flex flex-row items-center justify-between w-full">
        <li>
          <MenuIcon onClick={toggleDrawer(true)} fontSize="large" />
          <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>{" "}
        </li>
        <li>
          {location.pathname === "/dashboard" ? (
            <p className="text-3xl font-semibold">Dashboard </p>
          ) : location.pathname === "/products" ? (
            <>
              <p
                onClick={() => {
                  setProducts(!products);
                }}
                className="text-3xl font-semibold"
              >
                Products <KeyboardArrowDownOutlinedIcon />
              </p>
              {products && (
                <div className="flex flex-col bg-white text-black absolute top-[70px] rounded py-2 w-[160px] shadow z-10">
                  <Link to="/products" className="dropDown">
                    Manage Products
                  </Link>
                  <Link to="/createproduct" className="dropDown">
                    Create Product
                  </Link>
                </div>
              )}
            </>
          ) : location.pathname === "/users" ? (
            <>
              <p
                onClick={() => {
                  setUsers(!users);
                }}
                className="text-3xl font-semibold"
              >
                Users <KeyboardArrowDownOutlinedIcon />
              </p>
              {users && (
                <div className="flex flex-col bg-white text-black absolute top-[70px] rounded py-2 w-[160px] shadow z-10">
                  <Link to="/products" className="dropDown">
                    Manage Users
                  </Link>
                  <Link to="/createproduct" className="dropDown">
                    Create Users
                  </Link>
                </div>
              )}
            </>
          ) : location.pathname === "/orders" ? (
            <>
              <p
                onClick={() => {
                  setOrders(!orders);
                }}
                className="text-3xl font-semibold"
              >
                Orders <KeyboardArrowDownOutlinedIcon />
              </p>
              {orders && (
                <div className="flex flex-col bg-white text-black absolute top-[70px] rounded py-2 w-[160px] shadow z-10">
                  <Link to="/products" className="dropDown">
                    Manage Users
                  </Link>
                  <Link to="/createproduct" className="dropDown">
                    Create Users
                  </Link>
                </div>
              )}
            </>
          ) : null}
        </li>
        <li>
          <img
            onClick={handelDropDown}
            src={PIC1}
            className="w-8 h-8 rounded-full"
          />
          {user && (
            <div className="flex flex-col bg-white text-black absolute top-[70px] right-[20px] lg:right-[10px] rounded py-2 w-[120px] shadow z-10">
              <Link to="/user/profile" className="dropDown">
                Profile
              </Link>
              <Link to="/user/ordershistory" className="dropDown">
                Messages{" "}
              </Link>
              <div
                onClick={signoutHandler}
                className="flex justify-center pt-2 hover:text-slate-400 border-slate-300 border-t-[1px] text-sm text-slate-500"
              >
                Sign out
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default AdminTopBar;
