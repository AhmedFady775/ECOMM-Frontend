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
import Payments from "./pages/User/Payments";
import Profile from "./pages/User/Profile";
import OrdersHistory from "./pages/User/OrdersHistory";
import Return from "./pages/User/Return";
import ProtectedRoute from "./components/ProtoctedRoute";
import SideNav from "./components/SideNav";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Admin/Dashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import ListProducts from "./pages/Admin/ListProducts";
import ManageProducts from "./pages/Admin/ManageProduct";
import AdminTopBar from "./components/AdminTopBar";
import AdminDownBar from "./components/AdminDownBar";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";

const App = () => {
  const location = useLocation();

  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/products" ||
    location.pathname === "/users" ||
    location.pathname === "/orders"
  ) {
    return (
      <div className="flex flex-col sm:flex-row">
        {/* <SideNav className="hidden sm:flex" /> */}
        <AdminTopBar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <AdminDownBar />
      </div>
    );
  }

  if (
    location.pathname !== "/" &&
    location.pathname !== "/signin" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/dashboard" &&
    location.pathname !== "/products" &&
    location.pathname !== "/users" &&
    location.pathname !== "/orders"
  ) {
    return (
      <div>
        <ShopNav />
        <Routes>
          <Route
            path="/user/returns"
            element={
              <ProtectedRoute>
                <Return />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/ordershistory"
            element={
              <ProtectedRoute>
                <OrdersHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
          <Route path="/:id" element={<ProductScreen />} />
          <Route path="shop" element={<Shop />} />
          <Route path="/Cart" element={<Cart />} />
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
