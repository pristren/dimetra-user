import Home from "@/pages/home";
import WrongPath from "@/pages/wrong-path";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<WrongPath />} />
    </Routes>
  );
}

export default App;
