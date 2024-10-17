import axios from "axios";

export const registerAnUser = async (body) => {
  return await axios.post(`/auth/register`, body).then((res) => {
    return res.data;
  });
};
