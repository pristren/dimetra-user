// /verify-email
import axios from "axios";

export const sendVerificationEmail = async (body) => {
  return await axios
    .post(`/auth/verification-email-sent`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
