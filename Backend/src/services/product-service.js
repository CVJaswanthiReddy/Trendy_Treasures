import ProductRepository from "../repository/product-repository.js";
import slugify from "slugify";

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(productData) {
    try {
      // Generate a slug from the product name
      const slug = slugify(productData.name, { lower: true, strict: true });
      // Include the slug in the product data
      const productWithSlug = { ...productData, slug };
      const product = await this.productRepository.create(productWithSlug);
      return product;
    } catch (error) {
      throw error; // Re-throw the error for the controller to handle
    }
  }

  async getProductById(id) {
    try {
      const product = await this.productRepository.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProductBySlug(slug) {
    try {
      const product = await this.productRepository.findBySlug(slug);
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Product Service
  async getAllProducts(categoryId) {
    try {
      const products = await this.productRepository.getAll(); // Fetch all products
      if (categoryId) {
        return products.filter((product) => product.categoryId === categoryId); // Filter by categoryId
      }
      return products;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(slug, productData) {
    try {
      const newSlug = slugify(productData.name, { lower: true, strict: true });
      const updatedProduct = await this.productRepository.updateBySlug(slug, {
        ...productData,
        slug: newSlug,
      });
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(slug) {
    try {
      const deletedProduct = await this.productRepository.deleteBySlug(slug);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
