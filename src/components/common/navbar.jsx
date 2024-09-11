import DefaultAvatar from "@/assets/icons/default-avatar";
import Logo from "@/assets/icons/logo";
import Language from "@/components/helper-ui/language";

export default function Navbar() {
  return (
    <nav className="flex justify-between md:justify-end items-center  border-b px-8 py-2.5 sticky top-0 bg-white z-20">
      <Logo className={"md:hidden"} />
      <div className="flex items-center gap-3">
        <Language />
        <DefaultAvatar />
        <p className="text-sm">Mahmud</p>
      </div>
    </nav>
  );
}
