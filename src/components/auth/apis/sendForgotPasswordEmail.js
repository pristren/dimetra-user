// /verify-email
import axios from "axios";

export const sendForgotPasswordEmail = async (body) => {
  return await axios
    .post(`/auth/forgot-password-sent`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
