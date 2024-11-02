import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductsByCategory = () => {
  const { categoryId } = useParams(); // Extract the categoryId from the URL
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make a GET request to fetch all products
        const response = await axios.get(
          "http://localhost:3005/api/v1/products"
        );
        console.log("Response for products is", response);

        // Set the fetched products in state
        setProducts(response.data.products || response.data.data); // Use the appropriate path

        // Filter products based on the categoryId from URL params
        const categoryProducts = (
          response.data.products || response.data.data
        ).filter((product) => product.categoryId === categoryId);

        setFilteredProducts(categoryProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]); // Re-fetch and filter products when the categoryId changes

  return (
    <div>
      <h1>Products</h1>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default ProductsByCategory;
