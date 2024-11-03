/* eslint-disable react/no-unescaped-entities */
import { Email } from "@/assets/icons";
import { t } from "i18next";

const ForgotPasswordEmailSent = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center p-10 w-11/12 md:w-1/2 rounded-2xl">
      <Email className="bg-secondary p-7 w-24 h-24 rounded-full mb-10" />
      <h4>{t("password_reset_request_successful")}</h4>
      <p className="text-lg text-gray-500 text-center font-normal mt-4">
        {t(
          "we_have_successfully_received_your_password_reset_request_please_check_your_email_for_a_link_to_reset_your_password"
        )}
      </p>
    </div>
  );
};

export default ForgotPasswordEmailSent;
