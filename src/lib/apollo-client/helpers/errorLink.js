"use client";

import { onError } from "@apollo/client/link/error";
import { size } from "lodash";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (size(graphQLErrors)) {
    graphQLErrors.forEach(({ message }) => {
      console.log(message);
    });
  }

  if (size(networkError)) {
    const { statusCode } = networkError;
    console.log(statusCode);
  }
});

export default errorLink;
