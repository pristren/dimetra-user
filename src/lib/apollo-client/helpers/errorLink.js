"use client";

import { onError } from "@apollo/client/link/error";
import { size } from "lodash";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (size(graphQLErrors)) {
    graphQLErrors.forEach(({ message }) => {
      console.log(message);
    });
  }

  if (networkError) {
    const { statusCode } = networkError;
    if (statusCode === 401) {
      window.location.href = "/login";
    }
  }
});

export default errorLink;
