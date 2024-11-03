import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GiTShirt } from "react-icons/gi"; // Example icon for Men
import { FaLaptop, FaMobileAlt } from "react-icons/fa"; // Icons for Electronics, Smartphones

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/v1/categories"
        );
        setCategories(response.data.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "smartphones":
        return <FaMobileAlt className="text-5xl mx-auto mb-2" />;
      case "electronics":
        return <FaLaptop className="text-5xl mx-auto mb-2" />;
      case "men":
        return <GiTShirt className="text-5xl mx-auto mb-2" />;
      default:
        return <GiTShirt className="text-5xl mx-auto mb-2" />;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category._id} className="text-center">
            {getCategoryIcon(category.name)}
            <Link
              to={`/products/${category._id}`} // Fixed Link
              className="text-lg font-semibold hover:text-blue-600"
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
