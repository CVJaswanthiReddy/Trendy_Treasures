// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-white shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">Trendy Treasures</Link>
        </div>
        {/* Center: Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-gray-900">
            Products
          </Link>
          <Link
            to="/products/men"
            className="text-gray-600 hover:text-gray-900"
          >
            Men
          </Link>
          <Link
            to="/products/women"
            className="text-gray-600 hover:text-gray-900"
          >
            Women
          </Link>
          <Link
            to="/products/kids"
            className="text-gray-600 hover:text-gray-900"
          >
            Kids
          </Link>
          <Link
            to="/products/footwear"
            className="text-gray-600 hover:text-gray-900"
          >
            Footwear
          </Link>
          <Link
            to="/products/accessories"
            className="text-gray-600 hover:text-gray-900"
          >
            Accessories
          </Link>
          <Link to="/search" className="text-gray-600 hover:text-gray-900">
            Search
          </Link>
        </nav>

        {/* Right: Cart and Profile */}
        <div className="flex space-x-4">
          <Link
            to="/cart"
            className="text-gray-600 hover:text-gray-900 relative"
          >
            <FaShoppingCart className="text-xl" />
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-gray-900">
            <FaUserCircle className="text-xl" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
