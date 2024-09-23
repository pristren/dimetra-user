import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_AN_ORDER } from "./graphql/queries/getAnOrder.gql";

export default function OrderDetails() {

  const [getAnOrder] = useLazyQuery(GET_AN_ORDER, {
    variables: {queryData:{
      id: "66eaffa95fee990676e7a5aa"
    }},
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
    getAnOrder();
  }, []);
  
  return (
    <div>
      <h5>Order Details</h5>
      <p className="mt-4">
        This page is going to show the details of an order. (Construction in
        progress 🚧)
      </p>
    </div>
  );
}
