/* eslint-disable react/prop-types */
import useInitializeUser from "@/hooks/useInitializeUser";
import { getAccessToken } from "@/utils";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { getAnUser, loading } = useInitializeUser();
  useEffect(() => {
    if (getAccessToken()) {
      getAnUser();
    }
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
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
    );
  }

  return !getAccessToken() ? (
    <Navigate to={`/login`} state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
