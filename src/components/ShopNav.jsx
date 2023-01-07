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
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";

function ShopNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDrop = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { state } = useContext(Store);
  const { cart, userInfo } = state;
  const { dispatch: ctxDispatch } = useContext(Store);

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
    <div className="w-[80vw] lg:w-[30vw] bg-[f7f7f7]">
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

          {userInfo && userInfo.isAdmin ? (
            <li className="nav-item">
              <NavLink
                onClick={toggleDrawer(false)}
                to="/dashboard"
                className={(navData) => (navData.isActive ? "active" : null)}
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
    <nav className="flex p-5 flex-col bg-black  text-white top-0 sticky z-50">
      <section className="flex flex-row items-center justify-between lg:justify-center ">
        <div className="flex flex-row items-center">
          <MenuIcon
            onClick={toggleDrawer(true)}
            className="mr-4"
            sx={{ fontSize: 30 }}
          />
          <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </div>
        <section>
          <div className="hidden md:flex flex-row ">
            <input
              placeholder="Search.."
              className="py-2 px-5 w-[50vw] bg-white rounded-l-full"
            />
            <div className="p-2  bg-white rounded-r-full">
              <SearchIcon className="text-black" />
            </div>
          </div>
        </section>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            {userInfo ? (
              <div className="flex">
                <div className="cursor-pointer flex flex-col mx-4">
                  <div className="flex flex-row">
                    <PersonIcon onClick={handleClick} />
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={openDrop}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          width: 200,
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 2.5,
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 8,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{
                        horizontal: "right",
                        vertical: "top",
                      }}
                      anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom",
                      }}
                    >
                      <Link to="/user/profile">
                        <MenuItem>Profile</MenuItem>
                      </Link>

                      <Link to="/user/ordershistory">
                        <MenuItem>Orders</MenuItem>
                      </Link>

                      <Link to="/user/payments">
                        <MenuItem>Payments</MenuItem>
                      </Link>

                      <Link to="/user/returns">
                        <MenuItem>Returns</MenuItem>
                      </Link>

                      <Divider />
                      <Link to="/signin" onClick={signoutHandler}>
                        <MenuItem>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Link>
                    </Menu>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/signin" className="px-4">
                <PersonIcon />
              </Link>
            )}
            <Link className="flex flex-row" to="/cart">
              <Badge
                badgeContent={cart.cartItems.reduce(
                  (a, c) => a + c.quantity,
                  0
                )}
                color="error"
              >
                <ShoppingCartIcon />
              </Badge>
              {/* <div className="relative top-[-10px] right-[10px] bg-red-500 rounded-full flex justify-center items-center text-xs h-5 w-5"></div> */}
            </Link>
          </div>
        </div>
      </section>
    </nav>
  );
}

export default ShopNav;
