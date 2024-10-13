import VerificationEmailSent from "@/components/auth/verify-email-sent/VerificationEmailSent";
import AuthLayout from "@/layout/auth-layout";
import { useLocation } from "react-router-dom";

const VerifyEmailSent = () => {
  const location = useLocation();
  const token = location.search.split("=")[1];
  return (
    <div>
      <AuthLayout>
        <VerificationEmailSent token={token} />
      </AuthLayout>
    </div>
  );
};

export default VerifyEmailSent;
