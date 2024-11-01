import ProductService from "../services/product-service.js";
import Product from "../models/product.js";
import slugify from "slugify";

const productService = new ProductService();

// Create Product
export const createProduct = async (req, res) => {
  try {
    const productData = req.body; // Get the product data from request body
    const newProduct = await productService.createProduct(productData);
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error,
    });
  }
};

// controllers/product-controller.js
export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products without applying any filters
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
// Get Product by Slug
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params; // Get the product slug from route params
    const product = await productService.getProductBySlug(slug);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error,
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name, categoryId, price, description, rating } = req.body;

    // Check if the product name is provided
    if (!name) {
      throw new Error("Product name is required to generate a slug.");
    }

    // Generate a slug from the name
    const productSlug = slugify(name, { lower: true });

    // Find the product by slug and update it
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: slug },
      { name, slug: productSlug, categoryId, price, description, rating },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { slug } = req.params; // Get the product slug from route params
    const deletedProduct = await productService.deleteProduct(slug);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error,
    });
  }
};
