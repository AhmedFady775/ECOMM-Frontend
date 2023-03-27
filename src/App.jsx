import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { startTransition } from "react";
import { lazy, Suspense, useEffect } from "react";
const Home = lazy(() => import("./pages/Home"));
import LinearProgress from "@mui/material/LinearProgress";
const SignIn = lazy(() => import("./pages/Auth/SignIn"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));

import ProductScreen from "./pages/Product/ProductScreen";
import * as React from "react";
// import Shop from "./pages/Shop";
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const ShippingAddressScreen = lazy(() =>
  import("./pages/Shipping/ShippingAddressScreen")
);

const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
import Footer from "./components/footer";
import ShopNav from "./components/ShopNav";
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
import AdminTopBar from "./components/AdminTopBar";
import AdminDownBar from "./components/AdminDownBar";
import Users from "./pages/Admin/Users/Users";
import Products from "./pages/Admin/Products/Products";
import Orders from "./pages/Admin/Orders/Orders";
import CreateProduct from "./pages/Admin/Products/CreateProduct";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/navbar";

const App = () => {
  const location = useLocation();

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/shop") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  if (
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin/products" ||
    location.pathname === "/admin/users" ||
    location.pathname === "/admin/createproduct" ||
    location.pathname === "/admin/orders"
  ) {
    return (
      <div className="flex flex-col lg:flex-row">
        <SideNav />
        <AdminTopBar />
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <Products />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/createproduct"
            element={
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />
        </Routes>
        <AdminDownBar />
        <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
      </div>
    );
  }

  if (
    location.pathname !== "/signin" &&
    location.pathname !== "/checkout" &&
    location.pathname !== "/" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/admin/dashboard" &&
    location.pathname !== "/admin/products" &&
    location.pathname !== "/admin/users" &&
    location.pathname !== "/admin/createproduct" &&
    location.pathname !== "/admin/orders"
  ) {
    return (
      <div>
        <Suspense fallback={<LinearProgress />} fallbackMinDurationMs={1500}>
          <Navbar />
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
            <Route path="/products/:id" element={<ProductScreen />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
              path="*"
              element={
                <div className="flex min-h-[95vh] justify-center font-semibold items-center text-3xl lg:text-5xl">
                  Page not found 404
                </div>
              }
            />
          </Routes>
          <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
          <Footer />
        </Suspense>
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
    </div>
  );
};

export default App;
