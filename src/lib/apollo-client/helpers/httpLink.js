import { getApiBaseUrl } from "@/utils";
import { createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: `${getApiBaseUrl()}/graphql`,
});

export default httpLink;
