import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LinearProgress from "@mui/joy/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { Store } from "../../components/Store";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Stepper, Step, StepLabel } from "@mui/material";

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

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "https://ecomm12.herokuapp.com/orders/create",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
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
      toast.error(err);
    }
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div className="flex flex-col min-h-screen lg:items-center">
      <div className="flex flex-col p-4 lg:w-[60%]">
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
            <Step completed index={2}>
              <StepLabel>Payment</StepLabel>
            </Step>
            <Step index={3} active>
              <StepLabel>Place order</StepLabel>
            </Step>
          </Stepper>
        </section>
        <p className="mt-2 mb-4">
          <strong className="text-lg">Preview Order</strong>
        </p>
        <form className="flex flex-col w-full" onSubmit={placeOrderHandler}>
          <div className="placeOrderCont">
            <div className="placeOrderHeader">
              <strong>Shipping</strong>
            </div>
            <div>
              <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
              <strong>Address: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </div>
            <Link className="text-blue-400 underline" to="/shipping">
              Edit
            </Link>
          </div>

          <div className="placeOrderCont">
            <div className="placeOrderHeader">
              <strong>Payment Method</strong>
            </div>
            <div>
              <strong>Method:</strong> {cart.paymentMethod}
            </div>
            <Link className="text-blue-400 underline" to="/payment">
              Edit
            </Link>
          </div>

          <div className="placeOrderCont">
            <div className="placeOrderHeader">
              <strong>Items</strong>
            </div>
            <div className="placeOrderItems">
              {cart.cartItems.map((item) => (
                <div className="wholeOrderItem" key={item.id}>
                  <div className="orderItemPart">
                    <Link
                      className="text-blue-400 underline"
                      to={`/${item._id}`}
                    >
                      <div className="p-2">
                        <img
                          className="w-16 h-12 object-cover"
                          src={item.image}
                          alt={item.name}
                        ></img>
                      </div>
                    </Link>
                  </div>
                  <div className="orderItemPart">
                    <Link
                      className="text-blue-400 underline"
                      to={`/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="orderItemPart" key={item.id}>
                    <div className="orderItemQuan">
                      <span>{item.quantity}</span>
                    </div>
                  </div>
                  <div className="orderItemPart">{item.price} EGP</div>
                </div>
              ))}
            </div>
            <Link className="text-blue-400 underline" to="/cart">
              Edit
            </Link>
          </div>
          <div className="placeOrderCont">
            <div className="placeOrderHeader">
              <strong>Order Summary</strong>
            </div>
            <div className="h3Padding">
              <strong>Items price</strong>
              <p>{cart.itemsPrice.toFixed(2)} EGP</p>
              <strong>Shipping</strong>
              <p>{cart.shippingPrice.toFixed(2)} EGP</p>
              <strong>Tax</strong>
              <p>{cart.taxPrice.toFixed(2)} EGP</p>
              <div className="placeOrderHeader">
                <strong> Order Total</strong>
              </div>
              <strong>{cart.totalPrice.toFixed(2)} EGP</strong>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            {loading ? (
              <button
                className="bg-slate-300 text-white py-2 px-6 rounded flex justify-center items-center"
                type="submit"
              >
                <CircularProgress size={25} thickness={4} color="inherit" />
              </button>
            ) : (
              <button
                className="bg-teal-500 text-white py-2 px-6 rounded"
                type="submit"
              >
                Place Order
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
