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

export default router;
