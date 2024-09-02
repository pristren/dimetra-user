import DefaultAvatar from "@/assets/icons/default-avatar";
import Logo from "@/assets/icons/logo";
import Language from "../helper-ui/language";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center  border-b px-8 py-2.5">
      <Logo />
      <div className="flex items-center gap-3">
        <Language />
        <DefaultAvatar />
        <p className="text-sm">Mahmud</p>
      </div>
    </nav>
  );
}
