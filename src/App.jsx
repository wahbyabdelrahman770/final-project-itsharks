import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;