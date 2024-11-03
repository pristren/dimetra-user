import ResetForm from "@/components/auth/reset-password/ResetForm";
import AuthLayout from "@/layout/auth-layout";
import { useLocation } from "react-router-dom";

export default function VerifyForgotPassword() {
  const location = useLocation();
  const token = location.search.split("=")[1];

  return (
    <AuthLayout>
      <ResetForm token={token} />
    </AuthLayout>
  );
}
