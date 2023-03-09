import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";
import { Store } from "../../components/Store";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || "");
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div className="flex flex-col lg:items-center">
      <div className="flex flex-col p-4 min-h-screen lg:w-[60%]">
        <section className="flex flex-row border-b-2 border-gray-100 pb-4 w-full">
          <Link to="/">Home</Link>
          <KeyboardArrowRight />
          <Link to="/shop">Shop</Link>
          <KeyboardArrowRight />
          <Link to="/Cart">Cart</Link>
          <KeyboardArrowRight />
          <strong>Checkout</strong>
        </section>
        <section className="flex py-4 w-full">
          <Stepper className="w-full">
            <Step completed>
              <StepLabel>Sign in</StepLabel>
            </Step>
            <Step active>
              <StepLabel>Shipping</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
          </Stepper>
        </section>
        <p className="mt-2 mb-4">
          <strong className="text-lg">Shipping</strong>
        </p>
        <form className="flex flex-col w-full" onSubmit={submitHandler}>
          <div className="inputCont">
            <label className="inputlabel">Full Name</label>
            <input
              value={fullName}
              className="input"
              placeholder="Full Name.."
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="inputCont">
            <label className="inputlabel">Address </label>
            <input
              value={address}
              className="input"
              required
              placeholder="Address.."
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="inputCont">
            <label className="inputlabel">City </label>
            <input
              value={city}
              className="input"
              required
              placeholder="City.."
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="inputCont">
            <label className="inputlabel">ZIP</label>
            <input
              value={postalCode}
              className="input"
              required
              placeholder="ZIP.."
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="inputCont">
            <label className="inputlabel">Country</label>
            <input
              value={country}
              className="input"
              required
              placeholder="Country.."
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-4">
            <button
              className="flex flex-row justify-center px-4 py-2 text-white bg-teal-500 rounded"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
