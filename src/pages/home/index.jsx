import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GET_CATEGORISE } from "./graphql/queries/getCategories.gql";

export default function Home() {
  const [getCategories] = useLazyQuery(GET_CATEGORISE, {
    variables: {queryData:{
      id: 
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
    getCategories();
  }, []);
  return (
    <div className="">
      <Navbar />
      <div className="px-8">
        <h1>Home</h1>
        <p>This is the home page.</p>
        <div className="flex gap-4 mt-4">
          <Link to="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline">Register</Button>
          </Link>
          <Link to="/forgot-password">
            <Button variant="outline">Forget Password</Button>
          </Link>
          <Link to="/reset-password">
            <Button variant="secondary">Forgot Password Input</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
