import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
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
          <Button variant="secondary">Register</Button>
          <Button variant="outline">Forget Password</Button>
          <Button variant="secondary">Forgot Password Input</Button>
        </div>
      </div>
    </div>
  );
}
