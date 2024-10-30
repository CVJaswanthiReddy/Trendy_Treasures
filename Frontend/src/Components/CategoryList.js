// src/Components/CategoryList.js

import React from "react";
import { Link } from "react-router-dom";

const CategoryList = ({ categories }) => {
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id}>
              <Link to={`/products/category/${category._id}`}>
                {category.name}
              </Link>{" "}
              {/* Route should work here */}
            </li>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
