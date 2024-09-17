import axios from "axios";

export const loginAnUser = async (body) => {
  return await axios
    .post(`/auth/login`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
