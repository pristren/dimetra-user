import { DefaultAvatar, DimetraMobileLogo, Logo } from "@/assets/icons";
import Language from "@/components/helper-ui/Language";
import MobileNav from "@/layout/order-layout/MobileNav";
import { setProfileImageLoaded } from "@/redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const url = window.location.pathname;
  const { userInfo, profileImageLoaded } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <nav
      className={`
        ${url === "/create-order" ? "" : "md:justify-end"}
        flex justify-between items-center border-b px-4 lg:px-8 py-2.5 sticky top-0 bg-white z-20
      `}
    >
      <Link to="/" className=" hidden lg:block">
        <Logo
          className={`${
            url === "/create-order" ? "" : "md:hidden"
          }`}
        />
      </Link>
      <div className="flex items-center gap-2 lg:hidden">
        <MobileNav />
        <Link to="/">
          <DimetraMobileLogo />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Language />
        <div className="flex items-center gap-2">
          {userInfo?.profile_image ? (
            <div className="flex items-center">
              {!profileImageLoaded && (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              )}

              <img
                id="profile_image_id_nav"
                src={userInfo?.profile_image}
                className={`w-10 h-10 rounded-full object-cover profile_image_class_to_hide ${
                  !profileImageLoaded && "hidden"
                }`}
                onLoad={(e) => {
                  dispatch(setProfileImageLoaded(true));
                  e.target.classList.remove("hidden");
                }}
                alt="Profile"
              />
            </div>
          ) : (
            <DefaultAvatar />
          )}
          <p className="text-sm hidden lg:block">{userInfo?.first_name}</p>
        </div>
      </div>
    </nav>
  );
}
