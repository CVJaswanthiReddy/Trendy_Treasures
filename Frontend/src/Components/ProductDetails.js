import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams(); // Extract productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/v1/products/${productId}`
        );
        setProduct(response.data.product || response.data.data);
        console.log(response.data.product); // Log the product to check the structure
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

  const handleAddToCart = () => {
    // Logic to add product to cart
    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };

  const handleAddToWishlist = () => {
    // Logic to add product to wishlist
    console.log(`Added ${product.name} to wishlist.`);
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-lg">Price: ${product.price}</p>
      <h2 className="text-lg">Description:</h2>
      <p>{product.description}</p>
      <p>Rating: {product.rating || "No rating available"}</p>

      <div className="mt-4">
        <h3 className="text-lg">Select Color:</h3>
        <div className="flex flex-wrap space-x-2 space-y-2">
          {product.colors &&
          Array.isArray(product.colors) &&
          product.colors.length > 0 ? (
            product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`border rounded-full w-10 h-10 ${
                  selectedColor === color ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ backgroundColor: color }}
              ></button>
            ))
          ) : (
            <p>No colors available</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg">Select Size:</h3>
        <div className="flex flex-wrap space-x-2 space-y-2">
          {product.sizes &&
          Array.isArray(product.sizes) &&
          product.sizes.length > 0 ? (
            product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border rounded p-2 ${
                  selectedSize === size ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                {size}
              </button>
            ))
          ) : (
            <p>No sizes available</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg">Quantity:</h3>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded p-2 w-20"
        />
      </div>

      <div className="mt-4 flex flex-col md:flex-row space-x-0 md:space-x-2">
        <button
          onClick={handleAddToCart}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className="bg-yellow-500 text-white py-2 px-4 rounded mt-2 md:mt-0"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
