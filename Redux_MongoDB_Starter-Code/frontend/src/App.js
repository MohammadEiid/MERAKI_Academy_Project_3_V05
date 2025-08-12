import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navigation from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewArticle from "./components/AddArticle";

//===============================================================

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path={"/"} element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newArticle" element={<NewArticle />} />
      </Routes>
    </div>
  );
};

export default App;
