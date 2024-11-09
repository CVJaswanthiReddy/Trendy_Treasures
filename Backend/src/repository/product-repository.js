import CrudRepository from "./crud-repository.js"; // Adjust the path as necessary
import Product from "../models/product.js"; // Adjust the path as necessary
import mongoose from "mongoose";

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }

  async hey(id) {
    try {
      return await Product.findById(id); // This is generally preferable to findOne for ID lookups
    } catch (error) {
      throw new Error("Error fetching product from database: " + error.message); // Handle errors
    }
  }

  async findBySlug(slug) {
    return await Product.findOne({ slug });
  }

  async updateBySlug(slug, updateData) {
    return await Product.findOneAndUpdate({ slug }, updateData, {
      new: true,
    });
  }

  async deleteBySlug(slug) {
    console.log("in database");
    return await Product.findOneAndDelete({ slug });
  }
  // productRepository.js

  // Get all products
  async getAll() {
    return await Product.find({}); // Fetch all products from the database
  }

  // Get products by category
  async getByCategory(categoryId) {
    return await Product.find({ category: categoryId }); // Fetch products filtered by category
  }

  async get(productId) {
    try {
      return await Product.findById(productId); // Fetch product by ID
    } catch (error) {
      console.log("Error fetching product:", error);
      throw new Error("Error fetching product: " + error.message);
    }
  }
  async addRating(productId, { userId, rating, comment }) {
    try {
      const product = await this.get(productId);
      if (!product) throw new Error("Product not found.");

      // Convert `userId` to ObjectId if it’s a valid format
      if (
        typeof userId === "string" &&
        userId.length === 24 &&
        /^[0-9a-fA-F]{24}$/.test(userId)
      ) {
        userId = new mongoose.Types.ObjectId(userId);
      } else {
        throw new Error(
          "Invalid userId format. It must be a 24-character hex string."
        );
      }

      // Create the review object and directly set the ObjectId
      const review = {
        userId: userId, // Make sure to set userId correctly
        rating,
        comment,
        ratedAt: new Date(),
      };

      console.log("Prepared review with userId:", review.userId); // Debugging output

      // Push the new review and recalculate the average rating
      product.reviews.push(review);
      const totalRatings = product.reviews.length;
      product.rating =
        totalRatings > 0
          ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
            totalRatings
          : 0;

      // Save the updated product
      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (error) {
      console.error("Error in addRating:", error.message);
      throw new Error("Error adding rating: " + error.message);
    }
  }
  async addRating(productId, { userId, rating, comment }) {
    try {
      const product = await this.get(productId);
      if (!product) throw new Error("Product not found.");

      // Convert `userId` to ObjectId if it’s a valid format
      if (
        typeof userId === "string" &&
        userId.length === 24 &&
        /^[0-9a-fA-F]{24}$/.test(userId)
      ) {
        userId = new mongoose.Types.ObjectId(userId);
      } else {
        throw new Error(
          "Invalid userId format. It must be a 24-character hex string."
        );
      }

      // Create the review object and directly set the ObjectId
      const review = {
        userId: userId, // Make sure to set userId correctly
        rating,
        comment,
        ratedAt: new Date(),
      };

      console.log("Prepared review with userId:", review.userId); // Debugging output

      // Push the new review and recalculate the average rating
      // Add the new review to reviews array
      product.reviews.push({
        userId,
        rating,
        comment,
        ratedAt: new Date(),
      });

      // Update totalRatings and calculate the average rating
      product.totalRatings = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.totalRatings;

      // Save the updated product
      await product.save();
    } catch (error) {
      console.error("Error in addRating:", error.message);
      throw new Error("Error adding rating: " + error.message);
    }
  }

  // Update existing review
  async updateReview(productId, reviewId, updateData) {
    try {
      const product = await this.get(productId);
      if (!product) {
        throw new Error("Product not found.");
      }

      const reviewIndex = product.reviews.findIndex(
        (review) => review._id.toString() === reviewId
      );
      if (reviewIndex === -1) {
        throw new Error("Review not found.");
      }

      product.reviews[reviewIndex] = {
        ...product.reviews[reviewIndex],
        ...updateData,
      };

      // Recalculate the average rating
      const totalRatings = product.reviews.length;
      product.rating =
        totalRatings > 0
          ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
            totalRatings
          : 0;

      return await this.update(productId, product); // Update the product in the database
    } catch (error) {
      throw new Error("Error updating review: " + error.message);
    }
  }

  async deleteReview(productId, reviewId) {
    try {
      const product = await this.get(productId);
      if (!product) {
        throw new Error("Product not found.");
      }

      // Check if the review exists in the product
      const reviewToDelete = product.reviews.find(
        (review) => review._id.toString() === reviewId
      );

      if (!reviewToDelete) {
        throw new Error("Review not found.");
      }

      // Filter out the review to delete
      const updatedReviews = product.reviews.filter(
        (review) => review._id.toString() !== reviewId
      );

      // Recalculate the average rating and total number of reviews
      const totalReviews = updatedReviews.length;
      const newAverageRating =
        totalReviews > 0
          ? updatedReviews.reduce((acc, review) => acc + review.rating, 0) /
            totalReviews
          : 0;

      // Update the product with the new reviews array and average rating
      product.reviews = updatedReviews;
      product.rating = newAverageRating;
      product.totalRatings = totalReviews;

      // Save the updated product
      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (error) {
      console.error("Error deleting review:", error);
      throw new Error("Error deleting review: " + error.message);
    }
  }
}

export default ProductRepository;
