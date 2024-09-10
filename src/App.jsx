import Home from "@/pages/home";
import WrongPath from "@/pages/wrong-path";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import ForgotPassword from "./pages/authentication/forgot-password";
import ResetPassword from "./pages/authentication/reset-password";
import OrderHistory from "./pages/order-history/OrderHistory";
import OrderLayout from "./layout/order-layout";
import PrivateRoute from "./layout/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<WrongPath />} />
      <Route path="/order/" element={<OrderLayout />}>
        <Route
          path="history"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
