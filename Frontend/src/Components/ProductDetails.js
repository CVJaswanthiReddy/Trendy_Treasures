import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewId, setReviewId] = useState(null);
  const [userId, setUserId] = useState(""); // State for storing the user ID

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/v1/products/${productId}`
        );

        const productData = response.data.product || response.data.data;

        if (productData.reviews && productData.reviews.length > 0) {
          const totalRating = productData.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const average = totalRating / productData.reviews.length;

          setAverageRating(average);
          setRatingCount(productData.reviews.length);
        } else {
          setAverageRating(0);
          setRatingCount(0);
        }

        setProduct(productData);
        setUserRating(productData.userRating || 0);
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
    if (!userId) {
      setError("User ID is required to submit a review.");
      return;
    }

    try {
      let response;

      if (reviewId) {
        response = await axios.put(
          `http://localhost:3005/api/v1/products/${productId}/review/${reviewId}`,
          { rating, comment: reviewText, userId }
        );
      } else {
        response = await axios.post(
          `http://localhost:3005/api/v1/products/${productId}/review`,
          { rating, comment: reviewText, userId }
        );
      }

      const updatedResponse = await axios.get(
        `http://localhost:3005/api/v1/products/${productId}`
      );

      const updatedProduct =
        updatedResponse.data.product || updatedResponse.data.data;

      if (updatedProduct.reviews && updatedProduct.reviews.length > 0) {
        const totalRating = updatedProduct.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const average = totalRating / updatedProduct.reviews.length;

        setAverageRating(average);
        setRatingCount(updatedProduct.reviews.length);
      } else {
        setAverageRating(0);
        setRatingCount(0);
      }

      setUserRating(rating);
      setReviewText("");
      if (!reviewId) {
        const newReviewId = response.data._id;
        setReviewId(newReviewId);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-700">Price: ${product.price}</p>
          <h2 className="text-lg mt-2">Description:</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="flex items-center bg-green-500 rounded-full py-1 px-3">
              <span className="text-white text-xl">
                {averageRating.toFixed(1)}
              </span>
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
            <h3 className="text-lg">Write a Review:</h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
              className="border rounded p-2 w-full"
              placeholder="Write your review here..."
            />
          </div>

          <div className="mt-4">
            <h3 className="text-lg">Your User ID:</h3>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter your user ID"
            />
          </div>

          <div className="mt-4">
            <button
              onClick={() => handleRating(userRating)}
              className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-auto"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Existing Reviews:</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review._id} className="mt-4 border-t pt-4">
              <div className="flex items-center">
                <span className="font-bold">{review.user}</span>
                <span className="ml-2">{review.rating} ★</span>
              </div>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg">Quantity:</h3>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value, 10)))
          }
          className="border rounded p-2 w-full sm:w-32"
        />
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className="bg-gray-500 text-white py-2 px-4 rounded w-full sm:w-auto"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
