import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "./ProductList"; // Import your ProductList component

const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/v1/products"
        );
        const categoryProducts = response.data.data.filter(
          (product) => product.categoryId === categoryId // Ensure this matches your product structure
        );
        setProducts(categoryProducts);
      } catch (err) {
        setError("Failed to load products for this category.");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    } else {
      setError("Category ID is required.");
      setLoading(false);
    }
  }, [categoryId]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsByCategory;
