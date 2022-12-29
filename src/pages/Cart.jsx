import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../components/Store";
import CartEmpty from "../assets/Cart.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";

function Cart() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(
      `https://ecomm-i8yz.onrender.com/products/${item._id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-[100vh]  p-4">
        <section className="flex flex-row border-b-2 border-gray-100 pb-4 w-full">
          <Link to="/">Home</Link> <KeyboardArrowRight />{" "}
          <Link to="/shop">Shop</Link>
          <KeyboardArrowRight />
          <strong>Cart</strong>
        </section>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center mt-20">
            <img src={CartEmpty} alt="Cart" width={"300px"} />
            <p className="text-2xl py-8 font-semibold">Your Cart is empty.</p>
            <Link to="/shop">
              <button className="bg-teal-500 rounded text-white px-12 py-2">
                {" "}
                Go Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <p className="mt-2 mb-4">
              <strong className="text-lg">Cart</strong> (
              {cartItems.reduce((a, c) => a + c.quantity, 0)} items)
            </p>
            <div className="flex flex-col items-center">
              <div className="flex flex-col w-full gap-2">
                {cartItems.map((item) => (
                  <div className="flex flex-col bg-white pb-4" key={item.id}>
                    <div className="flex flex-row w-full">
                      <Link to={`/shop/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 object-contain"
                        ></img>
                      </Link>
                      <div className="flex flex-col w-full ml-10">
                        <Link to={`/shop/${item.id}`}>
                          <p className="text-base" to={`/product/${item.id}`}>
                            <span>{item.brand}</span> {item.slug}
                          </p>
                        </Link>
                        <div className="flex flex-row text-center w-full justify-between">
                          <div className="flex flex-row">
                            <div className="flex flex-row text-center p-4 bg-slate-100 w-fit rounded">
                              {item.quantity === 1 ? (
                                <RemoveIcon className="rounded mr-4 p-1 bg-gray-500 text-white" />
                              ) : (
                                <RemoveIcon
                                  onClick={() =>
                                    updateCartHandler(item, item.quantity - 1)
                                  }
                                  disabled={item.quantity === 0}
                                  className="rounded mr-4 p-1 bg-teal-500 text-white"
                                />
                              )}

                              <p className="flex"> {item.quantity}</p>
                              <AddIcon
                                onClick={() =>
                                  updateCartHandler(item, item.quantity + 1)
                                }
                                disabled={item.quantity === item.countInStock}
                                className="rounded ml-4 p-1 bg-teal-500 text-white"
                              />
                            </div>
                          </div>
                          <DeleteIcon
                            className="rounded-full p-1 bg-gray-100 text-red-400"
                            onClick={() => removeItemHandler(item)}
                          />
                        </div>

                        <strong className="flex flex-row py-2">
                          <p className="text-gray-400 mr-4">Price</p>{" "}
                          {item.price} EGP
                        </strong>
                        <div>
                          {item.countInStock > 0 ? (
                            <p className="font-semibold">
                              {item.countInStock - item.quantity} items left
                            </p>
                          ) : (
                            <p className="font-semibold"> Sold out </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div>
                <button buttonStyle="btn--checkOut">Continue Shopping</button>
              </div> */}
              </div>
              {/* checkOut */}
            </div>
          </div>
        )}
      </div>
      {cartItems.length === 0 ? null : (
        <div className="sticky lg:hidden bottom-0 p-4 w-full bg-white space-y-4 drop-shadow-[0_50px_50px_rgba(0,0,0,0.25)]">
          <strong className="text-xl py-2">Order Summary</strong>

          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center pb-4">
              <p className="text-base ">Subtotal</p>
              <p className="text-base">
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP
              </p>
            </div>
            <div className="flex flex-row justify-between items-center pb-4 border-b-2">
              <p>Shipping fee</p>
              <p className="text-green-600">Free</p>
            </div>
            <div className="py-4 flex flex-row justify-between items-center">
              <strong className="text-xl">Total</strong>
              <strong className="text-base">
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP
              </strong>
            </div>
          </div>

          <div className="checkOutbutton">
            {cartItems.length === 0 ? (
              <button buttonStyle="btn--checkOutNone">
                Procced to checkout
              </button>
            ) : (
              <div className="flex flex-col">
                <button
                  className="flex flex-row justify-center px-4 py-2 text-white bg-teal-500 rounded"
                  onClick={checkoutHandler}
                >
                  Procced to checkout (
                  {cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
