/* eslint-disable react/no-unescaped-entities */
import { Email } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VerificationEmailSend = () => {
  const [seconds, setSeconds] = useState(120);
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  return (
    <div className="bg-white flex flex-col justify-center items-center p-10 w-11/12 md:w-1/2 rounded-2xl">
      <Email className="bg-secondary p-7 w-24 h-24 rounded-full mb-10" />
      <h4>Verify your email</h4>
      <p className="text-lg text-gray-500 text-center font-normal mt-4">
        Almost there! We've sent a verification email to t****@g****. *.com. You
        need to verify your email address to login into Dimetra
      </p>
      {seconds ? (
        <div className="mt-10">
          <p className="text-center text-gray-700">
            {formatTime(seconds)} Left to resend email
          </p>
          <Link to="/register">
            <Button className="px-20 mt-2">
              Register Email
            </Button>
          </Link>
        </div>
      ) : (
        <Button className="px-20 mt-10">
          Resend code
        </Button>
      )}
    </div>
  );
};

export default VerificationEmailSend;
