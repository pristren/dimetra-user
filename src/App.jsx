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
import AllOrders from "@/pages/order/all-orders/AllOrders";
import RecurringOrders from "@/pages/order/recurring-orders/RecurringOrders";
import OrderDetails from "@/pages/order/order-details/OrderDetails";
import Message from "@/pages/order/send-request/Message";
import RateTheDriver from "@/pages/order/order-history/RateTheDriver";
import SentRequests from "@/pages/order/send-request/SentRequests";

function App() {
  axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
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
        path="/edit-order/:id"
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
        <Route path="all-orders" element={<AllOrders />} />
        <Route path="history" element={<OrderHistory />} />
        <Route path="review/:id" element={<RateTheDriver />} />
        <Route path="recurring-orders/:id" element={<RecurringOrders />} />
        <Route path="setting" element={<OrderSettings />} />
        <Route path="sent-requests" element={<SentRequests />} />
        <Route path="message/:id" element={<Message />} />
        <Route path="details/:id" element={<OrderDetails />} />
      </Route>
      <Route path="*" element={<WrongPath />} />
    </Routes>
  );
}

export default App;
