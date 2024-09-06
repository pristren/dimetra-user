import LoginForm from "@/components/auth/login/login-form";
import AuthLayout from "@/layout/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
