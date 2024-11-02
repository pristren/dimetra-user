/* eslint-disable react/no-unescaped-entities */
import { Email } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { sendVerificationEmail } from "../apis/sendVerificationEmail";
import { t } from "i18next";
import toast from "react-hot-toast";

const VerificationEmailSent = ({ token }) => {
  const [seconds, setSeconds] = useState(6);
  const timerRef = useRef(null);

  useEffect(() => {
    // Start the timer
    timerRef.current = setInterval(() => {
      setSeconds((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timerRef.current);
        }
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          return prevCountdown;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleResendEmail = () => {
    setSeconds(6);

    timerRef.current = setInterval(() => {
      setSeconds((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timerRef.current);
        }
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          return prevCountdown;
        }
      });
    }, 1000);
    sendVerificationEmail({ token })
      .then((res) => {
        if (res.message === "Verification email sent successfully") {
          const newUrl = window.location.href.replace(token, res.data?.token);
          window.history.replaceState(null, "", newUrl);
          toast.success({
            icon: "🔑",
            description: res.message,
          });
        } else {
          console.log(res);
        }
      })
      .finally(() => {
        // for toast if indeed
      });
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center p-10 w-11/12 md:w-1/2 rounded-2xl">
      <Email className="bg-secondary p-7 w-24 h-24 rounded-full mb-10" />
      <h4>{t("verify_your_email")}</h4>
      <p className="text-lg text-gray-500 text-center font-normal mt-4">
        {t(
          "almost_there_we_have_sent_a_verification_email_to_your_email_address_you_need_to_verify_your_email_address_to_login_into_dimetra"
        )}
      </p>

      <div className="mt-5">
        <Button
          className="px-20 mt-10"
          disabled={seconds > 0}
          onClick={handleResendEmail}
        >
          {t("resend_code")}
        </Button>
        <p className="text-center text-gray-700 mt-4">
          {formatTime(seconds)} {t("left")}
        </p>
      </div>
    </div>
  );
};

export default VerificationEmailSent;
