import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { Drawer } from "@mui/material";
import { Store } from "../components/Store";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Searchbar from "./Searchbar";
import V2S from "../assets/V2S.png";

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

  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://ecomm-i8yz.onrender.com/products/allproducts")
        .then((res) => res.data),
  });

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
              to="/shop"
              className={(navData) => (navData.isActive ? "active" : null)}
            >
              Shop
            </NavLink>
          </li>

          {userInfo ? null : (
            <li className="nav-item">
              <NavLink
                onClick={toggleDrawer(false)}
                to="signin"
                className={(navData) => (navData.isActive ? "active" : null)}
              >
                Sign in
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <NavLink
              onClick={toggleDrawer(false)}
              to="cart"
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
                to="/admin/dashboard"
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
        <div className="flex flex-row items-center ">
          <MenuIcon
            onClick={toggleDrawer(true)}
            className="mr-4 cursor-pointer"
            sx={{ fontSize: 35 }}
          />
          <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </div>
        <section>
          <Searchbar data={data?.products} />
        </section>

        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            {userInfo ? (
              <div className="flex">
                <div className="cursor-pointer flex flex-col mx-4">
                  <div className="flex flex-col items-center">
                    <AccountCircleIcon
                      sx={{ fontSize: 30 }}
                      onClick={handleClick}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      open={openDrop}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          width: 200,
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 2,
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 10,
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
                        <MenuItem sx={{ py: 1.5 }}>
                          <ListItemIcon>
                            <PersonIcon fontSize="small" />
                          </ListItemIcon>
                          Profile
                        </MenuItem>
                      </Link>

                      <Link to="/user/ordershistory">
                        <MenuItem sx={{ py: 1.5 }}>
                          <ListItemIcon>
                            <AssignmentIcon fontSize="small" />
                          </ListItemIcon>
                          Orders
                        </MenuItem>
                      </Link>

                      <Link to="/user/payments">
                        <MenuItem sx={{ py: 1.5 }}>
                          <ListItemIcon>
                            <CreditCardIcon fontSize="small" />
                          </ListItemIcon>
                          Payments
                        </MenuItem>
                      </Link>

                      <Link to="/user/returns">
                        <MenuItem sx={{ py: 1.5 }}>
                          <ListItemIcon>
                            <AssignmentReturnIcon fontSize="small" />
                          </ListItemIcon>
                          Returns
                        </MenuItem>
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
                <PersonIcon sx={{ fontSize: 30 }} />
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
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
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
