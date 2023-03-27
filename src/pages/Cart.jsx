import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../components/Store";
import CartEmpty from "../assets/shopping-cart.png";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { HiOutlineCreditCard } from "react-icons/hi";
import { TbTruckReturn } from "react-icons/tb";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

function Cart() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    await axios.get(`https://ecomm12.herokuapp.com/products/${item._id}`);
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
    toast.success("Item deleted");
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  // const controlItem = (item, quantity) => (
  //   <div className="flex flex-row text-center w-full justify-between">
  //     <div className="flex flex-row">
  //       <div className="flex flex-row text-center p-4 bg-slate-100 w-fit rounded lg:mb-4">
  //         {item.quantity === 1 ? (
  //           <RemoveIcon className="rounded mr-4 p-1 bg-gray-500 text-white" />
  //         ) : (
  //           <RemoveIcon
  //             onClick={() => updateCartHandler(item, item.quantity - 1)}
  //             disabled={item.quantity === 0}
  //             className="rounded mr-4 p-1 bg-teal-500 text-white"
  //           />
  //         )}

  //         <p className="flex"> {item.quantity}</p>
  //         <AddIcon
  //           disabled={item.quantity === item.countInStock}
  //           className="rounded ml-4 p-1 bg-teal-500 text-white"
  //         />
  //       </div>
  //     </div>
  //     <div className="hidden lg:block">
  //       <Button
  //         onClick={() => removeItemHandler(item)}
  //         variant="outlined"
  //         color="error"
  //       >
  //         Delete
  //       </Button>
  //     </div>
  //     <div className="lg:hidden">
  //       <DeleteIcon
  //         className="rounded-full p-1 bg-gray-100 text-red-400 "
  //         onClick={() => removeItemHandler(item)}
  //       />
  //     </div>
  //   </div>
  // );

  const cartItem = (item) => (
    <div className="flex flex-col py-6 px-4 border-b" key={item.id}>
      <div className="flex flex-row">
        <div className="flex flex-col pr-3">
          <Link className="h-[72px] w-[72px]" to={`/${item._id}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </Link>
          <select
            onChange={(e) => {
              updateCartHandler(item, Number(e.target.value));
            }}
            value={item.quantity}
            className="flex lg:hidden mt-4 py-4 pr-3 pl-4 rounded-md w-[64px] cursor-pointer border-1 border-gray-300 text-[#0e001a] hover:border-[#0e001a] focus:ring-[#0e001a] focus:border-transparent"
          >
            {[...Array(item.countInStock)].map((_, i) => (
              <option
                onClick={() => updateCartHandler(item, i + 1)}
                value={i + 1}
              >
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between w-full">
          <div className="flex flex-col">
            <Link to={`/products/${item._id}`}>
              <p className="text-base">{item.slug}</p>
              <p className="text-base pb-2">Vendor: V2S</p>
            </Link>
            <div className="flex flex-row items-end">
              <p className="leading-4 text-xl	font-semibold"> {item.price}</p>
              <p className="text-xs ml-1 leading-3">EGP</p>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col mt-4 lg:mt-0 text-[#0066be] text-sm font-normal lg:items-end">
            <select
              onChange={(e) => {
                updateCartHandler(item, Number(e.target.value));
              }}
              value={item.quantity}
              className="hidden lg:flex mb-4 py-4 pr-3 pl-4 rounded-md w-[64px] cursor-pointer border-1 border-gray-300 text-[#0e001a] hover:border-[#0e001a] focus:ring-[#0e001a] focus:border-transparent"
            >
              {[...Array(item.countInStock)].map((_, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <div
              onClick={() => removeItemHandler(item)}
              className="flex flex-row items-center pr-6 lg:pr-0 lg:mb-4 cursor-pointer"
            >
              <FaRegTrashAlt className="pr-1" /> Remove
            </div>{" "}
            <div className="flex flex-row items-center cursor-pointer">
              <AiOutlineHeart size={20} className="pr-1 cursor-pointer" /> Save
              for later
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );

  const mobileCheckout = () =>
    cartItems.length === 0 ? null : (
      <div className="sticky flex flex-row justify-between items-center lg:hidden bottom-0 px-4 py-3 w-full bg-white drop-shadow-[0_50px_50px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col">
          <p className="text-sm font-normal text-[#7f8286] leading-5">
            Subtotal for {cartItems.reduce((a, c) => a + c.quantity, 0)} items
          </p>
          <p className="text-lg font-semibold leading-6">
            {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP
          </p>
        </div>
        <div className="flex w-1/2">
          <Button
            className="w-full"
            variant="contained"
            sx={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#0e001a",
            }}
            size="large"
            onClick={checkoutHandler}
          >
            Checkout
          </Button>
        </div>
      </div>
    );

  const desktopCheckout = () => (
    <div className="hidden lg:flex lg:flex-col shadow rounded p-6">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between text-[#7f8286]">
          Quantity
          <span> {cartItems.reduce((a, c) => a + c.quantity, 0)} items</span>
        </div>
        <div className="flex flex-row justify-between text-lg font-semibold leading-6">
          Subtotal{" "}
          <span>
            <p>{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP</p>
          </span>
        </div>
        <div className="flex mt-4">
          <Button
            className="w-full"
            variant="contained"
            sx={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "#0e001a",
              "&:hover": {
                backgroundColor: "#0e001ac0",
              },
            }}
            size="large"
            onClick={checkoutHandler}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col min-h-[100vh] lg:w-max-[1184px] lg:w-[1184px] bg-[#f4f5f6] lg:bg-white lg:m-auto pt-[60px] lg:py-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col">
            <div className="flex flex-col bg-white py-6 px-4 mb-4 shadow items-center">
              <div className="flex flex-col lg:max-w-[328px]">
                <div className="flex justify-center">
                  <img src={CartEmpty} className="h-[160px] w-fit" />
                </div>
                <div className="py-6 text-center">
                  <p className="text-xl text-[#0e001a] font-semibold">
                    Your shopping cart is empty!{" "}
                  </p>
                  <p className="font-normal text-sm text-[#7f8286]">
                    V2S is the #1 place for all your surveillance devices needs,
                    explore our wide range of products, flexible payments &
                    offers!
                  </p>
                </div>
                <Link className="flex flex-col" to="/shop">
                  <button className="border-[#c3c7cc] hover:bg-[#f4f5f6] hover:border-[#f4f5f6] p-4 flex flex-col items-center border font-semibold rounded-md text-[#0e001a]">
                    Shop now!
                  </button>
                </Link>
              </div>
            </div>
            <ul className="flex flex-col bg-white p-4 mb-4 shadow ">
              <li className="flex flex-row">
                <HiOutlineCreditCard className="mr-3" size={30} />
                <div className="flex flex-col w-full">
                  <p className="text-sm font-semibold pb-2">Pay on delivery</p>
                  <p className="text-sm font-normal pb-3">For all orders</p>
                  <hr className="h-[1px] mb-3" />
                </div>
              </li>
              <li className="flex flex-row">
                <TbTruckReturn className="mr-3" size={30} />
                <div className="flex flex-col  w-full">
                  <p className="text-sm font-semibold pb-2">Return policy</p>
                  <p className="text-sm font-normal pb-3">
                    Most items can be returned within 30 days of delivery
                  </p>
                  <hr className="h-[1px] mb-3" />
                </div>
              </li>
              <li className="flex flex-row">
                <AiOutlineQuestionCircle className="mr-3" size={30} />
                <div className="flex flex-col  w-full">
                  <p className="text-sm font-semibold pb-2">Have a question?</p>
                  <p className="text-sm font-normal pb-3">*****</p>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className="bg-white mb-4 shadow lg:w-[70%] lg:h-fit">
              <p className="flex flex-row py-5 px-4 border-b">
                Cart
                <span className="ml-2 flex text-sm rounded-full items-center py-1 px-3 bg-slate-100">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              </p>
              <div className="flex flex-col lg:text-xl items-center">
                <div className="flex flex-col w-full">
                  {cartItems.map((item) => cartItem(item))}
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:w-[30%] lg:ml-6">
              {desktopCheckout()}
              <ul className="flex flex-col bg-white p-4 mb-4 shadow lg:mt-6">
                <li className="flex flex-row">
                  <HiOutlineCreditCard className="mr-3" size={30} />
                  <div className="flex flex-col w-full">
                    <p className="text-sm font-semibold pb-2">
                      Pay on delivery
                    </p>
                    <p className="text-sm font-normal pb-3">For all orders</p>
                    <hr className="h-[1px] mb-3" />
                  </div>
                </li>
                <li className="flex flex-row">
                  <TbTruckReturn className="mr-3" size={30} />
                  <div className="flex flex-col  w-full">
                    <p className="text-sm font-semibold pb-2">Return policy</p>
                    <p className="text-sm font-normal pb-3">
                      Most items can be returned within 30 days of delivery
                    </p>
                    <hr className="h-[1px] mb-3" />
                  </div>
                </li>
                <li className="flex flex-row">
                  <AiOutlineQuestionCircle className="mr-3" size={30} />
                  <div className="flex flex-col  w-full">
                    <p className="text-sm font-semibold pb-2">
                      Have a question?
                    </p>
                    <p className="text-sm font-normal pb-3">*****</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {mobileCheckout()}
    </>
  );
}

export default Cart;
