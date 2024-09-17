/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const access_token = localStorage.getItem("access_token");
  return !access_token ? (
    <Navigate to={`/login`} state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
