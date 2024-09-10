import Home from "@/pages/home";
import WrongPath from "@/pages/wrong-path";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import ForgotPassword from "./pages/authentication/forgot-password";
import ResetPassword from "./pages/authentication/reset-password";
import OrderHistory from "./pages/order/order-history/OrderHistory";
import OrderLayout from "./layout/order-layout";
import CreateOrder from "./pages/order/create-order/CreateOrder";
import OrderSettings from "./pages/order/order-settings/OrderSettings";
import SendRequest from "./pages/order/send-request/SendRequest";
import AllOrders from "./pages/order/all-orders/AllOrders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/create-order" element={<CreateOrder />} />
      <Route path="*" element={<WrongPath />} />
      <Route path="/order/" element={<OrderLayout />}>
        <Route path="history" element={<OrderHistory />} />
        <Route path="all-orders" element={<AllOrders />} />
        <Route path="setting" element={<OrderSettings />} />
        <Route path="send-request" element={<SendRequest />} />
      </Route>
    </Routes>
  );
}

export default App;
