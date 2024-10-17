/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { t } from "i18next";

export default function AuthFooter({ page }) {
  let content;
  if (page === "register") {
    content = (
      <Link to="/login" className="block text-center mt-4 text-sm ">
        {t("already_have_an_account")}{" "}
        <span className="underline text-blue-600">{t("login")}</span>
      </Link>
    );
  } else if (page === "login") {
    content = (
      <Link to="/register" className="block text-center mt-4 text-sm ">
        {t("dont_have_an_account")}{" "}
        <span className="underline text-blue-600">{t("register")}</span>
      </Link>
    );
  }
  return <div>{content}</div>;
}
