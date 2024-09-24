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
    return <div>Loading...</div>;
  }

  return !getAccessToken() ? (
    <Navigate to={`/login`} state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
