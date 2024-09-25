// src/Components/Header.js

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Title = () => {
  return (
    <Link to="/">
      <img
        className="w-32 h-10"
        alt="logo"
        src="https://letopusa.wordpress.com/wp-content/uploads/2011/11/trendytreasuresonline_logo1.jpg"
      />
    </Link>
  );
};

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className="grid grid-cols-1 md:grid-cols-3 items-center p-4 bg-white shadow-md">
      <div className="flex justify-center md:justify-start items-center mb-4 md:mb-0">
        <Title />
      </div>
      <div className="flex justify-center mb-4 md:mb-0">
        <div className="flex items-center w-full md:w-96 bg-gray-100 p-2 rounded-md">
          <input
            data-testid="search-input"
            type="text"
            placeholder="Search for Products, Brands and More"
            className="w-full px-4 py-2 bg-transparent outline-none text-gray-700"
          />
          <button className="text-gray-500">
            <i className="fa fa-search text-xl"></i>
          </button>
        </div>
      </div>
      <nav className="flex justify-center md:justify-end items-center space-x-6">
        <Link
          to={isAuthenticated ? "/profile" : "/login"}
          className="flex items-center text-gray-800"
        >
          <i className="fa fa-user text-2xl mr-2"></i>
          {isAuthenticated ? "My Profile" : "Login"}
        </Link>
        <Link data-testid="cart" to="/cart" className="text-gray-800">
          <i className="fa-solid fa-cart-shopping text-2xl"></i> Cart
        </Link>
        <Link to="/sell" className="text-gray-800">
          Become a Seller
        </Link>
      </nav>
    </header>
  );
};

export default Header;
