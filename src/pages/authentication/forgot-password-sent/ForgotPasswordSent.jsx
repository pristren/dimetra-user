import ForgotPasswordEmailSent from "@/components/auth/forgot-password-sent/ForgotPasswordEmailSent";
import AuthLayout from "@/layout/auth-layout";

const ForgotPasswordSent = () => {
  return (
    <div>
      <AuthLayout>
        <ForgotPasswordEmailSent />
      </AuthLayout>
    </div>
  );
};

export default ForgotPasswordSent;
