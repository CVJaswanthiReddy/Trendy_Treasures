import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams(); // Extract productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", productId); // Log the productId
        const response = await axios.get(
          `http://localhost:3005/api/v1/products/${productId}`
        );
        console.log("Product response:", response.data); // Log the response
        setProduct(response.data.product || response.data.data); // Adjust based on your API response
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setError("Product ID is required.");
      setLoading(false);
    }
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-lg">Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>Rating: {product.rating || "No rating available"}</p>
    </div>
  );
};

export default ProductDetails;
