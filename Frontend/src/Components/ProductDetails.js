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
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [reviewId, setReviewId] = useState(null); // To track the existing review ID

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/v1/products/${productId}`
        );

        const productData = response.data.product || response.data.data;

        // Calculate average rating and total count if reviews exist
        if (productData.reviews && productData.reviews.length > 0) {
          const totalRating = productData.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const average = totalRating / productData.reviews.length;

          setAverageRating(average);
          setRatingCount(productData.reviews.length); // Set total rating count
        } else {
          setAverageRating(0); // No reviews, set average to 0
          setRatingCount(0); // No ratings
        }

        setProduct(productData);
        setUserRating(productData.userRating || null);
        setReviewId(productData.reviewId || null);
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

  const handleRating = async (rating) => {
    try {
      console.log("User rating:", rating);

      let response;

      if (reviewId) {
        // Update existing review
        console.log(`Updating review with ID: ${reviewId}`);
        response = await axios.put(
          `http://localhost:3005/api/v1/products/${productId}/review/${reviewId}`,
          { rating, comment: "Your updated comment here" }
        );
      } else {
        // Add new review
        console.log("Creating new review...");
        response = await axios.post(
          `http://localhost:3005/api/v1/products/${productId}/review`,
          { rating, comment: "Your comment here" }
        );
        console.log("New review created:", response.data); // Log the response to check structure
      }

      // Fetch the updated product details
      console.log(
        "Fetching updated product details after review submission..."
      );
      const updatedResponse = await axios.get(
        `http://localhost:3005/api/v1/products/${productId}`
      );

      const updatedProduct =
        updatedResponse.data.product || updatedResponse.data.data;
      console.log("Updated product data:", updatedProduct);

      // Recalculate average rating and update count from updated reviews
      if (updatedProduct.reviews && updatedProduct.reviews.length > 0) {
        const totalRating = updatedProduct.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const average = totalRating / updatedProduct.reviews.length;

        setAverageRating(average); // Update average rating
        setRatingCount(updatedProduct.reviews.length); // Update rating count
        console.log("Updated average rating:", average);
        console.log("Updated rating count:", updatedProduct.reviews.length);
      } else {
        setAverageRating(0); // No reviews
        setRatingCount(0); // No ratings
        console.log("No reviews after update.");
      }

      setUserRating(rating); // Set user's rating

      // Update the review ID if a new review was created
      if (!reviewId) {
        const newReviewId = response.data._id; // Assuming the response contains the review ID in `_id`
        setReviewId(newReviewId); // Set the new review ID
        console.log("New review ID set:", newReviewId);
      }
    } catch (error) {
      console.error(
        "Error submitting rating:",
        error.response ? error.response.data : error
      );
      setError("Failed to submit rating. Please try again.");
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
          ({ratingCount} rating{ratingCount !== 1 ? "s" : ""})
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
          onChange={(e) => setQuantity(Math.max(1, e.target.value))}
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
