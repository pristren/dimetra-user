import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_CATEGORISE } from "./graphql/queries/getCategories.gql";

export default function Home() {
  const [getCategories] = useLazyQuery(GET_CATEGORISE, {
    variables: {},
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log({ error });
    },
  });
  useEffect(() => {
    getCategories();
  }, []);
  return <div>Home</div>;
}
