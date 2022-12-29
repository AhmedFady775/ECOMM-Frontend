import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";
import { Store } from "../../components/Store";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div className="flex flex-col p-4 min-h-screen">
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
          <Step active index={2}>
            <StepLabel>Payment</StepLabel>
          </Step>
          <Step index={3}>
            <StepLabel>Place Order</StepLabel>
          </Step>
        </Stepper>
      </section>
      <p className="mt-2 mb-4">
        <strong className="text-lg">Payment Method</strong>
      </p>
      <form className="flex flex-col w-full" onSubmit={submitHandler}>
        <div className="inputContRadio">
          <input
            type="radio"
            id="PayPal"
            value="PayPal"
            checked={paymentMethodName === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="flex pl-2">PayPal</label>
        </div>
        <div className="inputContRadio">
          <input
            type="radio"
            id="Stripe"
            value="Visa"
            checked={paymentMethodName === "Visa"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="flex pl-2">Visa</label>
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
  );
}
