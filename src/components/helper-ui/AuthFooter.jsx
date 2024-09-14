/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function AuthFooter({ page }) {
  let content;
  if (page === "register") {
    content = (
      <Link to="/login" className="block text-center mt-4 text-sm ">
        Already have an account?{" "}
        <span className="underline text-blue-600">Login Now</span>
      </Link>
    );
  } else if (page === "login") {
    content = (
      <Link to="/register" className="block text-center mt-4 text-sm ">
        Don&#39;t have an account?{" "}
        <span className="underline text-blue-600">Regiester Now</span>
      </Link>
    );
  }
  return <div>{content}</div>;
}
