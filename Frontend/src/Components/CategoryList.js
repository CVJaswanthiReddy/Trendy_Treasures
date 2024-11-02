import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GiTShirt } from "react-icons/gi"; // For Men
import { FaDesktop, FaLaptop, FaMobileAlt } from "react-icons/fa"; // For Electronics, Smartphones

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "electronics and gadgets":
        return <FaLaptop className="text-5xl mx-auto mb-2" />;
      case "smartphones":
        return <FaMobileAlt className="text-5xl mx-auto mb-2" />;
      case "men":
        return <GiTShirt className="text-5xl mx-auto mb-2" />;
      default:
        return <GiTShirt className="text-5xl mx-auto mb-2" />; // Default icon
    }
  };

  return (
    <div>
      <h1>Category List</h1>
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Shop by Category
        </h2>
        <div className="flex justify-around">
          {categories.map((category) => (
            <div key={category._id} className="text-center">
              {getCategoryIcon(category.name)}
              <Link
                to={`/products/${category._id}`}
                className="text-lg font-semibold"
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryList;
