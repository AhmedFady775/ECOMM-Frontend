import React from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import { useContext } from "react";
import { Badge } from "@mui/material";
import { Store } from "../../components/Store";

function CheckoutNav() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <nav className="h-14 lg:h-[72px] bg-white text-black shadow z-50">
      <section className="flex flex-row items-center justify-between h-full lg:w-max-[1184px] lg:w-[1184px] lg:m-auto px-3 lg:px-0">
        <Link className="flex mx-4 lg:mx-0" to="/">
          <p className="text-2xl md:text-3xl font-bold Robot">V2S</p>
        </Link>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center text-sm font-semibold leading-5 tracking-[0] text-[#7f8286] fontTech">
            <BiLock className="mr-1" /> Secure Checkout
          </div>
          <Link
            className="flex flex-row items-center gap-2 text-sm ml-4"
            to="/cart"
          >
            <Badge
              badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              color="error"
            >
              <BsCart3 size={25} />
            </Badge>
          </Link>
        </div>
      </section>
    </nav>
  );
}

export default CheckoutNav;
