import React from "react";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <Link to="/">
      <img
        className="w-24"
        alt="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFNOgyDzSfrveQZD_VNBgPhLDwTyHtq0On0g&s"
      />
    </Link>
  );
};

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      {/* Left - Logo */}
      <div className="flex items-center space-x-4">
        <Title />
        <div className="flex items-center w-96 bg-gray-100 p-2 rounded-md">
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

      {/* Right - Menu */}
      <nav className="flex items-center space-x-6">
        <div className="relative group">
          <button className="flex items-center text-gray-800">
            <i className="fa fa-user text-2xl mr-2"></i> Login
          </button>
          {/* Dropdown menu */}
          <ul className="absolute right-0 hidden group-hover:block bg-white shadow-md rounded-md mt-2 w-48">
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/profile">My Profile</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/plus">Flipkart Plus Zone</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/orders">Orders</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/rewards">Rewards</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/gift-cards">Gift Cards</Link>
            </li>
          </ul>
        </div>

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
