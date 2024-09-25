// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Signup from "./Components/Signup"; // Import the Signup component
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<h1>Welcome to My App</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />{" "}
            {/* Add Signup route */}
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
