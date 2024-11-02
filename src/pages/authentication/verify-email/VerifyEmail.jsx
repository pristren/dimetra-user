import VerificationEmail from "@/components/auth/verify-email/VerifyEmail";
import AuthLayout from "@/layout/auth-layout";

const VerifyEmail = () => {
  return (
    <div>
      <AuthLayout>
        <VerificationEmail />
      </AuthLayout>
    </div>
  );
};

export default VerifyEmail;
