import Home from "@/pages/home";
import WrongPath from "@/pages/wrong-path";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<WrongPath />} />
    </Routes>
  );
}

export default App;
