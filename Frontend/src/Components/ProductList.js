import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductFilter from "./ProductFilter";

const ProductList = ({ products }) => {
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState(""); // Ensure you have a state for rating
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to control filter visibility

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/products", {
          params: {
            priceRange,
            rating,
            category,
            sortBy,
          },
        });
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching filtered products", error);
      }
    };

    fetchFilteredProducts();
  }, [priceRange, rating, category, sortBy]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap">
        {/* Sidebar for filters */}
        <div className="w-full md:w-72">
          <div className="md:block hidden">
            <ProductFilter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              rating={rating}
              setRating={setRating}
              category={category}
              setCategory={setCategory}
              setSortOrder={setSortBy}
            />
          </div>

          {/* Hamburger for small screens */}
          <button
            className="block md:hidden p-4 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-between"
            onClick={() => setIsFilterOpen(!isFilterOpen)} // Toggle filter state
          >
            {/* Hamburger Menu Icon when filters are closed */}
            {!isFilterOpen ? (
              <div className="space-y-1">
                <div className="w-6 h-1 bg-white rounded-md"></div>
                <div className="w-6 h-1 bg-white rounded-md"></div>
                <div className="w-6 h-1 bg-white rounded-md"></div>
              </div>
            ) : (
              <span className="text-2xl">✖</span> // Close icon when filters are open
            )}

            {/* Button Text */}
            <span className="ml-2">
              {isFilterOpen ? "Close Filters" : "Open Filters"}
            </span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full md:w-[calc(100%-288px)]">
          <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

          {/* Displaying Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h2 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 font-semibold">
                      ${product.price}
                    </p>
                    <p className="text-gray-500">Rating: {product.rating}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No products found</p>
          )}
        </div>
      </div>

      {/* Show filter sidebar on mobile when toggled */}
      {isFilterOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 overflow-auto">
          <ProductFilter
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            rating={rating}
            setRating={setRating}
            category={category}
            setCategory={setCategory}
            setSortOrder={setSortBy}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
