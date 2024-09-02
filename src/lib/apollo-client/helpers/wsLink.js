import { getAccessToken, getApiBaseUrl } from "@/utils";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export const getNewWSLink = () =>
  new GraphQLWsLink(
    createClient({
      connectionParams: {
        Authorization: getAccessToken(),
      },
      url: `${getApiBaseUrl()?.replace("http", "ws")}/graphql`,
    })
  );
