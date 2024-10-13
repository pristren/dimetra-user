import VerificationEmailSend from "@/components/auth/verify-email/VerificationEmailSend";
import AuthLayout from "@/layout/auth-layout";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const token = location.search.split("=")[1];
  return (
    <div>
      <AuthLayout>
        <VerificationEmailSend token={token} />
      </AuthLayout>
    </div>
  );
};

export default VerifyEmail;
