import React, { useState,useEffect } from "react";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Work from "./components/Work/Work";
import Career from "./components/Career/Career";
import Menu from "./components/Menu/Menu";
import { AppProvider } from "./components/AppProvider/AppProvider";
import RegistrationForm from "./components/Registration/Registration";

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('user_id');
    setUserId(id);
    if (id) {
        console.log(userId)
        console.log(id)
    }
  }, []);

  return (
    <div className="container">
      <Router>
        <AppProvider>
          {/* <Menu /> */}
          <div>{userId}</div>
          <Routes>
            <Route path="/work" element={<Work />} />
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/career" element={<Career />} />
          </Routes>
        </AppProvider>
      </Router>
    </div>
  );
};

export default App;
