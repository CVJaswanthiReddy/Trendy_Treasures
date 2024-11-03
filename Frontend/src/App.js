import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import CategoryList from "./Components/CategoryList";
import ProductsByCategory from "./Components/ProductsByCategory";
import ProductDetails from "./Components/ProductDetails";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/products/:categoryId"
              element={<ProductsByCategory />}
            />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

const Home = () => {
  return (
    <>
      <Header />
      <CategoryList />
    </>
  );
};

export default App;
