import VerificationEmail from "@/components/auth/verify-email/VerifyEmail";
import AuthLayout from "@/layout/auth-layout";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const token = location.search.split("=")[1];

  return (
    <div>
      <AuthLayout>
        <VerificationEmail token={token} />
      </AuthLayout>
    </div>
  );
};

export default VerifyEmail;
