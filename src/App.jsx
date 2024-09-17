import axios from "axios";
import WrongPath from "@/pages/wrong-path";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@/pages/authentication/login";
import Register from "@/pages/authentication/register";
import ForgotPassword from "@/pages/authentication/forgot-password";
import ResetPassword from "@/pages/authentication/reset-password";
import OrderHistory from "@/pages/order/order-history/OrderHistory";
import OrderLayout from "./layout/order-layout";
import PrivateRoute from "./layout/PrivateRoute";
import CreateOrder from "@/pages/order/create-order/CreateOrder";
import OrderSettings from "@/pages/order/order-settings/OrderSettings";
import SendRequest from "@/pages/order/send-request/SendRequest";
import AllOrders from "@/pages/order/all-orders/AllOrders";
import RecurringOrders from "@/pages/order/recurring-orders/RecurringOrders";
import OrderDetails from "@/pages/order/order-details/OrderDetails";
import AddRequest from "@/pages/order/add-request/AddRequest";

function App() {
  axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_LINK}`;
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/orders/all-orders" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/create-order"
        element={
          <PrivateRoute>
            <CreateOrder />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <OrderLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="all-orders" />} />
        <Route path="order-details/:id" element={<OrderDetails />} />
        <Route path="history" element={<OrderHistory />} />
        <Route path="all-orders" element={<AllOrders />} />
        <Route path="recurring-orders/:id" element={<RecurringOrders />} />
        <Route path="setting" element={<OrderSettings />} />
        <Route path="send-request" element={<SendRequest />} />
        <Route path="add-request" element={<AddRequest />} />
      </Route>
      <Route path="*" element={<WrongPath />} />
    </Routes>
  );
}

export default App;
