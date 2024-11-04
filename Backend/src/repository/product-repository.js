import CrudRepository from "./crud-repository.js"; // Adjust the path as necessary
import Product from "../models/product.js"; // Adjust the path as necessary

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
  async addRating(productId, { userId, rating, comment }) {
    try {
      const product = await this.get(productId);
      if (!product) {
        throw new Error("Product not found.");
      }

      // Add the new rating and review
      product.reviews.push({ userId, rating, comment });

      // Calculate new average rating
      const totalRatings = product.reviews.length;
      product.rating =
        totalRatings > 0
          ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
            totalRatings
          : 0;
      return product; // Return the updated product
    } catch (error) {
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

      product.reviews = product.reviews.filter(
        (review) => review._id.toString() !== reviewId
      );

      const totalRatings = product.reviews.length;
      product.rating =
        totalRatings > 0
          ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
            totalRatings
          : 0;

      return product; // Return the updated product
    } catch (error) {
      throw new Error("Error deleting review: " + error.message);
    }
  }
}

export default ProductRepository;
