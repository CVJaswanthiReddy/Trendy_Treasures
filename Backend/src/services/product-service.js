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

  async getAllProducts() {
    try {
      const products = await this.productRepository.getAll();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(slug, name, categoryId) {
    try {
      const newSlug = slugify(name, { lower: true, strict: true });
      const updatedProduct = await this.productRepository.updateBySlug(slug, {
        name,
        slug: newSlug,
        categoryId,
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
