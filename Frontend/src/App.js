import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./Components/Header"; // Import the Header component
import Login from "./Components/Login";
import Signup from "./Components/Signup"; // Import the Signup component
import CategoryList from "./Components/CategoryList"; // Import CategoryListContainer
import ProductsByCategory from "./Components/ProductsByCategory"; // Import ProductsByCategory component
import store from "./store"; // Redux store
import axios from "axios";

const App = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/v1/categories"
        );
        console.log(response);
        setCategories(response.data.categories); // Assuming response.data contains categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
            {/* Category List Route */}
            <Route
              path="/categories"
              element={<CategoryList categories={categories} />}
            />{" "}
            {/* Pass categories as a prop */}
            {/* Products by Category Route */}
            <Route
              path="/products/category/:categoryId" // Add :categoryId to the route
              element={<ProductsByCategory />} // Using ProductsByCategory component
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
