import axios from "axios";

export const verifyForgotPassword = async (body) => {
  return await axios.post(`/auth/verify-forgot-password`, body).then((res) => {
    return res.data;
  });
};
