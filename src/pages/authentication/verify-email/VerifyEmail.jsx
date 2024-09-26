import VerificationEmailSend from "@/components/auth/verify-email/VerificationEmailSend";
import AuthLayout from "@/layout/auth-layout";

const VerifyEmail = () => {
  return (
    <div>
      <AuthLayout>
        <VerificationEmailSend />
      </AuthLayout>
    </div>
  );
};

export default VerifyEmail;
