import Logo from "@/assets/icons/logo";
import Language from "@/components/helper-ui/language";

export default function AuthLayout({ children, ...props }) {
  return (
    <div {...props} className="h-screen">
      <nav className="flex justify-between items-center  px-4 border-b h-16">
        <Logo />
        <Language />
      </nav>
      <div className="bg-authBackground w-full bg-cover  bg-no-repeat h-[calc(100vh-4rem)] flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
