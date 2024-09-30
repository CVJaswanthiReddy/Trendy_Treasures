// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./Components/Header"; // Import the Header component
import Login from "./Components/Login";
import Signup from "./Components/Signup"; // Import the Signup component
import store from "./store"; // Redux store

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          {/* Header should be visible on all pages */}
          <Header />

          {/* Main Content and Routing */}
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<h1>Welcome to Trendy Treasures</h1>} />

            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Signup Route */}
            <Route path="/signup" element={<Signup />} />

            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
