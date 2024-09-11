/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state?.counter);
  return !user ? (
    <Navigate to={`/login`} state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
