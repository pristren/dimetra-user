// /verify-email
import axios from "axios";

export const verifyEmail = async (body) => {
  return await axios
    .post(`/auth/verify-email`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
