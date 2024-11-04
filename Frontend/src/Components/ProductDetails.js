import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(5); // Default average rating
  const [ratingCount, setRatingCount] = useState(1); // Initial count of ratings

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/v1/products/${productId}`
        );
        setProduct(response.data.product || response.data.data);
        const savedRating = localStorage.getItem(`rating-${productId}`);
        const savedCount = localStorage.getItem(`ratingCount-${productId}`);
        if (savedRating) {
          setUserRating(Number(savedRating));
        }
        if (savedCount) {
          setRatingCount(Number(savedCount));
        }
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
    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };

  const handleAddToWishlist = () => {
    console.log(`Added ${product.name} to wishlist.`);
  };

  const handleRating = (rating) => {
    if (userRating === null) {
      // If no rating has been given, set the new rating
      setUserRating(rating);
      const newAverage =
        (averageRating * ratingCount + rating) / (ratingCount + 1);
      setAverageRating(newAverage);
      setRatingCount(ratingCount + 1);
      localStorage.setItem(`rating-${productId}`, rating);
      localStorage.setItem(`ratingCount-${productId}`, ratingCount + 1);
    } else if (userRating === rating) {
      // If the user clicks on the currently selected rating, remove the rating
      const newCount = ratingCount - 1;

      if (newCount > 0) {
        // If there are still ratings left, recalculate the average
        const newTotal = averageRating * ratingCount - userRating;
        const newAverage = newTotal / newCount;
        setAverageRating(newAverage);
      } else {
        // If no ratings are left, reset the average rating to default
        setAverageRating(5); // Reset to default rating
      }

      setUserRating(null);
      setRatingCount(newCount);
      localStorage.removeItem(`rating-${productId}`);
      localStorage.setItem(`ratingCount-${productId}`, newCount);
    } else {
      // If the user selects a different rating
      const newAverage =
        (averageRating * ratingCount + rating) / (ratingCount + 1);
      setUserRating(rating);
      setAverageRating(newAverage);
      localStorage.setItem(`rating-${productId}`, rating);
    }
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

      <div className="flex items-center mt-4">
        <div className="flex items-center bg-green-500 rounded-full py-1 px-3">
          <span className="text-white text-xl">{averageRating.toFixed(1)}</span>
          <span className="text-white text-xl ml-1">★</span>
        </div>
        <p className="text-black ml-2">
          ({ratingCount} rating{ratingCount > 1 ? "s" : ""})
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg">How would you rate this product?</h3>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className={`cursor-pointer text-3xl transition-colors duration-300 ${
                userRating >= star ? "text-green-500" : "text-black"
              }`}
            >
              {userRating >= star ? "★" : "☆"}
            </span>
          ))}
        </div>
        {userRating !== null && (
          <p className="mt-2">
            Your Rating: {userRating} star{userRating > 1 ? "s" : ""}
          </p>
        )}
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
