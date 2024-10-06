import CrudRepository from "./crud-repository.js"; // Adjust the path as necessary
import Product from "../models/product.js"; // Adjust the path as necessary

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }

  async findById(id) {
    return await Product.findById(id);
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
    return await Product.findOneAndDelete({ slug });
  }
  // productRepository.js

  // Get all products
  async getAll() {
    return await Product.find(); // Fetch all products from the database
  }

  // Get products by category
  async getByCategory(categoryId) {
    return await Product.find({ category: categoryId }); // Fetch products filtered by category
  }
}

export default ProductRepository;
