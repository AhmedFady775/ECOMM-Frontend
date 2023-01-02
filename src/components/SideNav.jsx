import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PIC1 from "../assets/2.png";
import V2S from "../assets/V2S.png";
import { Store } from "./Store";

function SideNav() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { dispatch: ctxDispatch } = useContext(Store);

  const [dropdown, setDropdown] = useState(false);
  const [Usersdropdown, setUsersdropdown] = useState(false);
  const [Ordersdropdown, setOrdersdropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown((current) => !current);
  };
  const handleUsersDropdown = () => {
    setUsersdropdown((current) => !current);
  };
  const handleOrdersDropdown = () => {
    setOrdersdropdown((current) => !current);
  };

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  return (
    <nav className="flex sm:h-screen flex-col bg-slate-800 items-center justify-around sm:w-96 cursor-default top-0 sticky">
      <Link className="" to="/">
        <div>
          <img src={V2S} className="w-[80px] sm:w-[120px] pt-4" />
        </div>
      </Link>

      <ul className="flex sm:flex-col flex-row list-none text-white py-4 justify-around w-full">
        <li className="sm:flex text-xl opacity-90 hidden">Menu</li>
        <Link to="/dashboard">
          <li className="flex text-lg flex-col hover:bg-gray-300/[0.1] hover:rounded-lg">
            <div>
              <div className="flex items-center">
                <span>
                  <img src="https://img.icons8.com/material/24/FFFFFF/dashboard-layout.png"></img>
                </span>
                <span className="hidden sm:flex">Dashboard</span>
              </div>
            </div>
          </li>
        </Link>
        <li className="flex text-lg flex-col hover:bg-gray-300/[0.1] hover:rounded-lg">
          <div onClick={handleDropdown}>
            <div className="flex items-center">
              <span>
                <img src="https://img.icons8.com/material/25/FFFFFF/shipping-product.png"></img>
              </span>
              <span className="hidden sm:flex">Products</span>
            </div>
            {/* <span
              className={
                dropdown
                  ? "fas fa-minus pr-2 text-xs"
                  : "fas fa-plus pr-2 text-xs"
              }
            /> */}
          </div>
          {dropdown && (
            <ul className="flex flex-col ml-10">
              <Link to="/createposts">
                <li className="text-[18px] py-2 font-light hover:border-b-2 w-fit">
                  Create product
                </li>
              </Link>
              <Link to="/manageproduct">
                <li className="text-[18px] pb-2 font-light hover:border-b-2 w-fit">
                  Manage Product
                </li>
              </Link>
              <Link to="/listproducts">
                <li className="text-[18px] pb-2 font-light hover:border-b-2 w-fit">
                  Products list{" "}
                </li>
              </Link>
            </ul>
          )}
        </li>
        <li className="flex text-lg flex-col hover:bg-gray-300/[0.1] hover:rounded-lg">
          <div onClick={handleOrdersDropdown}>
            <div className="flex items-center">
              <span>
                <img src="https://img.icons8.com/material/25/FFFFFF/purchase-order.png"></img>
              </span>
              <span className="hidden sm:flex">Orders</span>
            </div>
            {/* <span
              className={
                Ordersdropdown
                  ? "fas fa-minus pr-2 text-xs"
                  : "fas fa-plus pr-2 text-xs"
              }
            /> */}
          </div>

          {Ordersdropdown && (
            <ul className="flex flex-col ml-10">
              <li className="text-[18px] py-2 font-light">Orders List</li>
              <li className="text-[18px] pb-2 font-light">Manage orders</li>
            </ul>
          )}
        </li>
        <li className="flex text-lg flex-col hover:bg-gray-300/[0.1] hover:rounded-lg">
          <div onClick={handleUsersDropdown}>
            <div className="flex items-center">
              <span>
                <img src="https://img.icons8.com/material/25/FFFFFF/guest-male--v1.png"></img>
              </span>
              <span className="hidden sm:flex">Users</span>
            </div>
            {/* <span
              className={
                Usersdropdown
                  ? "fas fa-minus pr-2 text-xs"
                  : "fas fa-plus pr-2 text-xs"
              }
            /> */}
          </div>
          {Usersdropdown && (
            <ul className="flex flex-col ml-12">
              <li className="text-[18px] py-2 font-light">Users list</li>
              <li className="text-[18px] pb-2 font-light">Manage users</li>
            </ul>
          )}
        </li>
      </ul>
      <ul className="lg:flex flex-col list-none text-white w-full px-2 hidden">
        <li className="flex flex-col hover:bg-gray-300/[0.1] hover:rounded-lg">
          <div className="lg:flex flex-row justify-between text-white items-center hidden">
            <div className="flex h-12 w-12  rounded-full">
              <img className="rounded-full object-cover" src={PIC1} />
            </div>
            <div className="flex flex-col mr-8">
              <p> Ahmed Fady </p>
              <p className="font-light"> Page Admin </p>
            </div>
            <i className={"fa fa-arrow-down text-sm"} />
          </div>
        </li>
        <li className="flex text-lg flex-col hover:bg-gray-300/[0.1] hover:rounded-lg">
          <Link
            className="flex flex-row items-center justify-between "
            to="/signin"
            onClick={() => {
              signoutHandler();
            }}
          >
            <img src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/FFFFFF/external-log-out-ecommerce-user-interface-inkubators-detailed-outline-inkubators.png"></img>
            <p className="text-[20px]">Log out</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideNav;
