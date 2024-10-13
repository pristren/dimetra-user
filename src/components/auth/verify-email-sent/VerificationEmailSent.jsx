/* eslint-disable react/no-unescaped-entities */
import { Email } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { sendVerificationEmail } from "../apis/sendVerificationEmail";

const VerificationEmailSent = ({ token }) => {
  const [seconds, setSeconds] = useState(6);
  const timerRef = useRef(null);

  console.log(`http://localhost:5173/verify-email?token=${token}`); // to verify from console

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
      <h4>Verify your email</h4>
      <p className="text-lg text-gray-500 text-center font-normal mt-4">
        Almost there! We've sent a verification email to your email address. You
        need to verify your email address to login into Dimetra
      </p>

      <div className="mt-5">
        <Button
          className="px-20 mt-10"
          disabled={seconds > 0}
          onClick={handleResendEmail}
        >
          Resend code
        </Button>
        <p className="text-center text-gray-700 mt-4">
          {formatTime(seconds)} Left
        </p>
      </div>
    </div>
  );
};

export default VerificationEmailSent;
