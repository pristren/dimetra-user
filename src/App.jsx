import axios from "axios";
import WrongPath from "@/pages/wrong-path";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@/pages/authentication/login";
import Register from "@/pages/authentication/register";
import ForgotPassword from "@/pages/authentication/forgot-password";
import ResetPassword from "@/pages/authentication/reset-password";
import OrderHistory from "@/pages/order/order-history/OrderHistory";
import OrderLayout from "@/layout/order-layout";
import PrivateRoute from "@/layout/PrivateRoute";
import CreateOrder from "@/pages/order/create-order/CreateOrder";
import OrderSettings from "@/pages/order/order-settings/OrderSettings";
import AllOrders from "@/pages/order/all-orders/AllOrders";
import RecurringOrders from "@/pages/order/recurring-orders/RecurringOrders";
import OrderDetails from "@/pages/order/order-details/OrderDetails";
import Message from "@/pages/order/send-request/Message";
import RateTheDriver from "@/pages/order/order-history/RateTheDriver";
import SentRequests from "@/pages/order/send-request/SentRequests";
import EditOrder from "@/pages/order/edit-order/EditOrder";
import VerifyEmailSent from "@/pages/authentication/verify-email-sent/VerifyEmailSent";
import VerifyEmail from "@/pages/authentication/verify-email/VerifyEmail";
import EditRecurringOrder from "@/pages/order/edit-recurring-orders/EditRecurringOrder";
import News from "@/pages/order/news/News";
import ReopenOrder from "@/pages/order/reopen-order/ReopenOrder";
import CopyOrder from "@/pages/order/copy-order/CopyOrder";
import TermsConditionPage from "@/pages/terms-condition/TermsConditionPage";
import PrivacyPolicyPage from "@/pages/privacy-policy/PrivacyPolicyPage";
import ForgotPasswordSent from "@/pages/authentication/forgot-password-sent/ForgotPasswordSent";
import VerifyForgotPassword from "@/pages/authentication/verify-forgot-password/VerifyForgotPassword";
import { useTranslation } from "react-i18next";
import NewsDetails from "@/pages/order/news-details/NewsDetails";
function App() {
  useTranslation();
  axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/orders/all-orders" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email-sent" element={<VerifyEmailSent />} />
      <Route path="/forgot-password-sent" element={<ForgotPasswordSent />} />
      <Route
        path="/verify-forgot-password"
        element={<VerifyForgotPassword />}
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/terms-and-conditions" element={<TermsConditionPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route
        path="/create-order"
        element={
          <PrivateRoute>
            <CreateOrder />
          </PrivateRoute>
        }
      />
      <Route
        path="/reopen-order/:id"
        element={
          <PrivateRoute>
            <ReopenOrder />
          </PrivateRoute>
        }
      />
      <Route
        path="/copy-order/:id"
        element={
          <PrivateRoute>
            <CopyOrder />
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
        <Route path="all-orders" element={<AllOrders />} />
        <Route path="history" element={<OrderHistory />} />
        <Route path="setting" element={<OrderSettings />} />
        <Route path="sent-requests" element={<SentRequests />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetails />} />
        <Route
          path="order-details/:id"
          element={<OrderDetails singleRecurring={false} />}
        />
        <Route
          path="recurring-orders/order-details/:id"
          element={<OrderDetails singleRecurring={true} />}
        />
        <Route path="recurring-orders/:id" element={<RecurringOrders />} />
        <Route path="edit-order/:id" element={<EditOrder />} />
        <Route
          path="edit-recurring-order/:id"
          element={<EditRecurringOrder />}
        />
        <Route path="review/:id" element={<RateTheDriver />} />
        <Route path="message/:id" element={<Message />} />
        <Route path="details/:id" element={<OrderDetails />} />
      </Route>
      <Route path="*" element={<WrongPath />} />
    </Routes>
  );
}

export default App;
