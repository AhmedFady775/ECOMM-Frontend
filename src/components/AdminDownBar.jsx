import React from "react";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import PIC1 from "../assets/2.png";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function AdminDownBar() {
  const location = useLocation();
  return (
    <nav className="bottom-0 px-6 py-4 bg-white sticky shadow border-t-2 lg:hidden">
      <ul className="flex flex-row items-center justify-between">
        <li className="flex">
          {location.pathname === "/admin/dashboard" ? (
            <Link to="/admin/dashboard">
              <GridViewTwoToneIcon color="primary" sx={{ fontSize: 30 }} />
            </Link>
          ) : (
            <Link to="/admin/dashboard">
              <GridViewOutlinedIcon color="primary" sx={{ fontSize: 30 }} />
            </Link>
          )}
        </li>
        <li className="flex">
          {location.pathname === "/admin/products" ? (
            <Link to="/admin/products">
              <Inventory2TwoToneIcon color="primary" sx={{ fontSize: 30 }} />
            </Link>
          ) : (
            <Link to="/admin/products">
              <Inventory2OutlinedIcon color="primary" sx={{ fontSize: 30 }} />
            </Link>
          )}
        </li>
        <li className="flex">
          {location.pathname === "/admin/orders" ? (
            <Link to="/admin/orders">
              <LocalShippingTwoToneIcon color="primary" sx={{ fontSize: 30 }} />
            </Link>
          ) : (
            <Link to="/admin/orders">
              <LocalShippingOutlinedIcon
                color="primary"
                sx={{ fontSize: 30 }}
              />
            </Link>
          )}
        </li>
        <li className="flex">
          {location.pathname === "/admin/users" ? (
            <Link to="/admin/users">
              <PeopleAltTwoToneIcon color="primary" sx={{ fontSize: 30 }} />
            </Link>
          ) : (
            <Link to="/admin/users">
              <PeopleAltOutlinedIcon color="primary" sx={{ fontSize: 30 }} />
            </Link>
          )}
        </li>
        <li className="flex">
          {location.pathname === "/admin/settings" ? (
            <Link to="/admin/users">
              <SettingsTwoToneIcon color="primary" sx={{ fontSize: 30 }} />
            </Link>
          ) : (
            <Link to="/admin/users">
              <SettingsOutlinedIcon color="primary" sx={{ fontSize: 30 }} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default AdminDownBar;
