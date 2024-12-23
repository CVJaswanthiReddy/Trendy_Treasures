import express from "express";
import { signup, login } from "../../controllers/auth-controller.js";
import {
  createCategory,
  getCategoryBySlug,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../../controllers/categories-controller.js";

import {
  createSubcategory,
  getSubcategoryBySlug,
  getAllSubcategories,
  updateSubcategory,
  deleteSubcategory,
} from "../../controllers/subcategory-controller.js";

import {
  createProduct,
  getProductBySlug,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  addRatingAndReview,
  updateRatingAndReview,
  deleteRatingAndReview,
} from "../../controllers/product-controller.js";
const router = express.Router();

// Authentication Routes
router.post("/signup", signup);
router.post("/login", login);

// Category Routes
router.post("/categories", createCategory); // Create a new category
router.get("/categories/:slug", getCategoryBySlug); // Get category by slug
router.get("/categories", getAllCategories); // Get all categories
router.put("/categories/:slug", updateCategory); //update the category
router.delete("/categories/:slug", deleteCategory); //delete the category

// Subcategory Routes
router.post("/subcategories", createSubcategory); // Create a new subcategory
router.get("/subcategories/:slug", getSubcategoryBySlug); // Get subcategory by slug
router.get("/subcategories", getAllSubcategories); // Get all subcategories
router.put("/subcategories/:slug", updateSubcategory); // Update a subcategory
router.delete("/subcategories/:slug", deleteSubcategory); // Delete a subcategory

// Product Routes
router.post("/products", createProduct); // Create a new product
router.get("/product/:slug", getProductBySlug); // Get product by slug
router.get("/products/:productId", getProductById); // Get product by ID
router.get("/products", getAllProducts); // Get all products
router.put("/products/:slug", updateProduct); // Update a product
router.delete("/product/:slug", deleteProduct); // Delete a product
// Route for adding a rating and review
router.post("/products/:productId/review", addRatingAndReview); // Add rating and review

// Route for updating a rating and review
router.put("/products/:productId/review/:reviewId", updateRatingAndReview); // Update rating and review

// Route for deleting a rating and review
router.delete("/product/:productId/review/:reviewId", deleteRatingAndReview); // Delete rating and review

export default router;
