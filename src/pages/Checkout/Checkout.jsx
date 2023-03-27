import React from "react";
import CheckoutNav from "./CheckoutNav";
import { Button } from "@mui/material";
import { BsCashStack } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { useState, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../components/Store";
import { MdDone } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function Checkout() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [submitDeliveryDetailschecked, setsubmitDeliveryDetailschecked] =
    useState(false);

  const submitDeliveryDetailsForm = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_PAYMENT_METHOD",
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
    setsubmitDeliveryDetailschecked(true);
  };

  const [paymentMethodName, setPaymentMethod] = useState("Delivery");
  const [paymentMethodFormchecked, setpaymentMethodFormchecked] =
    useState(false);
  const submitpaymentMethodForm = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    setpaymentMethodFormchecked(true);
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "https://ecomm12.herokuapp.com/orders/create",
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethodName,
          itemsPrice: cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
          totalPrice: cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
          taxPrice: 0,
          shippingPrice: 0,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      console.log(err);
    }
  };

  const paymentMethodForm = () => (
    <div className="flex flex-col px-6 h-fit pb-4">
      <div className="flex flex-row items-center py-[26px] text-sm text-[1.15rem] font-semibold leading-6 fontTech tracking-[-1px]">
        <span className="border-2 border-solid border-[#0e001a] rounded-[50%] w-[28px] h-[28px] flex items-center justify-center mr-3 ">
          1
        </span>
        Payment method
      </div>
      <form onSubmit={submitpaymentMethodForm}>
        <label
          for="Delivery"
          className="flex flex-row items-center p-4 mt-2 border rounded-md"
        >
          <input
            name="Delivery"
            type="radio"
            id="Delivery"
            value="Delivery"
            checked={paymentMethodName === "Delivery"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-4"
          />
          <div className="flex flex-row w-full justify-between items-center">
            Cash on delivery <BsCashStack size={25} />
          </div>
        </label>
        <label
          for="Credit card"
          className="flex flex-row items-center p-4 mt-2 border rounded-md"
        >
          <input
            name="Credit card"
            type="radio"
            id="Credit card"
            value="Credit card"
            checked={paymentMethodName === "Credit card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-4"
          />
          <div className="flex flex-row w-full justify-between items-center">
            Online with payment card <BsCreditCard size={25} />
          </div>
        </label>
        <div className="flex mt-4">
          <Button
            type="submit"
            className="w-full"
            variant="contained"
            sx={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "#0e001a",
              "&:hover": {
                backgroundColor: "#3a3a3a",
              },
            }}
            size="large"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );

  const deliveryDetailsForm = () => (
    <div className="flex flex-col px-6 h-fit pb-4 ">
      <div className="flex flex-row items-center py-[26px] text-sm text-[1.15rem] font-semibold leading-6 fontTech tracking-[-1px]">
        <span className="border-2 border-solid border-[#0e001a] rounded-[50%] w-[28px] h-[28px] flex justify-center mr-3 ">
          2
        </span>
        Delivery details
      </div>
      <form
        className="flex flex-col w-full"
        onSubmit={submitDeliveryDetailsForm}
      >
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
        <div className="flex mt-4">
          <Button
            type="submit"
            className="w-full"
            variant="contained"
            sx={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "#0e001a",
              "&:hover": {
                backgroundColor: "#3a3a3a",
              },
            }}
            size="large"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="flex flex-col ">
      <CheckoutNav />
      <section className="flex flex-col lg:flex-row lg:w-max-[1184px] lg:w-[1184px] lg:m-auto pt-[60px] lg:pt-6 lg:px-0 bg-[#f4f5f6] lg:bg-white">
        <div className="flex flex-col lg:w-[60%] lg:mr-6 shadow lg:rounded bg-white h-fit">
          {paymentMethodFormchecked ? (
            <div className="flex flex-col px-6 pb-4">
              <div className="flex flex-row items-center justify-between py-[26px] text-sm text-[1.15rem] font-semibold leading-6 fontTech tracking-[-1px]">
                <div className="flex flex-row items-center">
                  <span className="border-2 border-solid border-[#009f29] text-[#009f29] rounded-[50%] w-[28px] h-[28px] flex items-center justify-center mr-3 ">
                    <MdDone />
                  </span>
                  Payment method
                </div>
                <span
                  onClick={() => {
                    setpaymentMethodFormchecked(false);
                    setsubmitDeliveryDetailschecked(false);
                  }}
                  className="text-sm font-normal leading-5 tracking-[0] text-[#0066be] cursor-pointer"
                >
                  edit
                </span>
              </div>
            </div>
          ) : (
            paymentMethodForm()
          )}

          {!paymentMethodFormchecked ? (
            <div className="flex flex-col px-6  h-fit pb-4">
              <div className="flex flex-row items-center py-[26px] text-sm text-[1.15rem] text-[#a6a9ae] font-semibold leading-6 fontTech tracking-[-1px]">
                <span className="border-2 border-solid border-[#a6a9ae]  rounded-[50%] w-[28px] h-[28px] flex justify-center mr-3 ">
                  2
                </span>
                Delivery details
              </div>
            </div>
          ) : submitDeliveryDetailschecked ? (
            <div className="flex flex-col px-6 h-fit pb-4">
              <div className="flex flex-row items-center justify-between py-[26px] text-sm text-[1.15rem] font-semibold leading-6 fontTech tracking-[-1px]">
                <div className="flex flex-row items-center">
                  <span className="border-2 border-solid border-[#009f29] text-[#009f29] rounded-[50%] w-[28px] h-[28px] flex items-center justify-center mr-3 ">
                    <MdDone />
                  </span>
                  Delivery details
                </div>
                <span
                  onClick={() => setsubmitDeliveryDetailschecked(false)}
                  className="text-sm font-normal leading-5 tracking-[0] text-[#0066be] cursor-pointer"
                >
                  edit
                </span>
              </div>
            </div>
          ) : (
            deliveryDetailsForm()
          )}
        </div>
        <div className="lg:w-[40%] lg:rounded shadow bg-white mt-4 lg:mt-0 pb-[26px] h-fit fontTech">
          <p className="p-6 text-[1.15rem] font-semibold leading-6 tracking-[-1px]">
            Order summary.
          </p>
          <div className="flex flex-col px-6">
            <div className="flex justify-between text-sm font-normal leading-5 tracking-[0] text-[#0e001a] pb-3">
              Quantity
              <span>{cartItems.reduce((a, c) => a + c.quantity, 0)} items</span>
            </div>
            <div className="flex justify-between text-sm font-normal leading-5 tracking-[0] text-[#0e001a] pb-3">
              Item value
              <span>
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP
              </span>
            </div>
            <div className="flex justify-between text-[1.15rem] font-semibold leading-6 tracking-[-1px] py-4 border-t">
              Total
              <span>
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} EGP
              </span>
            </div>
          </div>
          {paymentMethodFormchecked && submitDeliveryDetailschecked ? (
            loading ? (
              <div>
                <div className="flex px-[26px] mt-[18px]">
                  <Button
                    onClick={placeOrderHandler}
                    className="w-full"
                    variant="contained"
                    sx={{
                      padding: "16px",
                      borderRadius: "8px",
                      backgroundColor: "#3a3a3a",
                    }}
                    size="large"
                  >
                    <CircularProgress size={25} thickness={4} color="inherit" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex px-[26px] mt-[18px]">
                <Button
                  onClick={placeOrderHandler}
                  className="w-full"
                  variant="contained"
                  sx={{
                    padding: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#0e001a",
                    "&:hover": {
                      backgroundColor: "#3a3a3a",
                    },
                  }}
                  size="large"
                >
                  Place order
                </Button>
              </div>
            )
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default Checkout;
