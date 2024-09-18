import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "@/utils";

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: `Bearer ${getAccessToken()}`,
  },
}));

export default authLink;
