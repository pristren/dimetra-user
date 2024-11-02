/* eslint-disable react/no-unescaped-entities */
import { Email } from "@/assets/icons";
import { useEffect, useState } from "react";
import {} from "../apis/sendVerificationEmail";
import { Link, useLocation } from "react-router-dom";
import { verifyEmail } from "../apis/verifyEmail";
import { t } from "i18next";

const VerificationEmail = () => {
  const location = useLocation();
  const token = location.search.split("=")[1];
  const [isVerified, setIsVerified] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      verifyEmail({ token })
        .then((res) => {
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
          } else {
            // something went wrong
            setStatus("something_went_wrong");
            setIsVerified(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // no token then show error message
      setStatus("no_token");
      setIsVerified(false);
    }
  }, []);
  return (
    <div className="bg-white flex flex-col justify-center items-center p-10 w-11/12 md:w-1/2 rounded-2xl">
      <Email className="bg-secondary p-7 w-24 h-24 rounded-full mb-10" />
      {status === "verified" && <h4>{t("email_verified_successfully")}</h4>}
      {status === "expired" && <h4>{t("link_expired")}</h4>}
      {status === "invalid" && <h4>{t("invalid_link")}</h4>}
      {status === "already_verified" && <h4>{t("email_already_verified")}</h4>}
      {status === "no_token" && <h4>{t("no_token")}</h4>}
      {loading && (
        <div className="flex items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="20"
            height="20"
            style={{
              shapeRendering: "auto",
              display: "block",
              background: "rgba(255, 255, 255, 0)",
            }}
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <circle
                strokeDasharray="164.93361431346415 56.97787143782138"
                r="35"
                strokeWidth="10"
                stroke="#145374"
                fill="none"
                cy="50"
                cx="50"
              >
                <animateTransform
                  keyTimes="0;1"
                  values="0 50 50;360 50 50"
                  dur="1s"
                  repeatCount="indefinite"
                  type="rotate"
                  attributeName="transform"
                ></animateTransform>
              </circle>
              <g></g>
            </g>
          </svg>
          <p>Loading...</p>
        </div>
      )}
      <p className="text-lg text-gray-500 text-center font-normal mt-4">
        {isVerified
          ? t("you_can_now_login")
          : !isVerified && status !== ""
          ? t("something_went_wrong")
          : ""}
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
