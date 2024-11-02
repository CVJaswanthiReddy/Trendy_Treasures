// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import CategoryList from "./Components/CategoryList"; // Import CategoryList to use on the home page
import ProductsByCategory from "./Components/ProductsByCategory";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          {/* Header is visible on all pages */}
          <Header />

          {/* Main Content and Routing */}
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={<CategoryList />} // Display categories on the home page
            />

            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Signup Route */}
            <Route path="/signup" element={<Signup />} />

            {/* Products by Category Route */}
            <Route
              path="/products/:categoryId" // Use :categoryId as route parameter
              element={<ProductsByCategory />} // Render ProductsByCategory component
            />

            {/* Catch-all route for undefined URLs */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
