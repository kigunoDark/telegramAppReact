import React from "react";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Work from "./components/Work/Work";
import Career from "./components/Career/Career";
import Menu from "./components/Menu/Menu";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Menu />
        <Routes>
          <Route path="/work" element={<Work />} />
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Career />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
