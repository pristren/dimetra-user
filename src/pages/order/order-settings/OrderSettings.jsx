import { Human, PhoneCall, Security } from "@/assets/icons";
import AppDialog from "@/components/common/AppDialog";
import PasswordChangeForm from "./PasswordChangeForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInitializeUser from "@/hooks/useInitializeUser";
import { useMutation } from "@apollo/client";
import { setProfileImageLoaded } from "@/redux/slices/user/userSlice";
import { UPDATE_AN_USER_PASSWORD } from "./graphql/mutations/updateUserPassword.gql";
import toast from "react-hot-toast";
import { t } from "i18next";
import { Link } from "react-router-dom";

const OrderSettings = () => {
  const { userInfo, profileImageLoaded } = useSelector((state) => state.user);
  const { getAnUser } = useInitializeUser();

  useEffect(() => {
    getAnUser();
  }, []);

  const dispatch = useDispatch();
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [appDialougeOpen, setAppDialougeOpen] = useState(false);

  const [updateUserPassword] = useMutation(UPDATE_AN_USER_PASSWORD);

  const onSubmitPasswordChange = async (data) => {
    const { new_password, current_password } = data;
    setPasswordChangeLoading(true);
    await updateUserPassword({
      variables: {
        inputData: {
          new_password,
          current_password,
        },
      },
    })
      .then(({ data }) => {
        if (data.updateUserPassword) {
          toast.success(t("password_updated_successfully"), {
            icon: "🔒",
          });
        }
      })
      .catch((error) => {
        toast.error(error.message || t("password_update_error"));
      })
      .finally(() => {
        setAppDialougeOpen(false);
        setPasswordChangeLoading(false);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <h2 className="text-2xl font-bold text-nowrap">{t("profile")}</h2>
        <AppDialog
          open={appDialougeOpen}
          onOpenChange={setAppDialougeOpen}
          trigger={
            <div className="flex justify-end items-center gap-2">
              <Security />
              <p className="highlight text-nowrap underline">
                {t("update_password")}
              </p>
            </div>
          }
          className={"p-8"}
          title={t("change_password_title")}
          content={
            <PasswordChangeForm
              loading={passwordChangeLoading}
              onSubmit={onSubmitPasswordChange}
            />
          }
        />
      </div>
      <div className="bg-white border border-gray-300 rounded-lg mt-8">
        <div className="flex items-center justify-between p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <div className="h-56 w-56 rounded-3xl border-[8px] border-white shadow-xl">
              {!profileImageLoaded && (
                <div className="w-full h-full rounded-3xl  bg-gray-200 animate-pulse"></div>
              )}

              <img
                src={
                  userInfo?.profile_image ||
                  "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
                }
                className={`w-full h-full object-cover rounded-3xl hidden profile_image_class_to_hide`}
                alt="Profile Image"
                onLoad={(e) => {
                  dispatch(setProfileImageLoaded(true));
                  e.target.classList.remove("hidden");
                }}
              />
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Human className="lg:hidden" />
                <h4>
                  {userInfo?.first_name} {userInfo?.last_name}
                </h4>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <PhoneCall className="lg:hidden" />
                <p className="font-medium">{userInfo?.phone}</p>
              </div>
            </div>
          </div>
          <Link
            to={"/orders/setting/edit"}
            className="bg-gray-100 hover:bg-gray-200 shadow-xl rounded-full py-2 px-5 text-blue-500 hidden lg:block"
          >
            {t("edit")}
          </Link>
        </div>
        <div className="mt-10 lg:mt-20">
          <div className="flex justify-between lg:justify-start items-center gap-5 lg:gap-20 border-b border-gray-300 mb-5 pb-5 px-5">
            <p className=" ml-3 text-gray-500 w-40">{t("email")}</p>
            <p className="font-medium lg:font-normal">{userInfo?.email}</p>
          </div>
          <div className="flex justify-between lg:justify-start items-center gap-5 lg:gap-20 border-b border-gray-300 mb-5 pb-5 px-5">
            <p className=" ml-3 text-gray-500 w-40">{t("address")}</p>
            <p className="font-medium lg:font-normal">{userInfo?.address}</p>
          </div>
          <div className="flex justify-between lg:justify-start items-center gap-5 lg:gap-20 border-b border-gray-300 mb-5 pb-5 px-5">
            <p className=" ml-3 text-gray-500 w-40">{t("billing_address")}</p>
            <p className="font-medium lg:font-normal">
              {userInfo?.billing_address}
            </p>
          </div>
          <div className="flex justify-between lg:justify-start items-center gap-5 lg:gap-20 border-b border-gray-300 mb-5 pb-5 px-5">
            <p className=" ml-3 text-gray-500 w-40">{t("code")}</p>
            <p className="font-medium lg:font-normal">{userInfo?.code}</p>
          </div>
          <div className="flex justify-between lg:justify-start items-center gap-5 lg:gap-20 border-b border-gray-300 mb-5 pb-5 px-5">
            <p className=" ml-3 text-gray-500 w-40">{t("country")}</p>
            <p className="font-medium lg:font-normal">{userInfo?.place}</p>
          </div>
          <div className="flex justify-between lg:justify-start items-center gap-5 lg:gap-20 pb-5 px-5">
            <p className=" ml-3 text-gray-500 w-40">
              {t("internal_cost_center")}
            </p>
            <p className="font-medium lg:font-normal">
              {userInfo?.internal_cost_center || t("not_available")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSettings;
