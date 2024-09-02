import { ApolloClient, InMemoryCache, from, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import AuthLink from "@/lib/apollo-client/helpers/authLink";
import ErrorLink from "@/lib/apollo-client/helpers/errorLink";
import HttpLink from "@/lib/apollo-client/helpers/httpLink";
import { getNewWSLink } from "@/lib/apollo-client/helpers/wsLink";

export const getNewApolloClient = () =>
  new ApolloClient({
    link: from([
      AuthLink,
      ErrorLink,
      split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        getNewWSLink(),
        HttpLink
      ),
    ]),
    cache: new InMemoryCache(),
  });

export default getNewApolloClient();
