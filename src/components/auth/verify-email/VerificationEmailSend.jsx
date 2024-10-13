/* eslint-disable react/no-unescaped-entities */
import { Email } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const VerificationEmailSend = ({ token }) => {
  const [seconds, setSeconds] = useState(120);
  const timerRef = useRef(null);

  const [isDisabled, setIsDisabled] = useState(true);

  //   const verifyLink = `http://localhost:5173/verify-email?token=${token}`;
  //   console.log(verifyLink);

  useEffect(() => {
    // Start the timer
    timerRef.current = setInterval(() => {
      setSeconds((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timerRef.current); // Clear the timer when it reaches 0
          setIsDisabled(false); // Enable the button
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Cleanup function when component unmounts or resets
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  // Reset the countdown and disable the button again

  const handleResendEmail = () => {
    // Reset the countdown and disable the button again

    setSeconds(120);
    setIsDisabled(true);

    // Restart the timer
    timerRef.current = setInterval(() => {
      setSeconds((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timerRef.current);
          setIsDisabled(false);
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Logic for resending the email
    console.log("Resending email...");
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center p-10 w-11/12 md:w-1/2 rounded-2xl">
      <Email className="bg-secondary p-7 w-24 h-24 rounded-full mb-10" />
      <h4>Verify your email</h4>
      <p className="text-lg text-gray-500 text-center font-normal mt-4">
        Almost there! We've sent a verification email to your email address. You
        need to verify your email address to login into Dimetra
      </p>

      <div className="mt-10">
        <p className="text-center text-gray-700">
          {formatTime(seconds)} Left to resend email
        </p>
        <Button
          className="px-20 mt-10"
          disabled={seconds > 0}
          onClick={handleResendEmail}
        >
          Resend code
        </Button>
      </div>
    </div>
  );
};

export default VerificationEmailSend;
