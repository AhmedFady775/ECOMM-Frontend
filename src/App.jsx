import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "../src/pages/Auth/SignUp";
import ProductScreen from "./pages/Product/ProductScreen";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ShopNav from "./components/ShopNav";
import ShippingAddressScreen from "./pages/Shipping/ShippingAddressScreen";
import OrderScreen from "./pages/Shipping/OrderScreen";
import PaymentMethodScreen from "./pages/Shipping/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/Shipping/PlaceOrderScreen";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();

  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/createposts" ||
    location.pathname === "/manageproduct" ||
    location.pathname === "/listproducts"
  ) {
    return (
      <div className="flex flex-row">
        {/* <SideNav /> */}
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manageproduct" element={<ManageProduct />} />
          <Route path="/listproducts" element={<ListProducts />} />
          <Route path="/createposts" element={<CreateProduct />} /> */}
        </Routes>
      </div>
    );
  }

  if (
    location.pathname !== "/" &&
    location.pathname !== "/signin" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/dashboard" &&
    location.pathname !== "/listproducts" &&
    location.pathname !== "/createposts" &&
    location.pathname !== "/manageproduct"
  ) {
    return (
      <div>
        <ShopNav />
        <Routes>
          {/* <Route path="/editposts/:id" element={<EditProduct />} />
          <Route path="/orderhistory" element={<OrderHistoryScreen />}></Route> */}
          <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
          <Route path="/:id" element={<ProductScreen />} />
          <Route path="shop" element={<Shop />} />
          <Route path="/Cart" element={<Cart />} />
          {/* <Route path="/AccountDetails" element={<AccountDetails />} /> */}
          <Route path="/payment" element={<PaymentMethodScreen />}></Route>
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />}></Route>
        </Routes>
        <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
    </div>
  );
};

export default App;
