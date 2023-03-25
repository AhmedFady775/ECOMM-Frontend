import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Drawer } from "@mui/material";
import { Store } from "./Store";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function Navbar() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { dispatch: ctxDispatch } = useContext(Store);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDrop = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  const CATEGORIES = [
    { link: "/cameras", name: "Cameras" },
    { link: "/wires", name: "Wires" },
    { link: "/devices", name: "Devices" },
  ];

  const list = () => (
    <div className="w-[80vw] h-full bg-[f7f7f7]">
      <section className="flex-col flex text-black font-medium">
        <div
          onClick={toggleDrawer(false)}
          className="absolute right-2 top-2 bg-gray-200 rounded-full flex items-center p-1"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </div>
        <ul className="flex flex-col text-black text-sm mt-10">
          <li className="nav-item flex flex-row justify-between text-gray-400 border-b-8 border-gray-100">
            My delivery area: <span className="text-blue-500">Cairo</span>
          </li>
          {userInfo ? (
            <div>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="flex flex-row items-center">
                    <PersonIcon sx={{ fontSize: 30 }} />
                    <span className="ml-4">Hello, {userInfo.firstName}</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails onClick={toggleDrawer(false)}>
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
                  {userInfo && userInfo.isAdmin ? (
                    <Link to="/admin/dashboard">
                      <MenuItem sx={{ py: 1.5 }}>
                        <ListItemIcon>
                          <AdminPanelSettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Admin
                      </MenuItem>
                    </Link>
                  ) : null}
                  <Divider />
                  <Link to="/signin" onClick={signoutHandler}>
                    <MenuItem>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : (
            <li className="nav-item ">
              <Link onClick={toggleDrawer(false)} to="/signin">
                Sign in/ Sign up
              </Link>
            </li>
          )}

          <li className="nav-item border-t-2 border-b-8 border-gray-100">
            <Link onClick={toggleDrawer(false)} to="/signin">
              <span className="mr-6">
                <InventoryIcon />
              </span>
              Track your order
            </Link>
          </li>

          {CATEGORIES.map((category) => (
            <li className="nav-item border-b-2 border-gray-100">
              <Link onClick={toggleDrawer(false)} to={category.link}>
                {category.name}
              </Link>
            </li>
          ))}

          <li className="nav-item border-b-8 border-t-[6px] border-gray-100">
            <span className="mr-6">
              <LocalPhoneIcon />
            </span>
            Call *****
          </li>
          <li className="nav-item flex flex-row justify-between">
            Switch language <span className="text-blue-500">AR</span>
          </li>
        </ul>
      </section>
    </div>
  );

  return (
    <div className="sticky top-0 z-50">
      <nav className="hidden lg:flex bg-[#0e001a] text-white h-10 ">
        <ul className="h-full flex flex-row items-center justify-between lg:w-max-[1184px] lg:w-[1184px] lg:m-auto text-xs">
          <ul className="flex flex-row space-x-4">
            <li>AR</li>
            <li>
              <span className="text-gray-400">My delivery area:</span> Cairo.
            </li>
          </ul>
          <li>Call *****</li>
        </ul>
      </nav>
      <nav className="h-14 lg:h-20 bg-white text-black shadow-md ">
        <section className="flex flex-row items-center justify-between h-full lg:w-max-[1184px] lg:w-[1184px] lg:m-auto px-3 lg:px-0">
          <span className="flex lg:hidden">
            <MenuIcon onClick={toggleDrawer(true)} fontSize="large" />
            <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </span>
          <div className="flex flex-row items-center">
            <Link className="flex mx-4 lg:mx-0" to="/">
              <p className="text-2xl md:text-3xl font-bold Robot">V2S</p>
            </Link>
            <div className="hidden lg:flex flex-row ml-10 font-semibold Robot">
              Categories <KeyboardArrowDown />
            </div>
          </div>
          <div className="flex flex-row justify-end w-full lg:w-[50%] items-center h-12 text-[#7f8286] relative">
            <input
              placeholder="Search"
              className="flex p-[6px] lg:p-[12px] w-full bg-[#f4f5f6] rounded"
            />
            <SearchIcon className="absolute right-4" />
          </div>
          <div className="flex flex-row items-center lg:gap-8">
            {userInfo ? (
              <div className="cursor-pointer flex ">
                <div className="flex flex-row">
                  <Tooltip arrow title="Profile">
                    <div
                      onClick={handleClick}
                      className="hidden lg:flex flex-row items-center gap-2 text-sm"
                    >
                      <PersonOutlineOutlinedIcon sx={{ fontSize: 30 }} />
                      <span className="hidden lg:flex">
                        Hello, {userInfo.firstName}
                      </span>
                    </div>
                  </Tooltip>
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

                    {userInfo && userInfo.isAdmin ? (
                      <Link to="/admin/dashboard">
                        <MenuItem sx={{ py: 1.5 }}>
                          <ListItemIcon>
                            <AdminPanelSettingsIcon fontSize="small" />
                          </ListItemIcon>
                          Admin
                        </MenuItem>
                      </Link>
                    ) : null}

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
            ) : (
              <Link
                className="hidden lg:flex flex-row items-center gap-2 text-sm"
                to="/signin"
              >
                <PersonOutlineOutlinedIcon />
                My account
              </Link>
            )}
            <Link
              className="flex flex-row items-center gap-2 text-sm ml-4 lg:ml-0"
              to="/cart"
            >
              <ShoppingCartOutlinedIcon />
              <span className="hidden lg:flex">Cart</span>
            </Link>
          </div>
        </section>
      </nav>
    </div>
  );
}

export default Navbar;
