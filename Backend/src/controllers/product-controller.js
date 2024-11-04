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

// Get Product by Slug
export const getProductBySlug = async (req, res) => {
  try {
    console.log("slug");
    const { slug } = req.query; // Get the product slug from route params
    console.log("slug in controller");
    const product = await productService.getProductBySlug(slug);
    console.log("pro", product);
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
    console.log("slug delete controller");
    const { slug } = req.params; // Get the product slug from route params
    const deletedProduct = await productService.deleteProduct(slug);
    console.log("pro", deletedProduct);
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

export const getProductById = async (req, res) => {
  try {
    console.log("Controller");
    const { productId } = req.params; // Get ID from route parameters
    console.log(`Request received for getting product by ID:${productId}`);
    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Fetch the product using the service
    const product = await productService.getProductById(productId);
    console.log("hello");
    // Check if the product was found
    // if (!product) {
    //   return res.status(404).json({
    //     success: false,
    //     data: product,
    //     message: "Product not found",
    //   });
    // }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(); // Assuming this fetches all products from your database

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
