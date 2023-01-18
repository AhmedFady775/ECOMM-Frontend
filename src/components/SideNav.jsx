import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PIC1 from "../assets/2.png";
import V2S from "../assets/V2S.png";
import { Store } from "./Store";
import v2s from "../assets/V2S.png";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

function SideNav() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { dispatch: ctxDispatch } = useContext(Store);

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  return (
    <nav className="hidden lg:flex sm:h-screen flex-col text-white bg-slate-800 justify-around w-[15vw] cursor-default top-0 sticky">
      <Link to="/">
        <li className="flex justify-center">
          <img className="w-20" src={v2s} />
        </li>
      </Link>
      <ul className="hidden sm:flex flex-col space-y-4 mx-8">
        <Link
          to="/admin/dashboard"
          className={
            location.pathname === "/admin/dashboard"
              ? "activated"
              : "notActivated"
          }
        >
          <div className="flex flex-row items-center">
            <GridViewOutlinedIcon className="mr-4" sx={{ fontSize: 30 }} />
            <p> Dashboard</p>
          </div>
        </Link>

        <Link
          to="/admin/products"
          className={
            location.pathname === "/admin/products"
              ? "activated"
              : "notActivated"
          }
        >
          <div className="flex flex-row items-center">
            <Inventory2OutlinedIcon className="mr-4" sx={{ fontSize: 30 }} />
            <p> Products</p>
          </div>
        </Link>

        <Link
          to="/admin/orders"
          className={
            location.pathname === "/admin/orders" ? "activated" : "notActivated"
          }
        >
          <div className="flex flex-row items-center">
            <LocalShippingOutlinedIcon className="mr-4" sx={{ fontSize: 30 }} />
            <p> Orders</p>
          </div>
        </Link>
        <Link
          to="/admin/users"
          className={
            location.pathname === "/admin/users" ? "activated" : "notActivated"
          }
        >
          <div className="flex flex-row items-center">
            <PeopleAltOutlinedIcon className="mr-4" sx={{ fontSize: 30 }} />
            <p> Users</p>
          </div>
        </Link>
        <Link
          to="/admin/settings"
          className={
            location.pathname === "/admin/settings"
              ? "activated"
              : "notActivated"
          }
        >
          <div className="flex flex-row items-center">
            <SettingsOutlinedIcon className="mr-4" sx={{ fontSize: 30 }} />
            <p> Setting</p>
          </div>
        </Link>
        <Link to="/singin" className="notActivated">
          <div
            onClick={() => {
              signoutHandler();
            }}
            className="flex flex-row items-center"
          >
            <LogoutIcon className="mr-4" sx={{ fontSize: 30 }} />
            <p> Log out</p>
          </div>
        </Link>
      </ul>
      <section className="flex flex-row p-2 text-lg rounded justify-between items-center mx-8">
        <div className="flex h-12 w-12  rounded-full">
          <img className="rounded-full object-cover" src={PIC1} />
        </div>
        <div className="flex flex-col">
          <p> Ahmed Fady </p>
          <p className="font-light"> Page Admin </p>
        </div>
        <i className={"fa fa-arrow-down text-sm"} />
      </section>
    </nav>
  );
}

export default SideNav;
