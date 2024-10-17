/* eslint-disable react/no-unescaped-entities */
import { Email } from "@/assets/icons";
import { useEffect, useState } from "react";
import {} from "../apis/sendVerificationEmail";
import { Link } from "react-router-dom";
import { verifyEmail } from "../apis/verifyEmail";
import { t } from "i18next";

const VerificationEmail = ({ token }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (token) {
      verifyEmail({ token }).then((res) => {
        if (res.message === "Successfully verified email!") {
          setStatus("verified");
          setIsVerified(true);
        } else if (res.message === "jwt expired") {
          // link was expired
          setStatus("expired");
          setIsVerified(false);
        } else if (res.message === "invalid signature") {
          // wrong url
          setStatus("invalid");
          setIsVerified(false);
        } else if (res.message === "User is already verified") {
          // user is already verified
          setStatus("already_verified");
          setIsVerified(true);
        }
      });
    } else {
      // no token then show error message
      setStatus("no_token");
      setIsVerified(false);
    }
  }, [token]);
  return (
    <div className="bg-white flex flex-col justify-center items-center p-10 w-11/12 md:w-1/2 rounded-2xl">
      <Email className="bg-secondary p-7 w-24 h-24 rounded-full mb-10" />
      {status === "verified" && <h4>{t("email_verified_successfully")}</h4>}
      {status === "expired" && <h4>{t("link_expired")}</h4>}
      {status === "invalid" && <h4>{t("invalid_link")}</h4>}
      {status === "already_verified" && <h4>{t("email_already_verified")}</h4>}
      {status === "no_token" && <h4>{t('no_token')}</h4>}
      <p className="text-lg text-gray-500 text-center font-normal mt-4">
        {isVerified
          ? t("you_can_now_login")
          : t("something_went_wrong")}
      </p>

      {isVerified && (
        <div className="mt-10">
          <Link
            to="/login"
            className="px-10 py-3 rounded-lg mt-10 bg-primary text-white"
          >
            {t("Login")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerificationEmail;
