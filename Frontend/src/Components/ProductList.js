import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow mb-4">
              <Link to={`/product/${product._id}`}>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-900 font-bold">${product.price}</p>
                <p className="text-gray-600">
                  Rating: {product.rating || "No rating available"}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default ProductList;
