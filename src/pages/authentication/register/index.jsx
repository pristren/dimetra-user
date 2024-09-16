import RegisterForm from "@/components/auth/register/RegisterForm";
import AuthLayout from "@/layout/auth-layout";

export default function Register() {
  return (
    <AuthLayout childContainer={"h-min py-10"}>
      <RegisterForm />
    </AuthLayout>
  );
}
